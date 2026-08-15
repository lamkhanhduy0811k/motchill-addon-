const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(cors());
app.use(express.json());

const manifest = {
  id: 'org.example.motchilladdon',
  version: '1.0.0',
  name: 'Motchill Addon',
  description: 'Addon xem phim từ motchillu.app cho Nuvio',
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

// Cào dữ liệu danh sách phim từ motchillu.app
app.get('/catalog/:type/:id.json', async (req, res) => {
  const { id } = req.params;

  if (id === 'motchill_movies') {
    try {
      // Gửi request tới trang web motchillu.app
      const response = await axios.get('https://motchillu.app/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      
      const $ = cheerio.load(response.data);
      const metas = [];

      // [LƯU Ý]: Bạn cần kiểm tra cấu trúc HTML thực tế của trang web để thay đổi các bộ chọn (selector) bên dưới cho đúng
      $('.item').each((index, element) => {
        const title = $(element).find('.name').text().trim() || 'Phim Motchill';
        const poster = $(element).find('img').attr('data-src') || $(element).find('img').attr('src');
        const link = $(element).find('a').attr('href');
        
        if (link) {
          const movieId = 'motchill_' + Buffer.from(link).toString('base64').substring(0, 15);
          metas.push({
            id: movieId,
            type: 'movie',
            name: title,
            poster: poster || 'https://via.placeholder.com/300x450',
            description: 'Phim được cập nhật từ Motchill'
          });
        }
      });

      return res.json({ metas });
    } catch (error) {
      console.error('Lỗi cào dữ liệu:', error.message);
      return res.json({ metas: [] });
    }
  }

  res.json({ metas: [] });
});

app.get('/stream/:type/:id.json', async (req, res) => {
  const { id } = req.params;

  if (id.startsWith('motchill_')) {
    // Xử lý bóc tách link stream tại đây dựa vào link chi tiết của phim
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
  
