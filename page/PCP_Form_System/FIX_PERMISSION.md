# Perbaikan PERMISSION_DENIED
1. Firebase Console → project `pcp-form-4a4cb` → Realtime Database → Rules. Tempel isi `database.rules.json` dari ZIP ini dan Publish. Jangan tempel di Firestore.
2. Firebase Authentication → Users: pastikan email admin terdaftar di proyek **yang sama**. Login ulang di `/page/PCP_Form_System/admin/index.html`.
3. Coba buat form. Jika masih PERMISSION_DENIED, cek UID yang ditampilkan di pesan error; jika TIDAK LOGIN, perbaiki login; jika UID terisi, rules mungkin belum dipublish atau project salah.
4. Aturan sementara ini mengizinkan SEMUA pengguna Firebase Authentication untuk mengelola form. Untuk produksi, batasi akses menggunakan UID admin yang benar sebelum mengaktifkan pendaftaran akun publik.
5. Situs masih HTTP pada screenshot. Aktifkan SSL/HTTPS di hosting sebelum dipakai produksi.
