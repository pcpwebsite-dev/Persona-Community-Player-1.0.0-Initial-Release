# PCP Console v3 — audit dan perbaikan

## Temuan nyata dari ZIP v2.0
- Tujuh halaman admin menumpuk `common.css`, `admin.css` / CSS khusus halaman, `professional.css`, `admin-unified.css`, dan `admin-studio.css`, ditambah CSS inline di Form Builder. Banyak aturan `!important` saling bertabrakan.
- Tema v2.0 memaksakan permukaan terang saat pengontrol Firebase tetap mengubah mode gelap/terang. Tombol tema dinonaktifkan di admin v3 agar tidak memberi ekspektasi palsu; halaman publik tidak diubah.
- Form Builder, Responses, dan lima halaman lainnya menggunakan tiga struktur sidebar dan header berbeda. CSS v3 menyamakan tampilan sambil mempertahankan ID/JS asli.
- Respons tersimpan di `/responses/{formId}` melalui adapter RTDB; aturan yang dikirim tetap mengizinkan semua akun login mengakses admin. Ini **risiko keamanan lama yang belum diperbaiki** karena perlu UID admin resmi.

## Cakupan v3
Semua 7 halaman admin: login, dashboard, status, community, builder, responses, operations. Menghapus tiga stylesheet override berlapis dari halaman admin; satu stylesheet `console-v3.css` menjadi lapisan tema akhir. Tidak mengubah struktur data, konfigurasi Firebase, JS, atau halaman publik.

## Pengujian sebelum produksi
Periksa login, CRUD form, publikasi, tautan publik, kirim respons, ekspor CSV, perubahan status situs, pengaturan profil, dan operasi admin menggunakan Firebase staging. Belum diuji terhadap Firebase produksi. Backup sebelum mengganti file; unggah seluruh ZIP dengan struktur folder utuh.
