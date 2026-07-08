# Aplikasi Manajemen Inventaris Mobile (Inventory Mobile App)

Aplikasi mobile berbasis web (PWA/Hybrid) untuk manajemen inventaris yang dibangun menggunakan **Vue 3**, **Vite**, **Tailwind CSS**, dan **Capacitor**. Aplikasi ini dilengkapi dengan penyimpanan lokal offline menggunakan **Dexie.js** (IndexedDB) serta berbagai fitur canggih seperti pemindai barcode, pencetakan struk, dan ekspor/impor data.

## 🌟 Fitur Utama

- **Manajemen Barang:** Input, edit, hapus, dan tampilkan daftar barang (inventory).
- **Pemindai Barcode (Barcode Scanner):** Terintegrasi dengan Capacitor Barcode Scanner untuk memindai barang secara langsung melalui kamera HP.
- **Kalkulasi Keuangan:** Perhitungan HPP (Harga Pokok Penjualan) dan manajemen biaya operasional (BiayaView, HppView).
- **Kasir / Penjualan:** Pencatatan riwayat penjualan dan pembuatan struk (ReceiptView, SalesHistoryView).
- **Dashboard & Laporan:** Ringkasan statistik dan analitik langsung di dashboard.
- **Ekspor/Impor Data:** Mendukung format Excel (`xlsx`) dan PDF (`jsPDF`).
- **Database Offline:** Data disimpan secara lokal di perangkat menggunakan `dexie` sehingga aplikasi dapat berjalan tanpa koneksi internet yang terus-menerus.
- **Share & Filesystem:** Integrasi native untuk berbagi file dan manajemen sistem file perangkat menggunakan Capacitor.

## 🛠️ Teknologi yang Digunakan

**Frontend:**
- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)

**Backend / Local Storage:**
- [Dexie.js](https://dexie.org/) (IndexedDB Database)

**Native & Mobile (Capacitor):**
- `@capacitor/core`, `@capacitor/android`, `@capacitor/app`
- `@capacitor/barcode-scanner`
- `@capacitor/filesystem`, `@capacitor/share`

**Utilities:**
- `dayjs` (Format Tanggal)
- `xlsx` (Ekspor/Impor Excel)
- `jspdf` & `jspdf-autotable` (Cetak PDF)
- `qrcode` (Pembuat QR Code)
- `jose` (JWT/Enkripsi)

## 📂 Struktur Proyek Utama

```text
src/
├── assets/       # Gambar, icon, dan file statis lainnya
├── components/   # Komponen UI Vue yang dapat digunakan ulang (reusable)
├── composables/  # Vue Composables (fungsi reaktif)
├── database/     # Konfigurasi Dexie.js (db.js)
├── pages/        # Halaman Utama (Views)
│   ├── DashboardView.vue
│   ├── InputView.vue
│   ├── ListView.vue
│   ├── ScanView.vue
│   ├── ReceiptView.vue
│   └── ...
├── router/       # Konfigurasi Vue Router
├── utils/        # Fungsi-fungsi utilitas pembantu
├── App.vue       # Komponen Root
└── main.js       # Entry point aplikasi
```

## 🚀 Cara Instalasi dan Menjalankan (Development)

### Persyaratan Sistem
- [Node.js](https://nodejs.org/) (versi 20.19.0 atau di atas 22.12.0)
- NPM atau Yarn

### Langkah-langkah

1. **Clone repositori ini atau ekstrak file proyek.**
2. **Masuk ke direktori proyek:**
   ```sh
   cd inventory-mobile-app
   ```
3. **Instal dependensi:**
   ```sh
   npm install
   ```
4. **Jalankan server pengembangan lokal (Hot-Reload):**
   ```sh
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

## 📱 Build untuk Mobile (Capacitor / Android)

Proyek ini telah dikonfigurasi dengan Capacitor untuk dijalankan sebagai aplikasi Android asli (Native).

1. **Build aplikasi web untuk production:**
   ```sh
   npm run build
   ```
2. **Sinkronisasi file build ke proyek Android:**
   ```sh
   npx cap sync android
   ```
3. **Buka proyek di Android Studio:**
   ```sh
   npx cap open android
   ```
   *Dari Android Studio, Anda bisa menjalankan aplikasi ke emulator atau perangkat fisik (HP).*

## 💡 Tips Pengembangan

- **DevTools:** Direkomendasikan menggunakan [Vue.js devtools](https://devtools.vuejs.org/) di browser untuk mempermudah debugging komponen Vue.
- **Kustomisasi:** Jika ingin mengubah konfigurasi Vite, buka file `vite.config.js`. Konfigurasi Capacitor ada di `capacitor.config.json`.
