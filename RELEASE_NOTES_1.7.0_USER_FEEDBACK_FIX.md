# PCP 1.7.0 — User Feedback Fix

Perbaikan berdasarkan feedback user 25 September 2026:

- Halaman form publik dirapikan: top bar/theme bar dihilangkan dan progress bar dibuat rata di dalam container.
- Accent bar tebal di header form dihilangkan agar tampilan awal lebih clean.
- Kelola Form sekarang memiliki tombol **Hapus** per form, dengan konfirmasi dan penghapusan respons terkait.
- Response Center diperbaiki dari error JavaScript lama (`back`/`exportBtn` tidak tersedia).
- Tab Perorangan dipisahkan per pertanyaan dengan kartu jawaban yang jelas agar jawaban tidak tercampur.
- Export response ditambahkan: **Excel (.xlsx), Word (.doc), PDF (.pdf), dan CSV**.
- Export hanya aktif setelah form dipilih dan mencakup waktu submit, email (jika dikumpulkan), dan semua jawaban.
- Navigasi tabel respons dapat membuka respons individual yang sesuai.
- Static syntax check untuk module JavaScript: PASS.
