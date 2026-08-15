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
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [
    {
      type: 'movie',
      id: 'motchill_movies',
      name: 'Phim Hot Tổng Hợp'
    }
  ],
  idPrefixes: ['motchill_']
};

const moviesData = [
  {
    id: 'motchill_1',
    type: 'movie',
    name: 'Avengers: Endgame',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500',
    description: 'Hồi kết của vũ trụ điện ảnh Marvel.'
  },
  {
    id: 'motchill_2',
    type: 'movie',
    name: 'Spider-Man: No Way Home',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500',
    description: 'Người Nhện đối đầu với các kẻ thù đa vũ trụ.'
  },
  {
    id: 'motchill_3',
    type: 'movie',
    name: 'Inception',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500',
    description: 'Kẻ đánh cắp giấc mơ trong những phi vụ đầy kịch tính.'
  },
  {
    id: 'motchill_4',
    type: 'movie',
    name: 'Interstellar',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500',
    description: 'Hành trình xuyên không gian để cứu lấy nhân loại.'
  }
];

app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

app.get('/catalog/:type/:id.json', (req, res) => {
  res.json({ metas: moviesData });
});

// Thêm phần này để Nuvio tải được thông tin chi tiết khi bấm vào phim
app.get('/meta/:type/:id.json', (req, res) => {
  const { id } = req.params;
  const movie = moviesData.find(m => m.id === id);
  if (movie) {
    res.json({ meta: movie });
  } else {
    res.json({ meta: {} });
  }
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
