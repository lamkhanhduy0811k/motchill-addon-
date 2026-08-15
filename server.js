const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const manifest = {
  id: 'org.animehay.superfix.v3',
  version: '3.0.0',
  name: 'Anime Chuẩn Fix',
  description: 'Đã sửa lỗi ảnh và xem video',
  types: ['movie'], // Chuyển thành movie để bấm là xem luôn
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [
    { type: 'movie', id: 'anime_hot_fix', name: 'Anime Đang Hot' }
  ],
  idPrefixes: ['ah_']
};

// Dùng ảnh từ Amazon/IMDb để Nuvio không bị lỗi đen ảnh
const animeList = [
  {
    id: 'ah_1', type: 'movie', name: 'Demon Slayer',
    poster: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2E4YS00NmM4LTliMTYtNzhjZTU3MzhsY2QwXkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg',
    description: 'Thanh Gươm Diệt Quỷ.'
  },
  {
    id: 'ah_2', type: 'movie', name: 'Jujutsu Kaisen',
    poster: 'https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtNjAwZa00ZjhkLWIzNGUtMWE5NTg5Y2E4OWU3XkEyXkFqcGdeQXVyMTE0MzQwOTUw._V1_FMjpg_UX1000_.jpg',
    description: 'Chú Thuật Hồi Chiến.'
  },
  {
    id: 'ah_3', type: 'movie', name: 'Attack on Titan',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTY5ODk1NDcyMV5BMl5BanBnXkFtZTgwMTE4MTQ0ODE@._V1_FMjpg_UX1000_.jpg',
    description: 'Đại Chiến Titan.'
  },
  {
    id: 'ah_4', type: 'movie', name: 'One Piece',
    poster: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg',
    description: 'Vua Hải Tặc.'
  }
];

app.get('/manifest.json', (req, res) => res.json(manifest));

app.get('/catalog/:type/:id.json', (req, res) => {
  res.json({ metas: animeList });
});

app.get('/meta/:type/:id.json', (req, res) => {
  const anime = animeList.find(a => a.id === req.params.id);
  res.json({ meta: anime || {} });
});

app.get('/stream/:type/:id.json', (req, res) => {
  res.json({
    streams: [
      {
        title: 'Bấm vào để xem phim',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      }
    ]
  });
});

app.listen(process.env.PORT || 3000);
