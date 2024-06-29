const express = require('express');
const app = express();
const port = 3000;

const apiKey = '08fe00efcecf412e694169f40d78285f';

app.use(express.static('public')); // Đảm bảo các file tĩnh (HTML, CSS, JS) nằm trong thư mục 'public'

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const fetch = await import('node-fetch'); // Sử dụng dynamic import
        const response = await fetch.default(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
