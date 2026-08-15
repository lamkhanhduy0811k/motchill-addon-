const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Khai báo thông tin Addon (Manifest)
const manifest = {
  id: 'org.example.motchilladdon',
  version: '1.0.0',
  name: 'Motchill Addon',
  description: 'Addon xem phim mẫu tích hợp cho Nuvio',
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

// 2. Endpoint trả về manifest.json
app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

// 3. Endpoint xử lý danh mục phim (Catalog)
app.get('/catalog/:type/:id.json', async (req, res) => {
  const { type, id } = req.params;

  if (id === 'motchill_movies') {
    // [QUAN TRỌNG]: Tại đây bạn sẽ viết code cào dữ liệu (Web Scraping) 
    // từ trang web motchillu.app để thay thế cho mảng dữ liệu mẫu dưới đây.
    const metas = [
      {
        id: 'motchill_1',
        type: 'movie',
        name: 'Tên Phim Ví Dụ',
        poster: 'https://via.placeholder.com/300x450',
        description: 'Mô tả ngắn gọn về nội dung phim.'
      }
    ];
    return res.json({ metas });
  }

  res.json({ metas: [] });
});

// 4. Endpoint xử lý luồng phát video (Stream)
app.get('/stream/:type/:id.json', async (req, res) => {
  const { type, id } = req.params;

  if (id.startsWith('motchill_')) {
    // [QUAN TRỌNG]: Tại đây bạn viết code bóc tách link video thực tế (.m3u8 hoặc .mp4) 
    // từ trang chi tiết phim trên website motchillu.app.
    const streams = [
      {
        title: 'Motchill Server - 1080p',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // Link video mẫu
      }
    ];
    return res.json({ streams });
  }

  res.json({ streams: [] });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
  
