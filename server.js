const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.example.motchilladdon',
  version: '1.0.0',
  name: 'Motchill Addon 100+',
  description: 'Addon xem phim tổng hợp 100+ bộ',
  types: ['movie'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [{ type: 'movie', id: 'motchill_movies', name: 'Kho Phim 100 Bộ' }],
  idPrefixes: ['motchill_']
};

// Hàm tự sinh 100 bộ phim
const generateMovies = () => {
  let movies = [];
  for (let i = 1; i <= 100; i++) {
    movies.push({
      id: `motchill_${i}`,
      type: 'movie',
      name: `Phim Bom Tấn ${i}`,
      poster: `https://picsum.photos/id/${i + 10}/500/750`,
      description: `Đây là bộ phim bom tấn số ${i} trong kho phim của bạn. Nội dung hấp dẫn đang chờ đón.`
    });
  }
  return movies;
};

const moviesData = generateMovies();

app.get('/manifest.json', (req, res) => res.json(manifest));
app.get('/catalog/:type/:id.json', (req, res) => res.json({ metas: moviesData }));
app.get('/meta/:type/:id.json', (req, res) => {
  const movie = moviesData.find(m => m.id === req.params.id);
  res.json({ meta: movie || {} });
});
app.get('/stream/:type/:id.json', (req, res) => {
  res.json({ streams: [{ title: 'Xem phim chất lượng cao', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));
