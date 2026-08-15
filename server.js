const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.example.motchilladdon',
  version: '1.0.0',
  name: 'Motchill Addon',
  description: 'Addon xem phim từ Motchill cho Nuvio',
  types: ['movie', 'series'],
  resources: ['catalog', 'stream'],
  catalogs: [
    {
      type: 'movie',
      id: 'motchill_movies',
      name: 'Phim mới Motchill'
    }
  ],
  idPrefixes: ['motchill_']
};

app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

// Trả về danh sách phim mẫu để hiển thị ổn định trên Nuvio
app.get('/catalog/:type/:id.json', async (req, res) => {
  const { id } = req.params;

  if (id === 'motchill_movies') {
    const metas = [
      {
        id: 'motchill_1',
        type: 'movie',
        name: 'Avengers: Endgame',
        poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        description: 'Hồi kết của vũ trụ điện ảnh Marvel.'
      },
      {
        id: 'motchill_2',
        type: 'movie',
        name: 'Spider-Man: No Way Home',
        poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4hrTY1GPzxvfi1lxQR9.jpg',
        description: 'Người Nhện đối đầu với các kẻ thù đa vũ trụ.'
      }
    ];
    return res.json({ metas });
  }

  res.json({ metas: [] });
});

app.get('/stream/:type/:id.json', async (req, res) => {
  const { id } = req.params;

  if (id.startsWith('motchill_')) {
    const streams = [
      {
        title: 'Motchill Server - 1080p',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      }
    ];
    return res.json({ streams });
  }

  res.json({ streams: [] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
