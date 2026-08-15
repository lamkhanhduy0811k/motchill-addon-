const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const TMDB_API_KEY = '85973b3133345759178652277d337a89';

const manifest = {
  id: 'org.example.motchilladdon',
  version: '1.0.0',
  name: 'Motchill Addon',
  description: 'Addon xem phim hot cho Nuvio',
  types: ['movie'],
  resources: ['catalog', 'stream'],
  catalogs: [
    {
      type: 'movie',
      id: 'motchill_movies',
      name: 'Phim Hot Thịnh Hành'
    }
  ],
  idPrefixes: ['motchill_']
};

app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

app.get('/catalog/:type/:id.json', async (req, res) => {
  const { id } = req.params;

  if (id === 'motchill_movies') {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=vi-VN&page=1`);
      const metas = response.data.results.map(m => ({
        id: 'motchill_' + m.id,
        type: 'movie',
        name: m.title,
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/300x450',
        description: m.overview || 'Không có mô tả.'
      }));

      return res.json({ metas });
    } catch (error) {
      console.error('Lỗi gọi API TMDB:', error.message);
      return res.json({ metas: [] });
    }
  }

  res.json({ metas: [] });
});

app.get('/stream/:type/:id.json', async (req, res) => {
  const streams = [
    {
      title: 'Phát trực tuyến - HD',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }
  ];
  res.json({ streams });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
