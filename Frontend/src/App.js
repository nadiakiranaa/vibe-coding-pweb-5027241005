import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Pastikan ini sesuai port backend kamu
const API_URL = 'http://localhost:3000/api';

function App() {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState('home'); // 'home', 'login', 'upload', 'register'
  const [theses, setTheses] = useState([]);
  const [search, setSearch] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token')); 
  
  // State untuk Auth (Login & Register)
  const [name, setName] = useState(''); // Baru: untuk register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State untuk Form Upload
  const [formData, setFormData] = useState({
    title: '', abstract: '', studentName: '', studentId: '', major: '', year: '', keywords: ''
  });
  const [files, setFiles] = useState({ pdf: null, poster: null });

  // --- EFFECT ---
  useEffect(() => {
    fetchTheses();
  }, [search]);

  // --- FUNCTIONS ---

  // 1. Ambil Data Skripsi
  const fetchTheses = async () => {
    try {
      const res = await axios.get(`${API_URL}/thesis?search=${search}`);
      setTheses(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  // 2. Login Admin
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      alert(`Selamat datang, ${res.data.user.name}!`);
      setView('home');
    } catch (err) {
      alert('Login Gagal! Cek email & password.');
    }
  };

  // 3. Register User Baru (FITUR BARU)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        // Kirim data nama, email, password ke backend
        await axios.post(`${API_URL}/auth/register`, { name, email, password });
        alert('Registrasi Berhasil! Silakan Login.');
        setView('login'); // Pindah ke halaman login
    } catch (err) {
        alert('Registrasi Gagal: ' + (err.response?.data || err.message));
    }
  };

  // 4. Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('home');
  };

  // 5. Upload Skripsi
  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('abstract', formData.abstract);
    data.append('studentName', formData.studentName);
    data.append('studentId', formData.studentId);
    data.append('major', formData.major);
    data.append('year', formData.year);
    data.append('keywords', formData.keywords);
    if(files.pdf) data.append('pdf', files.pdf);
    if(files.poster) data.append('poster', files.poster);

    try {
      await axios.post(`${API_URL}/thesis`, data, {
        headers: { 'auth-token': token } 
      });
      alert('Berhasil Upload Skripsi!');
      setFormData({ title: '', abstract: '', studentName: '', studentId: '', major: '', year: '', keywords: '' });
      setView('home');
      fetchTheses(); 
    } catch (err) {
      alert('Gagal Upload: ' + (err.response?.data?.message || err.message));
    }
  };

  // 6. Delete Skripsi (FITUR BARU)
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${API_URL}/thesis/${id}`, {
          headers: { 'auth-token': token }
        });
        alert('Data berhasil dihapus');
        fetchTheses();
      } catch (err) {
        alert('Gagal menghapus: Pastikan Anda login.');
      }
    }
  };

  // --- UI RENDER ---
  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand">🎓 ThesisHub</div>
        <div className="nav-links">
          <button onClick={() => setView('home')}>Beranda</button>
          {token ? (
            <>
              <button onClick={() => setView('upload')}>+ Upload</button>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <button onClick={() => setView('login')}>Login / Daftar</button>
          )}
        </div>
      </nav>

      {/* CONTENT AREA */}
      <div className="content">
        
        {/* VIEW: HOME */}
        {view === 'home' && (
          <>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="🔍 Cari Judul, Jurusan, atau Keyword..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid-container">
              {theses.map((thesis) => (
                <div key={thesis._id} className="card">
                  <div className="card-header">
                    {thesis.posterUrl ? (
                      <img src={`http://localhost:3000/${thesis.posterUrl}`} alt="poster" className="poster-img" />
                    ) : (
                      <div className="no-img">No Poster</div>
                    )}
                  </div>
                  <div className="card-body">
                    <h3>{thesis.title}</h3>
                    <p className="author">👤 {thesis.studentName} ({thesis.major} {thesis.year})</p>
                    <p className="abstract">{thesis.abstract.substring(0, 100)}...</p>
                    <div className="tags">
                      {thesis.keywords.map((k, i) => <span key={i} className="tag">#{k}</span>)}
                    </div>
                    
                    {/* Tombol Aksi */}
                    <div style={{marginTop: '15px', display: 'flex', justifyContent: 'space-between'}}>
                        {thesis.pdfUrl && (
                        <a href={`http://localhost:3000/${thesis.pdfUrl}`} target="_blank" rel="noreferrer" className="btn-download">
                            📄 PDF
                        </a>
                        )}
                        {token && (
                            <button onClick={() => handleDelete(thesis._id)} style={{background:'#e74c3c', color:'white', border:'none', padding:'5px 10px', borderRadius:'4px', cursor:'pointer'}}>Hapus</button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {theses.length === 0 && <p className="empty-msg">Tidak ada data ditemukan.</p>}
          </>
        )}

        {/* VIEW: LOGIN */}
        {view === 'login' && (
          <div className="form-wrapper">
            <h2>Login Admin</h2>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
              <button type="submit">Masuk</button>
            </form>
            <p style={{textAlign:'center', marginTop:'15px'}}>
                Belum punya akun? <span style={{color:'blue', cursor:'pointer', fontWeight:'bold'}} onClick={() => setView('register')}>Daftar di sini</span>
            </p>
          </div>
        )}

        {/* VIEW: REGISTER (BARU) */}
        {view === 'register' && (
          <div className="form-wrapper">
            <h2>Daftar Akun Baru</h2>
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Nama Lengkap" onChange={e => setName(e.target.value)} required />
              <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
              <button type="submit" style={{background: '#3498db'}}>Daftar Sekarang</button>
            </form>
            <p style={{textAlign:'center', marginTop:'15px'}}>
                Sudah punya akun? <span style={{color:'blue', cursor:'pointer', fontWeight:'bold'}} onClick={() => setView('login')}>Login di sini</span>
            </p>
          </div>
        )}

        {/* VIEW: UPLOAD */}
        {view === 'upload' && (
          <div className="form-wrapper">
            <h2>Upload Skripsi Baru</h2>
            <form onSubmit={handleUpload}>
              <input type="text" placeholder="Judul Skripsi" onChange={e => setFormData({...formData, title: e.target.value})} required />
              <textarea placeholder="Abstrak Singkat" rows="4" onChange={e => setFormData({...formData, abstract: e.target.value})} required></textarea>
              <div className="row">
                <input type="text" placeholder="Nama Mahasiswa" onChange={e => setFormData({...formData, studentName: e.target.value})} required />
                <input type="text" placeholder="NIM" onChange={e => setFormData({...formData, studentId: e.target.value})} required />
              </div>
              <div className="row">
                <input type="text" placeholder="Jurusan" onChange={e => setFormData({...formData, major: e.target.value})} required />
                <input type="number" placeholder="Tahun" onChange={e => setFormData({...formData, year: e.target.value})} required />
              </div>
              <input type="text" placeholder="Keywords (pisahkan koma)" onChange={e => setFormData({...formData, keywords: e.target.value})} />
              
              <div className="file-input">
                <label>File PDF (Dokumen):</label>
                <input type="file" accept=".pdf" onChange={e => setFiles({...files, pdf: e.target.files[0]})} />
              </div>
              
              <div className="file-input">
                <label>Gambar Poster/Cover:</label>
                <input type="file" accept="image/*" onChange={e => setFiles({...files, poster: e.target.files[0]})} />
              </div>

              <button type="submit" className="btn-primary">Simpan Data</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;