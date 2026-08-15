const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const BASE_URL = 'https://animehay.city'; // Cập nhật tên miền mới nhất của AnimeHay nếu đổi

// API Lấy danh sách tập & Link Embed
app.get('/api/anime', async (req, res) => {
  try {
    const { url } = req.query; // Ví dụ: url trang chi tiết phim
    if (!url) return res.status(400).json({ error: 'Thừa/Thiếu tham số URL' });

    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    const $ = cheerio.load(data);
    const episodes = [];

    // Lấy danh sách các tập phim
    $('.list-item-episode a').each((_, el) => {
      episodes.push({
        title: $(el).text().trim(),
        href: $(el).attr('href')
      });
    });

    res.json({ episodes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Lấy link Player/Iframe từ trang xem tập
app.get('/api/watch', async (req, res) => {
  try {
    const { episodeUrl } = req.query;
    const { data } = await axios.get(episodeUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });

    const $ = cheerio.load(data);
    // AnimeHay thường nhúng player trong thẻ iframe hoặc script
    const iframeSrc = $('iframe').attr('src');

    res.json({ embedUrl: iframeSrc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));
