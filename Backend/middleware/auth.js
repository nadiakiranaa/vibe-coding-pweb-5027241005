const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Ambil token dari header
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Akses Ditolak. Token tidak tersedia.');

  try {
    // Verifikasi token (Gunakan secret key yang sama dengan saat login)
    const verified = jwt.verify(token, 'SECRET_KEY_RAHASIA'); // Di production, gunakan process.env
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token tidak valid.');
  }
};