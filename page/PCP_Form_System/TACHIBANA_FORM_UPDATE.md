# Form Community Tachibana → Persona Community Player

Form publik kini menggunakan layout kartu pertanyaan dan kartu pilihan ala Community Tachibana, dengan palet warna PCP. Pembuatan link otomatis tetap mengikuti format Tachibana `form/index.html?id=FORM_ID`, dan tombol SALIN LINK tersedia di daftar form maupun editor.

Data form dan respons menggunakan Firebase Realtime Database PCP yang sudah ada. Terapkan `database.rules.json` di root website ke Firebase RTDB sebelum pengujian live. Database dan kredensial Tachibana tidak digunakan. Tidak ada data Community lama yang otomatis diimpor.
