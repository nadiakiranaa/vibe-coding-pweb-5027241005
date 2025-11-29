const router = require('express').Router();
const Thesis = require('../models/Thesis');
const verify = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- KONFIGURASI MULTER (UPLOAD FILE) ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Tentukan folder penyimpanan berdasarkan tipe file
        if (file.fieldname === 'pdf') {
            cb(null, 'uploads/pdfs/'); 
        } else if (file.fieldname === 'poster') {
            cb(null, 'uploads/posters/'); 
        }
    }, // <--- KOMA PENTING (Tadi error karena ini kurang)
    filename: function (req, file, cb) {
        // Rename file agar unik: timestamp-namafileasli
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file maksimal 10MB
});

// --- ROUTES ---

// 1. GET ALL THESIS (Public - Bisa search)
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        
        // Logika Search
        if (search) {
            query = { 
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case insensitive
                    { keywords: { $regex: search, $options: 'i' } },
                    { major: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Urutkan dari yang terbaru (createdAt: -1)
        const thesisList = await Thesis.find(query).sort({ createdAt: -1 }); 
        res.json(thesisList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. GET ONE THESIS (Public - Detail)
router.get('/:id', async (req, res) => {
    try {
        const thesis = await Thesis.findById(req.params.id).populate('uploader', 'name');
        res.json(thesis);
    } catch (err) {
        res.status(404).json({ message: 'Data tidak ditemukan' });
    }
});

// 3. CREATE THESIS (Protected - Butuh Login & Upload)
// Menerima 2 file sekaligus: 'pdf' dan 'poster'
router.post('/', verify, upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'poster', maxCount: 1 }]), async (req, res) => {
    
    // Convert keywords string ke array (jika dikirim sebagai teks dipisah koma)
    let tags = [];
    if(req.body.keywords) {
        tags = req.body.keywords.split(',').map(tag => tag.trim());
    }

    const thesis = new Thesis({
        title: req.body.title,
        abstract: req.body.abstract,
        studentName: req.body.studentName,
        studentId: req.body.studentId,
        major: req.body.major,
        year: req.body.year,
        keywords: tags,
        uploader: req.user._id, // ID User dari Token JWT
        // Simpan path file jika ada yang diupload
        pdfUrl: req.files['pdf'] ? req.files['pdf'][0].path : null,
        posterUrl: req.files['poster'] ? req.files['poster'][0].path : null,
    });

    try {
        const savedThesis = await thesis.save();
        res.json(savedThesis);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE THESIS (Protected - Hanya pemilik yg bisa hapus)
router.delete('/:id', verify, async (req, res) => {
    try {
        const thesis = await Thesis.findById(req.params.id);
        if (!thesis) return res.status(404).json({ message: 'Data tidak ditemukan' });
        
        // Cek kepemilikan (User yang login harus sama dengan Uploader)
        if (thesis.uploader != req.user._id) {
            return res.status(403).json({ message: 'Anda tidak berhak menghapus data ini' });
        }

        // Hapus file fisik di folder uploads (Agar server tidak penuh sampah)
        try {
            if (thesis.pdfUrl && fs.existsSync(thesis.pdfUrl)) fs.unlinkSync(thesis.pdfUrl);
            if (thesis.posterUrl && fs.existsSync(thesis.posterUrl)) fs.unlinkSync(thesis.posterUrl);
        } catch (e) {
            console.log("Gagal hapus file fisik:", e);
        }

        await Thesis.deleteOne({ _id: req.params.id });
        res.json({ message: 'Berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;