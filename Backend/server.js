const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Supaya bisa baca data JSON dari Frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- HUBUNGKAN ROUTES (INI KUNCINYA) ---
const authRoute = require('./routes/auth'); // Panggil file auth.js
const thesisRoute = require('./routes/thesis'); // Panggil file thesis.js

app.use('/api/auth', authRoute); // Pasang jalan ke /api/auth
app.use('/api/thesis', thesisRoute); // Pasang jalan ke /api/thesis
// ----------------------------------------

// Connect ke Database
// Pastikan tidak ada spasi di username atau password
const DB_URI = "mongodb+srv://admin:admin123@projectpweb.u4didfo.mongodb.net/?appName=ProjectPweb";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas (Cloud)'))
.catch((err) => console.log('❌ DB Connection Error: ', err));
// Jalankan Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));