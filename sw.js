// Service worker minimal untuk Kas Wali Murid.
// Tidak melakukan caching apa pun secara sengaja (semua data live dari GAS),
// tapi keberadaan service worker terdaftar ini penting supaya Chrome
// (khususnya di Android) menganggap halaman ini benar-benar "installable"
// dan menampilkan ikon aplikasi yang bersih (tanpa badge kecil browser).
self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  // Selalu ambil langsung dari jaringan; tidak ada caching offline.
  event.respondWith(fetch(event.request));
});
