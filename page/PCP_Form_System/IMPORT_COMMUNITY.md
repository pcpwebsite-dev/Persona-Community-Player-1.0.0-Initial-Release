# Import form Community lama ke Persona Community Player

Form lama disimpan di Firestore project Community, bukan di ZIP `community-main.zip`. Karena itu form dan respons yang sudah dibuat secara online tidak dapat diekstrak dari ZIP saja.

1. Ekspor dokumen koleksi `forms` dari Firestore Community ke JSON. Untuk tiap form sertakan `title`, `description`, dan array `questions` (dokumen subkoleksi `forms/{id}/questions`, urutkan berdasarkan `createdAt` atau `order`). Contoh format:

```json
{"forms":[{"title":"Recruitment","description":"Pendaftaran","questions":[{"title":"Nama","type":"text","required":true},{"title":"Divisi","type":"radio","options":["Editor","Moderator"],"required":true}]}]}
```

2. Login admin PCP, buka `page/PCP_Form_System/admin/builder.html`, klik **IMPORT COMMUNITY JSON** dan pilih file. Semua form diimpor sebagai **draft** agar bisa ditinjau sebelum diterbitkan.
3. Form PCP menggunakan Firebase RTDB project PCP yang sudah dikonfigurasi. Import hanya struktur form, tidak memindahkan respons lama, user, atau kredensial dari Community.
4. Unggah file form system yang diubah bersama ZIP lengkap, tanpa menghapus database atau mengganti konfigurasi Firebase. Backup RTDB sebelum deploy.

Catatan: hanya `text`, `textarea`, `radio`, `checkbox`, `select`, `date`, `time`, `email`, `number`, dan `scale` yang dimapping. Tipe lain menjadi short answer. Ekspor pertanyaan dari subkoleksi wajib digabung ke setiap form karena tidak disertakan secara otomatis dalam dokumen parent.
