const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.example.animeaddon',
  version: '1.0.0',
  name: 'Anime Hub Addon',
  description: 'Addon tổng hợp phim Anime hay nhất cho Nuvio',
  types: ['movie', 'series'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [
    { type: 'anime', id: 'anime_hot', name: 'Anime Hot & Thịnh Hành' }
  ],
  idPrefixes: ['anime_']
};

// Kho dữ liệu Anime chuẩn, mượt mà và không lo lỗi
const animeData = [
  {
    id: 'anime_1',
    type: 'anime',
    name: 'Demon Slayer: Kimetsu no Yaiba',
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500',
    description: 'Hành trình diệt quỷ đầy cảm xúc của Tanjirou và các bạn.'
  },
  {
    id: 'anime_2',
    type: 'anime',
    name: 'Jujutsu Kaisen (Chú Thuật Hồi Chiến)',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500',
    description: 'Cuộc chiến giữa các chú thuật sư và nguyền hồn đầy kịch tính.'
  },
  {
    id: 'anime_3',
    type: 'anime',
    name: 'Attack on Titan (Đại Chiến Titan)',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500',
    description: 'Sự thật tàn khốc đằng sau những bức tường và loài titan khổng lồ.'
  },
  {
    id: 'anime_4',
    type: 'anime',
    name: 'One Piece',
    poster: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500',
    description: 'Hành trình ra khơi tìm kho báu vĩ đại của Vua Hải Tặc tương lai.'
  },
  {
    id: 'anime_5',
    type: 'anime',
    name: 'Solo Leveling',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500',
    description: 'Thợ săn yếu nhất thế giới thức tỉnh hệ thống thăng cấp độc nhất.'
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
  res.json({
    streams: [
      {
        title: 'Vietsub - HD 1080p',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Anime đang chạy tại cổng ${PORT}`);
});
