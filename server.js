const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Sử dụng API TMDB (miễn phí) để lấy poster và tên phim thật
const TMDB_API_KEY = '5cc9196b0521e25287f395726214309c'; // API Key công cộng
const BASE_URL = 'https://api.themoviedb.org/3';

const manifest = {
  id: 'org.example.motchillreal',
  version: '1.0.0',
  name: 'Kho Phim Real',
  description: 'Addon với phim và poster thật',
  types: ['movie'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [{ type: 'movie', id: 'top_movies', name: 'Phim Hot TMDB' }],
  idPrefixes: ['tmdb_']
};

app.get('/manifest.json', (req, res) => res.json(manifest));

app.get('/catalog/movie/top_movies.json', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=vi-VN`);
    const metas = response.data.results.map(m => ({
      id: `tmdb_${m.id}`,
      type: 'movie',
      name: m.title,
      poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      description: m.overview
    }));
    res.json({ metas });
  } catch (e) { res.json({ metas: [] }); }
});

app.get('/meta/movie/:id.json', async (req, res) => {
  const id = req.params.id.replace('tmdb_', '');
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=vi-VN`);
    res.json({ meta: { id: `tmdb_${id}`, name: response.data.title, poster: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`, description: response.data.overview } });
  } catch (e) { res.json({ meta: {} }); }
});

app.get('/stream/movie/:id.json', (req, res) => {
  // Link phim mẫu (Vì addon chỉ có nhiệm vụ hiển thị info, còn link phim thực tế phụ thuộc vào nguồn bạn muốn chèn)
  res.json({ streams: [{ title: 'Xem Online', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }] });
});

app.listen(process.env.PORT || 3000);
