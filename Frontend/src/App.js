import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ⚠️ Pastikan PORT backend sesuai (3000)
const API_URL = 'http://localhost:3000/api';

function App() {
  // --- STATE UTAMA ---
  const [view, setView] = useState('home'); // Opsi: 'home', 'login', 'register', 'upload'
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const [theses, setTheses] = useState([]); // Menyimpan data skripsi dari DB
  const [search, setSearch] = useState(''); // Fitur Search
  const [showList, setShowList] = useState(false); // Kontrol tampilan list skripsi (Hero Section)

  // State Form Auth
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State Form Upload
  const [formData, setFormData] = useState({
    title: '', abstract: '', studentName: '', studentId: '', major: '', year: '', keywords: ''
  });
  const [files, setFiles] = useState({ pdf: null, poster: null });

  // --- EFFECT: Ambil Data saat pertama buka atau saat search berubah ---
  useEffect(() => {
    fetchTheses();
  }, [search]);

  // --- FUNCTION: Ambil Data dari Backend (READ) ---
  const fetchTheses = async () => {
    try {
      const res = await axios.get(`${API_URL}/thesis?search=${search}`);
      setTheses(res.data); 
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  // --- FUNCTION: Login ---
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

  // --- FUNCTION: Register ---
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${API_URL}/auth/register`, { name, email, password });
        alert('Registrasi Berhasil! Silakan Login.');
        setView('login');
    } catch (err) {
        alert('Registrasi Gagal: ' + (err.response?.data || err.message));
    }
  };

  // --- FUNCTION: Logout ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('home');
    setShowList(false); // Reset tampilan ke Hero
  };

  // --- FUNCTION: Upload Data (CREATE) ---
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
      alert('✅ Skripsi Berhasil Diupload!');
      
      // Reset Form
      setFormData({ title: '', abstract: '', studentName: '', studentId: '', major: '', year: '', keywords: '' });
      setFiles({ pdf: null, poster: null });
      
      setView('home'); 
      setShowList(true); // Langsung tampilkan list
      fetchTheses(); 
    } catch (err) {
      alert('❌ Gagal Upload: ' + (err.response?.data?.message || err.message));
    }
  };

  // --- FUNCTION: Hapus Data (DELETE) ---
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${API_URL}/thesis/${id}`, {
          headers: { 'auth-token': token }
        });
        alert('Data berhasil dihapus');
        fetchTheses();
      } catch (err) {
        alert('Gagal menghapus: Anda bukan pemilik data ini.');
      }
    }
  };

  // --- FUNCTION: Scroll ke List (Utilitas) ---
  const scrollToContent = () => {
      setShowList(true);
      setTimeout(() => {
          document.getElementById('thesis-list-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  };

  // --- TAMPILAN (UI) ---
  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="brand" onClick={() => {setView('home'); setShowList(false)}} style={{cursor:'pointer'}}>
            🎓 ThesisHub
        </div>
        <div className="nav-links">
          <button onClick={() => {setView('home'); setShowList(false)}}>Beranda</button>
          {token ? (
            <>
              <button onClick={() => setView('upload')} className="btn-upload">+ Upload</button>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <button onClick={() => setView('login')}>Login Admin</button>
          )}
        </div>
      </nav>

      {/* CONTENT AREA */}
      <div className="content">
        
        {/* VIEW: HOME (HERO + LIST) */}
        {view === 'home' && (
          <>
            {/* --- 1. HERO SECTION --- */}
            {!showList && (
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Temukan Inspirasi,<br/>Bagikan Pengetahuan.</h1>
                        <p className="hero-subtitle">
                            Platform repositori skripsi digital terlengkap untuk mahasiswa dan dosen.
                            Cari referensi atau arsipkan karya ilmiahmu di sini.
                        </p>
                        
                        {/* Statistik Singkat */}
                        <div className="hero-stats">
                            <div className="stat-item">
                                <h3>{theses.length}+</h3>
                                <p>Skripsi</p>
                            </div>
                            <div className="stat-item">
                                <h3>{[...new Set(theses.map(t => t.major))].length}</h3>
                                <p>Jurusan</p>
                            </div>
                            <div className="stat-item">
                                <h3>24/7</h3>
                                <p>Akses</p>
                            </div>
                        </div>

                        <div className="hero-actions">
                            <button className="btn-primary btn-lg" onClick={scrollToContent}>
                                🔍 Jelajahi Semua Skripsi
                            </button>
                            {token && (
                                <button className="btn-secondary btn-lg" onClick={() => setView('upload')}>
                                    📤 Upload Skripsimu
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="hero-image">
                        {/* Gambar Ilustrasi Placeholder */}
                        <img src="https://img.freepik.com/free-vector/online-library-concept-illustration_114360-5389.jpg?w=826" alt="Library Illustration" />
                    </div>
                </div>
            )}

            {/* --- 2. LIST SECTION --- */}
            {showList && (
                <div id="thesis-list-section" className="thesis-list-container">
                    
                    {/* DASHBOARD STATS (MINI) */}
                    <div className="stats-container">
                        <div className="stat-card">
                            <h3>📚 Total Skripsi</h3>
                            <p>{theses.length}</p>
                        </div>
                        <div className="stat-card">
                            <h3>🏛️ Jurusan</h3>
                            <p>{[...new Set(theses.map(t => t.major))].length}</p> 
                        </div>
                        <div className="stat-card">
                            <h3>📅 Tahun Terbaru</h3>
                            <p>{theses.length > 0 ? Math.max(...theses.map(t => t.year)) : '-'}</p>
                        </div>
                    </div>

                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="🔍 Cari Judul, Jurusan, atau Keyword..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Grid Card */}
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
                                    <span 
                                        className="badge-major" 
                                        onClick={() => setSearch(thesis.major)} 
                                        style={{cursor: 'pointer'}} 
                                        title="Klik untuk filter jurusan ini"
                                    >
                                        {thesis.major}
                                    </span>
                                    <h3>{thesis.title}</h3>
                                    <p className="author">👤 {thesis.studentName} ({thesis.year})</p>
                                    <p className="abstract">{thesis.abstract.substring(0, 120)}...</p>
                                    
                                    <div className="tags">
                                        {thesis.keywords.map((k, i) => <span key={i} className="tag">#{k}</span>)}
                                    </div>

                                    <div className="card-actions">
                                        {thesis.pdfUrl && (
                                            token ? (
                                                <a href={`http://localhost:3000/${thesis.pdfUrl}`} target="_blank" rel="noreferrer" className="btn-download">
                                                    📄 Download PDF
                                                </a>
                                            ) : (
                                                <span onClick={() => setView('login')} className="btn-locked" title="Klik untuk Login">
                                                    🔒 Login untuk Unduh
                                                </span>
                                            )
                                        )}
                                        
                                        {token && (
                                            <button onClick={() => handleDelete(thesis._id)} className="btn-delete">🗑️</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {theses.length === 0 && (
                        <div className="empty-state">
                            <h3>Belum ada data skripsi 😢</h3>
                            <p>Coba kata kunci lain atau upload data baru.</p>
                        </div>
                    )}
                </div>
            )}
          </>
        )}

        {/* VIEW: UPLOAD FORM */}
        {view === 'upload' && (
          <div className="form-wrapper">
            <h2>📤 Upload Skripsi Baru</h2>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>Judul Skripsi</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>

              <div className="form-group">
                <label>Abstrak</label>
                <textarea rows="4" value={formData.abstract} onChange={e => setFormData({...formData, abstract: e.target.value})} required></textarea>
              </div>

              <div className="row">
                <div className="form-group">
                    <label>Nama Mahasiswa</label>
                    <input type="text" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>NIM</label>
                    <input type="text" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} required />
                </div>
              </div>

              <div className="row">
                <div className="form-group">
                    <label>Jurusan</label>
                    <input type="text" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Tahun</label>
                    <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
                </div>
              </div>

              <div className="form-group">
                <label>Keywords (Pisahkan dengan koma)</label>
                <input type="text" placeholder="Contoh: AI, Web, IoT" value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} />
              </div>
              
              <div className="file-input-group">
                <label>📄 File PDF (Dokumen Lengkap)</label>
                <input type="file" accept=".pdf" onChange={e => setFiles({...files, pdf: e.target.files[0]})} />
              </div>
              
              <div className="file-input-group">
                <label>🖼️ Poster / Cover (Gambar)</label>
                <input type="file" accept="image/*" onChange={e => setFiles({...files, poster: e.target.files[0]})} />
              </div>

              <button type="submit" className="btn-primary">Simpan Data</button>
              <button type="button" onClick={() => setView('home')} className="btn-cancel">Batal</button>
            </form>
          </div>
        )}

        {/* VIEW: LOGIN & REGISTER */}
        {(view === 'login' || view === 'register') && (
          <div className="auth-wrapper">
            <h2>{view === 'login' ? 'Login Admin' : 'Daftar Akun Baru'}</h2>
            <form onSubmit={view === 'login' ? handleLogin : handleRegister}>
              {view === 'register' && (
                  <input type="text" placeholder="Nama Lengkap" onChange={e => setName(e.target.value)} required />
              )}
              <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
              
              <button type="submit" className="btn-primary">
                  {view === 'login' ? 'Masuk' : 'Daftar Sekarang'}
              </button>
            </form>
            
            <p className="auth-switch">
                {view === 'login' ? "Belum punya akun? " : "Sudah punya akun? "}
                <span onClick={() => setView(view === 'login' ? 'register' : 'login')}>
                    {view === 'login' ? 'Daftar di sini' : 'Login di sini'}
                </span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;