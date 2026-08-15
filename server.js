const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.example.motchilladdon',
  version: '1.0.0',
  name: 'Motchill Addon',
  description: 'Addon xem phim tổng hợp cho Nuvio',
  types: ['movie'],
  resources: ['catalog', 'stream'],
  catalogs: [
    {
      type: 'movie',
      id: 'motchill_movies',
      name: 'Phim Hot Tổng Hợp'
    }
  ],
  idPrefixes: ['motchill_']
};

app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

app.get('/catalog/:type/:id.json', (req, res) => {
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
    },
    {
      id: 'motchill_3',
      type: 'movie',
      name: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhKXYF.jpg',
      description: 'Kẻ đánh cắp giấc mơ trong những phi vụ đầy kịch tính.'
    },
    {
      id: 'motchill_4',
      type: 'movie',
      name: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QpI6EKi7yf8boKTSK6lE9QO.jpg',
      description: 'Hành trình xuyên không gian để cứu lấy nhân loại.'
    }
  ];
  res.json({ metas });
});

app.get('/stream/:type/:id.json', (req, res) => {
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
