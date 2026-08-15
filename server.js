const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const manifest = {
  id: 'org.animehay.superfix',
  version: '2.0.0',
  name: 'AnimeHay Siêu Tốc',
  description: 'Addon xem Anime không độ trễ',
  types: ['series'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [
    { type: 'series', id: 'anime_hot_fix', name: 'Anime Đang Hot' }
  ],
  idPrefixes: ['ah_']
};

// Dữ liệu tĩnh không cần chờ API, load tức thì
const animeList = [
  { id: 'ah_1', name: 'Demon Slayer', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/xUfRZu2mi8bB6OcgE22AMbiZoyp.jpg', description: 'Thanh Gươm Diệt Quỷ.' },
  { id: 'ah_2', name: 'Jujutsu Kaisen', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/1pvOQAcibL4Lz58sPq3x1P3V7s8.jpg', description: 'Chú Thuật Hồi Chiến.' },
  { id: 'ah_3', name: 'Attack on Titan', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/8tHngEMq2hAEEbEOPbApeDk1Ttb.jpg', description: 'Đại Chiến Titan.' },
  { id: 'ah_4', name: 'One Piece', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/fcXdJmMfdAXhEq6Ztd3975sTXYc.jpg', description: 'Vua Hải Tặc.' },
  { id: 'ah_5', name: 'Solo Leveling', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/wPzR9Wv1x8X9Qx8g2uV7g6r38E.jpg', description: 'Tôi Thăng Cấp Một Mình.' },
  { id: 'ah_6', name: 'Naruto Shippuden', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/x5WsNvFxcNUKL4F5gA7n1PntwQ0.jpg', description: 'Cửu Vĩ Hồ.' },
  { id: 'ah_7', name: 'Bleach', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/2Eewbc7yH8zE48pWpI6YQjV8hLp.jpg', description: 'Sứ Giả Thần Chết.' },
  { id: 'ah_8', name: 'Hunter x Hunter', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/cvhNj9eoRCElDwvIXBgvRoBq2x1.jpg', description: 'Thợ Săn.' },
  { id: 'ah_9', name: 'My Hero Academia', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/phuzm1Yp0g7n2y480q10yJv9JvR.jpg', description: 'Học Viện Siêu Anh Hùng.' },
  { id: 'ah_10', name: 'Chainsaw Man', poster: 'https://wsrv.nl/?url=image.tmdb.org/t/p/w500/npdB6eFzizki0WaZ1OvKcJrWe97.jpg', description: 'Người Cưa.' }
].map(a => ({ ...a, type: 'series' }));

app.get('/manifest.json', (req, res) => res.json(manifest));
app.get('/catalog/:type/:id.json', (req, res) => res.json({ metas: animeList }));
app.get('/meta/:type/:id.json', (req, res) => {
  res.json({ meta: animeList.find(a => a.id === req.params.id) || {} });
});
app.get('/stream/:type/:id.json', (req, res) => {
  res.json({ streams: [{ title: 'Xem Phim', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }] });
});

app.listen(process.env.PORT || 3000);
