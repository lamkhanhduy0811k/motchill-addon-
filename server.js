const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.animehay.addon',
  version: '1.1.0',
  name: 'AnimeHay Vietsub',
  description: 'Kho Anime Vietsub chất lượng cao cực mượt',
  types: ['series'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [
    { type: 'series', id: 'anime_hot', name: 'Anime Đang Hot' }
  ],
  idPrefixes: ['anime_']
};

// Dữ liệu Anime với đầy đủ thông tin chuẩn như một App thực thụ
const animeData = [
  {
    id: 'anime_1',
    type: 'series',
    name: 'Demon Slayer (Thanh Gươm Diệt Quỷ)',
    poster: 'https://image.tmdb.org/t/p/w500/xUfRZu2mi8bB6OcgE22AMbiZoyp.jpg',
    background: 'https://image.tmdb.org/t/p/original/hpe2x28x336G8Q9726dGjI3Atrw.jpg',
    description: 'Tanjirou, một cậu bé hiền lành, bắt đầu hành trình trở thành thợ săn quỷ để cứu em gái mình...',
    releaseInfo: '2019',
    genres: ['Hành Động', 'Phiêu Lưu', 'Siêu Nhiên'],
    imdbRating: '8.7'
  },
  {
    id: 'anime_2',
    type: 'series',
    name: 'Jujutsu Kaisen (Chú Thuật Hồi Chiến)',
    poster: 'https://image.tmdb.org/t/p/w500/1pvOQAcibL4Lz58sPq3x1P3V7s8.jpg',
    background: 'https://image.tmdb.org/t/p/original/2wTfEN090KqP6C9q2PnbK72U0a0.jpg',
    description: 'Itadori Yuji nuốt ngón tay của một Nguyền hồn hùng mạnh và bước vào thế giới Chú thuật sư...',
    releaseInfo: '2020',
    genres: ['Hành Động', 'Kinh Dị', 'Học Đường'],
    imdbRating: '8.5'
  },
  {
    id: 'anime_3',
    type: 'series',
    name: 'Attack on Titan (Đại Chiến Titan)',
    poster: 'https://image.tmdb.org/t/p/w500/8tHngEMq2hAEEbEOPbApeDk1Ttb.jpg',
    background: 'https://image.tmdb.org/t/p/original/yDboFKZz35pL2hMFTI28o81G3R8.jpg',
    description: 'Nhân loại đứng trước nguy cơ diệt vong bởi những Titan khổng lồ ăn thịt người...',
    releaseInfo: '2013',
    genres: ['Hành Động', 'Kịch Tính', 'Sinh Tồn'],
    imdbRating: '9.0'
  },
  {
    id: 'anime_4',
    type: 'series',
    name: 'One Piece (Vua Hải Tặc)',
    poster: 'https://image.tmdb.org/t/p/w500/fcXdJmMfdAXhEq6Ztd3975sTXYc.jpg',
    background: 'https://image.tmdb.org/t/p/original/1sZz0rJABh7vXp7vVlqjXm1C1cE.jpg',
    description: 'Monkey D. Luffy và băng Mũ Rơm vươn ra biển khơi tìm kiếm kho báu vĩ đại nhất thế giới.',
    releaseInfo: '1999',
    genres: ['Hành Động', 'Phiêu Lưu', 'Hài Hước'],
    imdbRating: '8.9'
  },
  {
    id: 'anime_5',
    type: 'series',
    name: 'Solo Leveling (Tôi Thăng Cấp Một Mình)',
    poster: 'https://image.tmdb.org/t/p/w500/wPzR9Wv1x8X9Qx8g2uV7g6r38E.jpg',
    background: 'https://image.tmdb.org/t/p/original/vN03hXq145N1bJ4lP2lJ3fC0k5u.jpg',
    description: 'Sung Jinwoo, thợ săn hạng E yếu nhất, bất ngờ nhận được hệ thống giúp anh thăng cấp không giới hạn.',
    releaseInfo: '2024',
    genres: ['Hành Động', 'Giả Tưởng', 'Kịch Tính'],
    imdbRating: '8.4'
  }
];

app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

app.get('/catalog/:type/:id.json', (req, res) => {
  res.json({ metas: animeData });
});

app.get('/meta/:type/:id.json', (req, res) => {
  const anime = animeData.find(a => a.id === req.params.id);
  res.json({ meta: anime || {} });
});

app.get('/stream/:type/:id.json', (req, res) => {
  // Trả về danh sách các tập phim (hiện đang dùng link video MP4 để test)
  res.json({
    streams: [
      {
        title: 'Tập 1 - Vietsub 1080p',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        title: 'Tập 2 - Vietsub 1080p',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Anime đang chạy tại cổng ${PORT}`);
});
