# Persona Community Player — Form System

## Deploy
1. Upload seluruh isi ZIP ke web hosting dan pertahankan struktur direktori.
2. Buka Firebase Console project `pcp-form-4a4cb` → Realtime Database → Rules. Salin **seluruh** isi `database.rules.json` di root ZIP, lalu Publish. Jangan memasang file `firestore.rules` ke RTDB.
3. Firebase Authentication → Sign-in method → Email/Password: enable. Buat akun admin di Authentication → Users.
4. Login di `/page/PCP_Form_System/admin/index.html`. Buat form di Form Editor, simpan, lalu PUBLISH. Buka URL publik dari tab Settings.
5. Uji form publik di browser incognito: isi form dan kirim, lalu periksa halaman Responses pada admin.

## Database
Form disimpan pada `/forms/{formId}`; jawaban di `/responses/{formId}/{responseId}` pada Firebase Realtime Database PCP. Form publik hanya bisa dibaca bila published=true. Kiriman publik hanya diizinkan saat form published dan situs tidak dalam maintenance.

## Batasan
Firebase tidak bisa dites live tanpa akses ke project. Pengaturan Rules **wajib diterapkan manual**; upload ZIP saja tidak mengubah Rules database. Import Community JSON hanya mengimpor struktur form, bukan jawaban lama. File `FIREBASE_SETUP.md` lama yang menyebut Firestore adalah dokumentasi usang.
