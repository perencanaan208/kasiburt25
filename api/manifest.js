// Vercel Serverless Function — path file ini WAJIB /api/manifest.js (bukan .json!)
// Hanya file .js/.ts di dalam folder /api yang dijalankan Vercel sebagai fungsi.
// Kalau namanya manifest.json, Vercel akan menganggapnya file statis biasa,
// bukan kode yang dijalankan — makanya versi sebelumnya tidak pernah bekerja.

const GAS_URL = "https://script.google.com/macros/s/AKfycbzUw4wgeopnzqz537XreVsB1tWLpF7VyNd4fSnOng4a49yd6V5ost1rfbdOqjgoM88kxQ/exec";

module.exports = async function handler(req, res) {
  let iconUrl = null;

  try {
    const base = GAS_URL.split('?')[0];
    const r = await fetch(base + '?type=iconUrl');
    const data = await r.json();
    if (data && data.url) iconUrl = data.url;
  } catch (err) {
    // Gagal ambil dari GAS -> pakai ikon bawaan statis di bawah sebagai cadangan.
  }

  const icons = iconUrl
    ? [
        { src: iconUrl, sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: iconUrl, sizes: '512x512', type: 'image/png', purpose: 'any' }
      ]
    : [
        { src: '/favicon.png', sizes: '48x48', type: 'image/png' },
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
      ];

  const manifest = {
    name: "Kas Ibu-ibu — Karanggeneng RT 25 Mangen",
    short_name: 'Kas RT 25',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FBF2EA',
    theme_color: '#7A2348',
    icons: icons
  };

  res.setHeader('Content-Type', 'application/manifest+json');
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
  res.status(200).send(JSON.stringify(manifest));
};
