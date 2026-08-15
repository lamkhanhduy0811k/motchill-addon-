const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.animehay.addon.v2',
  version: '1.2.0',
  name: 'AnimeHay 100+',
  description: 'Kho 100+ Anime với ảnh bẻ khóa mạng',
  types: ['series'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [{ type: 'series', id: 'anime_hot', name: 'Anime Đang Hot' }],
  idPrefixes: ['tmdb_']
};

let cachedAnime = [];
const API_KEY = '5cc9196b0521e25287f395726214309c';

// Hàm tự động tải 100 bộ Anime khi khởi động Server
async function loadAnime() {
  try {
    console.log("Đang tải dữ liệu 100+ Anime...");
    let allAnime = [];
    
    // Quét 5 trang API để lấy đúng 100 bộ phim
    for (let page = 1; page <= 5; page++) {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&language=vi-VN&sort_by=popularity.desc&page=${page}`);
      allAnime = allAnime.concat(res.data.results);
    }

    cachedAnime = allAnime.map(a => ({
      id: `tmdb_${a.id}`,
      type: 'series',
      name: a.name,
      // Dùng wsrv.nl để vượt tường lửa nhà mạng VN chặn ảnh
      poster: a.poster_path ? `https://wsrv.nl/?url=image.tmdb.org/t/p/w500${a.poster_path}` : '',
      background: a.backdrop_path ? `https://wsrv.nl/?url=image.tmdb.org/t/p/original${a.backdrop_path}` : '',
      description: a.overview || 'Nội dung đang được cập nhật...',
      releaseInfo: a.first_air_date ? a.first_air_date.substring(0, 4) : '',
      imdbRating: a.vote_average ? a.vote_average.toString() : ''
    }));
    
    console.log(`Đã tải xong ${cachedAnime.length} bộ Anime!`);
  } catch (e) {
    console.log("Lỗi tải:", e.message);
  }
}

// Chạy hàm tải phim ngay khi server khởi động
loadAnime();

app.get('/manifest.json', (req, res) => res.json(manifest));

app.get('/catalog/:type/:id.json', (req, res) => {
  res.json({ metas: cachedAnime });
});

app.get('/meta/:type/:id.json', (req, res) => {
  const anime = cachedAnime.find(a => a.id === req.params.id);
  res.json({ meta: anime || {} });
});

app.get('/stream/:type/:id.json', (req, res) => {
  res.json({
    streams: [
      { title: 'Tập 1 - Vietsub 1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'Tập 2 - Vietsub 1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'Tập 3 - Vietsub 1080p', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
    ]
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Anime 100+ đang chạy!');
});
