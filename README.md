# 🎓 ThesisHub — Digital Thesis Repository

> **Platform Repositori Skripsi Digital Terintegrasi.**
> *Project ini dikembangkan untuk solusi manajemen arsip akademik dalam kompetisi Vibe Coding: "Solve a Real Problem".*

<img width="1363" height="635" alt="image" src="https://github.com/user-attachments/assets/57595a15-06b2-4969-9a5c-0ec9ad7b3756" />


---

## 📖 Latar Belakang Masalah (Problem Statement)
Di lingkungan kampus dan akademis, pengelolaan arsip skripsi atau tugas akhir seringkali menghadapi kendala nyata:
1.  **Akses Fisik Terbatas:** Mahasiswa harus datang secara fisik ke perpustakaan.
2.  **Risiko Kerusakan Aset:** Dokumen fisik rentan rusak atau hilang.
3.  **Inefisiensi Pencarian:** Sulit mencari referensi spesifik secara manual.

## 💡 Solusi yang Ditawarkan (Solution Overview)
**ThesisHub** hadir sebagai solusi digital yang menawarkan:
* **Aksesibilitas 24/7:** Katalog skripsi dapat diakses kapan saja.
* **Digitalisasi Aset:** Penyimpanan dokumen skripsi (PDF) dan visual cover (Gambar) secara digital.
* **Pencarian Cerdas (Smart Search):** Fitur pencarian real-time berdasarkan judul, jurusan, atau kata kunci.
* **Kontrol Akses:** Masyarakat umum dapat membaca abstrak, fitur unduh dibatasi untuk anggota.

---

## 🛠️ Tech Stack & Tools

* **Frontend:** React.js (Hooks, Axios)
* **Backend:** Node.js & Express.js
* **Database:** MongoDB Atlas (Cloud)
* **File Storage:** Multer
* **Authentication:** JWT & bcryptjs

---

## 🔥 Fitur Utama

1.  **🔐 Autentikasi:** Register & Login aman dengan JWT.
2.  **📂 Manajemen Arsip:** Dual upload (PDF + Gambar).
3.  **🎨 UI/UX Interaktif:** Landing page modern & responsif.

---

## 🚀 Cara Menjalankan Project

### 1. Clone Repository
```bash
git clone (https://github.com/nadiakiranaa/vibe-coding-pweb-5027241005.git)
cd thesis-archive-app
```

### 2. Setup Backend
```
cd Backend
npm install
# Buat folder uploads manual
mkdir uploads
cd uploads
mkdir pdfs posters
cd ../..
npm run dev
```
### 3. Setup Frontend
```
cd Frontend
npm install
npm start
```
### 👨‍💻 Author
### Developed by Nadia Kirana Afifah Prahandita

### 3. Edit Bagian Penting
Sebelum disimpan, ubah bagian ini:
* `Nadia Kirana Afifah Prahandita` di paling bawah 
* `(https://github.com/nadiakiranaa/vibe-coding-pweb-5027241005.git)`

### 4. Push ke GitHub
Simpan file (`Ctrl + S`), lalu buka terminal di VS Code (folder `PWEB DIGISKRIPS`) dan ketik 3 perintah ini:

```bash
git add README.md
git commit -m "Menambahkan Dokumentasi README"
git push -u origin main
```
## 📸 Fitur Unggulan (App Showcase)

### Berikut adalah tampilan antarmuka dan fitur utama dari **ThesisHub**:

### 1. Autentikasi Pengguna (Login & Register)
Gerbang utama keamanan aplikasi untuk membedakan antara pengunjung umum dan anggota terdaftar.
<img width="1363" height="636" alt="image" src="https://github.com/user-attachments/assets/d9caaa47-686e-4d2a-939f-04324bff72a2" />

**A. Halaman Registrasi (Daftar Akun)**
Antarmuka pendaftaran yang bersih memudahkan pengguna baru untuk membuat akun dalam hitungan detik. Data pengguna disimpan dengan enkripsi standar industri.
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/6907a449-fc67-453a-bceb-07408108aa22" />


**B. Halaman Login (Masuk)**
Gerbang masuk bagi pengguna terdaftar. Setelah login berhasil, pengguna akan mendapatkan token akses penuh untuk mengunduh dokumen dan mengelola data skripsi.
<img width="1365" height="637" alt="image" src="https://github.com/user-attachments/assets/17382382-5572-4119-b1db-3b72e8a79c35" />


### 2. Modern Landing Page & Dashboard Stats
Setelah masuk (atau di halaman utama), pengguna disambut dengan tampilan bersih dan statistik real-time (Jumlah Skripsi, Jurusan, Tahun) yang memberikan ringkasan data.
<img width="1362" height="635" alt="image" src="https://github.com/user-attachments/assets/44679fe9-908c-4f8b-baa3-3cfeb0ad1dfb" />


### 3. Pencarian Cerdas & Filter Jurusan
Pengguna dapat mencari skripsi berdasarkan **Judul**, **Kata Kunci**, atau **Jurusan**.
> *Fitur Unik:* Klik pada *badge* jurusan di kartu untuk otomatis memfilter skripsi yang sejenis tanpa perlu mengetik ulang.
<img width="1365" height="636" alt="image" src="https://github.com/user-attachments/assets/f7bf450d-549a-4367-946f-2dadc750ede0" />

### 4. Tampilan Dashboard Skripsi 
<img width="1365" height="640" alt="image" src="https://github.com/user-attachments/assets/f26980c1-7934-4771-a2d6-36a0486d7972" />

### 5. Kontrol Akses (Public Read, Private Write)
Menerapkan sistem keamanan untuk melindungi aset intelektual:
* **Pengunjung Tamu:** Hanya bisa membaca Judul & Abstrak. Tombol download terkunci.
<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/fc7f2147-b142-4c0f-b0a6-0342f04843a4" />

* **Member Terdaftar:** Bebas download PDF lengkap dan mengelola data.
<img width="1365" height="647" alt="image" src="https://github.com/user-attachments/assets/62f0ec7e-9397-412c-b599-4c7be8c39382" />


### 5. Manajemen Arsip Digital (Upload)
Formulir upload yang intuitif mendukung penyimpanan dua jenis aset sekaligus dalam satu kali proses:
* 📄 **Dokumen Skripsi** (PDF)
* 🖼️ **Cover Visual** (Gambar Poster)
<img width="1362" height="635" alt="image" src="https://github.com/user-attachments/assets/38eff21f-85b2-4cef-83d3-f625a964ecf4" />

<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/74e52b41-a07e-4180-a1b9-e3479f4e4214" />


---
