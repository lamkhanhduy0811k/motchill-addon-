const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

// Sử dụng API Key công khai của TMDB (miễn phí)
const TMDB_API_KEY = '85973b3133345759178652277d337a89'; 

const manifest = {
  id: 'org.example.motchilladdon',
  version: '1.0.0',
  name: 'Motchill Addon (Full)',
  description: 'Addon tự động lấy 100+ phim hot từ TMDB',
  types: ['movie'],
  resources: ['catalog', 'stream'],
  catalogs: [{ type: 'movie', id: 'motchill_movies', name: 'Top 100 Phim Hot' }],
  idPrefixes: ['motchill_']
};

app.get('/manifest.json', (req, res) => res.json(manifest));

app.get('/catalog/:type/:id.json', async (req, res) => {
  try {
    let allMovies = [];
    // Lấy 5 trang (mỗi trang 20 phim = 100 phim)
    for (let page = 1; page <= 5; page++) {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=vi-VN&page=${page}`);
      const movies = response.data.results.map(m => ({
        id: 'motchill_' + m.id,
        type: 'movie',
        name: m.title,
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
        description: m.overview
      }));
      allMovies.push(...movies);
    }
    res.json({ metas: allMovies });
  } catch (error) {
    res.json({ metas: [] });
  }
});

app.get('/stream/:type/:id.json', (req, res) => {
  // Demo stream
  res.json({ streams: [{ title: 'Xem chất lượng cao', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }] });
});

app.listen(process.env.PORT || 3000);
