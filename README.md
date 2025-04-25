# Aplikasi Manajemen Telur

Aplikasi untuk menghitung dan melacak distribusi dan produksi telur dengan menggunakan IndexedDB sebagai penyimpanan data.

## Fitur

- Melacak produksi telur dalam satuan butir
- Melacak distribusi telur dalam satuan kg dan peti
- Konversi otomatis antara satuan:
  - 16 butir = 1 kg
  - 10 kg = 1 peti
- Laporan produksi dan distribusi
- Manajemen tanggal dengan kalender
- Penyimpanan data lokal menggunakan IndexedDB

## Teknologi

- React
- IndexedDB (dengan idb)
- TailwindCSS
- Vite

## Pengembangan Lokal

1. Clone repositori
2. Install dependensi dengan `npm install`
3. Jalankan server pengembangan dengan `npm run dev`
4. Buka browser di `http://localhost:5173`

## Build Produksi

Untuk membuat versi produksi:

```
npm run build
```

Output build akan ada di folder `dist`.