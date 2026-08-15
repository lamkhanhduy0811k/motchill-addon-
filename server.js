const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.example.motchillreal',
  version: '1.0.0',
  name: 'Kho Phim Bom Tấn',
  description: 'Addon phim thật, hiển thị mượt mà',
  types: ['movie'],
  resources: ['catalog', 'meta', 'stream'],
  catalogs: [{ type: 'movie', id: 'top_movies', name: 'Phim Bom Tấn Hot' }],
  idPrefixes: ['tmdb_']
};

// Danh sách phim thật 100% với poster chuẩn điện ảnh
const moviesData = [
  { id: 'tmdb_1', name: 'Avengers: Endgame', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', description: 'Hồi kết của vũ trụ điện ảnh Marvel khi các siêu anh hùng hợp sức chống lại Thanos.' },
  { id: 'tmdb_2', name: 'Spider-Man: No Way Home', poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4hrTY1GPzxvfi1lxQR9.jpg', description: 'Bí mật về thân phận Người Nhện bị bại lộ, mở ra các cánh cổng đa vũ trụ.' },
  { id: 'tmdb_3', name: 'Inception', poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhKXYF.jpg', description: 'Kẻ đánh cắp giấc mơ thực hiện một nhiệm vụ bất khả thi: cấy ý tưởng vào tiềm thức.' },
  { id: 'tmdb_4', name: 'Interstellar', poster: 'https://image.tmdb.org/t/p/w500/gEU2QpI6EKi7yf8boKTSK6lE9QO.jpg', description: 'Hành trình xuyên không gian qua lỗ giun để tìm ngôi nhà mới cho nhân loại.' },
  { id: 'tmdb_5', name: 'The Dark Knight', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', description: 'Batman đối đầu với ác nhân Joker tại thành phố Gotham đầy hỗn loạn.' },
  { id: 'tmdb_6', name: 'Joker', poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', description: 'Câu chuyện về quá trình biến đổi của Arthur Fleck thành gã hề tội phạm khét tiếng.' },
  { id: 'tmdb_7', name: 'Avatar: The Way of Water', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', description: 'Gia đình Jake Sully tiếp tục cuộc chiến sinh tồn tại các vùng nước Pandora.' },
  { id: 'tmdb_8', name: 'Titanic', poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', description: 'Mối tình đầy nước mắt giữa Jack và Rose trên chuyến tàu định mệnh.' },
  { id: 'tmdb_9', name: 'John Wick: Chapter 4', poster: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', description: 'Sát thủ John Wick đối đầu với kẻ thù mới có liên minh quyền lực toàn cầu.' },
  { id: 'tmdb_10', name: 'The Matrix', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', description: 'Hacker Neo phát hiện sự thật kinh hoàng về thế giới giả lập mang tên Ma Trận.' }
];

app.get('/manifest.json', (req, res) => res.json(manifest));

app.get('/catalog/:type/:id.json', (req, res) => {
  res.json({ metas: moviesData });
});

app.get('/meta/:type/:id.json', (req, res) => {
  const movie = moviesData.find(m => m.id === req.params.id);
  res.json({ meta: movie || {} });
});

app.get('/stream/:type/:id.json', (req, res) => {
  res.json({
    streams: [
      {
        title: 'Phát trực tuyến - Bản Chuẩn HD',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      }
    ]
  });
});

app.listen(process.env.PORT || 3000);
