# 🎓 ThesisHub — Digital Thesis Repository

> **Platform Repositori Skripsi Digital Terintegrasi.**
> *Project ini dikembangkan untuk solusi manajemen arsip akademik dalam kompetisi Vibe Coding: "Solve a Real Problem".*

![ThesisHub Preview](https://via.placeholder.com/800x400?text=Screenshot+Dashboard+ThesisHub)
*(Ganti link di atas dengan link gambar screenshot aplikasimu nanti)*

---

## 📖 Latar Belakang Masalah (Problem Statement)
Di lingkungan kampus dan akademis, pengelolaan arsip skripsi atau tugas akhir seringkali menghadapi kendala nyata:
1.  **Akses Fisik Terbatas:** Mahasiswa harus datang secara fisik ke perpustakaan hanya untuk membaca referensi, yang terbatas oleh jam operasional.
2.  **Risiko Kerusakan Aset:** Dokumen fisik (kertas) rentan rusak, hilang, atau terselip seiring berjalannya waktu.
3.  **Inefisiensi Pencarian:** Sulit mencari referensi spesifik berdasarkan topik atau kata kunci secara manual di tumpukan arsip fisik.

## 💡 Solusi yang Ditawarkan (Solution Overview)
**ThesisHub** hadir sebagai solusi digital untuk modernisasi arsip akademik. Aplikasi ini menawarkan:
* **Aksesibilitas 24/7:** Katalog skripsi dapat diakses kapan saja dan di mana saja tanpa batas fisik.
* **Digitalisasi Aset:** Penyimpanan dokumen skripsi (PDF) dan visual cover (Gambar) secara digital dan aman di Cloud (Metadata) dan Local Storage (File Fisik).
* **Pencarian Cerdas (Smart Search):** Fitur pencarian real-time yang memudahkan penemuan literatur berdasarkan judul, jurusan, atau kata kunci.
* **Kontrol Akses (Public Read, Private Write):** Masyarakat umum dapat membaca abstrak untuk penyebaran ilmu, sementara fitur unduh dan kelola data dibatasi hanya untuk anggota terdaftar.

---

## 🛠️ Tech Stack & Tools

Aplikasi ini dibangun menggunakan arsitektur **MERN Stack** yang modern dan performant:

* **Frontend:** [React.js](https://reactjs.org/) (Hooks, React Router, Axios, Custom CSS)
* **Backend:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (RESTful API)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud Database)
* **File Storage:** Multer (Menangani upload PDF & Gambar ke server lokal)
* **Authentication:** JWT (JSON Web Token) & bcryptjs (Hashing Password)

---

## 🔥 Fitur Utama (Key Features)

### 1. 🔐 Autentikasi & Keamanan
* **Secure Register & Login:** Sistem autentikasi aman menggunakan JWT.
* **Password Hashing:** Password pengguna dienkripsi menggunakan `bcrypt` sebelum disimpan ke database.
* **Role-Based Access:** Tombol *Download* dan *Hapus* terkunci otomatis bagi pengguna yang belum login.

### 2. 📂 Manajemen Arsip (CRUD)
* **Dual File Upload:** Mendukung upload dua tipe file sekaligus: Dokumen Lengkap (**PDF**) dan Cover Art (**Image**) dalam satu form.
* **Manajemen Mandiri:** Pengguna dapat menambahkan data skripsi baru dan menghapus data yang tidak relevan.

### 3. 🎨 UI/UX Interaktif
* **Modern Landing Page:** Tampilan awal *Hero Section* yang informatif dengan statistik data real-time.
* **Interactive Badges:** Filter data cepat dengan mengklik *badge* jurusan pada kartu skripsi.
* **Responsive Design:** Tampilan antarmuka yang adaptif untuk Desktop dan Mobile.

---

## 🚀 Cara Menjalankan Project (Setup Instructions)

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer lokal (Localhost).

### Prasyarat
* Node.js terinstall.
* Koneksi Internet (untuk MongoDB Atlas).

### Langkah 1: Clone Repository
```bash
git clone [https://github.com/USERNAME_GITHUB_KAMU/NAMA_REPO_KAMU.git](https://github.com/USERNAME_GITHUB_KAMU/NAMA_REPO_KAMU.git)
cd thesis-archive-app