const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.animehay.addon.v3',
  version: '1.3.0',
  name: 'AnimeHay Siêu Mượt',
  description: 'Kho 100+ Anime fix lỗi không hiện',
  types: ['series'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [{ type: 'series', id: 'anime_hot', name: 'Anime Đang Hot' }],
  idPrefixes: ['tmdb_']
};

let cachedAnime = [];
let isFetching = false;
const API_KEY = '5cc9196b0521e25287f395726214309c';

// Hàm tải phim thông minh, bắt hệ thống chờ đến khi có dữ liệu
async function fetchAnime() {
  if (cachedAnime.length > 0) return cachedAnime;
  if (isFetching) {
     await new Promise(resolve => setTimeout(resolve, 2000));
     return cachedAnime;
  }
  
  isFetching = true;
  try {
    let allAnime = [];
    for (let page = 1; page <= 5; page++) {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&language=vi-VN&sort_by=popularity.desc&page=${page}`);
      allAnime = allAnime.concat(res.data.results);
    }

    cachedAnime = allAnime.map(a => ({
      id: `tmdb_${a.id}`,
      type: 'series',
      name: a.name,
      poster: a.poster_path ? `https://wsrv.nl/?url=image.tmdb.org/t/p/w500${a.poster_path}` : '',
      background: a.backdrop_path ? `https://wsrv.nl/?url=image.tmdb.org/t/p/original${a.backdrop_path}` : '',
      description: a.overview || 'Nội dung đang được cập nhật...',
      releaseInfo: a.first_air_date ? a.first_air_date.substring(0, 4) : '',
      imdbRating: a.vote_average ? a.vote_average.toString() : ''
    }));
  } catch (e) {
    console.log("Lỗi:", e);
  }
  isFetching = false;
  return cachedAnime;
}

app.get('/manifest.json', (req, res) => res.json(manifest));

app.get('/catalog/:type/:id.json', async (req, res) => {
  // Bắt buộc đợi lấy dữ liệu xong mới trả về cho Nuvio
  const data = await fetchAnime();
  res.json({ metas: data });
});

app.get('/meta/:type/:id.json', async (req, res) => {
  const data = await fetchAnime();
  const anime = data.find(a => a.id === req.params.id);
  res.json({ meta: anime || {} });
});

app.get('/stream/:type/:id.json', (req, res) => {
  res.json({
    streams: [
      { title: 'Tập 1 - Vietsub HD', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'Tập 2 - Vietsub HD', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
    ]
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Anime 100+ đang chạy ổn định!');
});
        
