const router = require('express').Router();
const User = require('../models/User'); // Pastikan nama file User.js huruf besar U
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        // 1. Cek apakah email sudah dipakai?
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email sudah terdaftar! Ganti yang lain.');

        // 2. Hash Password (Amankan sandi)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // 3. Buat User Baru
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // 4. Simpan ke MongoDB
        const savedUser = await user.save();
        res.send({ user: savedUser._id, name: savedUser.name });
        
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        // Cek Email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email tidak ditemukan.');

        // Cek Password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Password salah.');

        // Buat Token
        const token = jwt.sign({ _id: user._id, role: user.role }, 'SECRET_KEY_RAHASIA');
        
        res.header('auth-token', token).send({ 
            token: token, 
            user: { id: user._id, name: user.name, role: user.role } 
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;