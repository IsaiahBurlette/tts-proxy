import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.get('/tts', async (req, res) => {
    try {
        const text = req.query.text || '';
        const lang = req.query.lang || 'en';
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;

        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const buffer = await response.arrayBuffer();

        res.set('Content-Type', 'audio/mpeg');
        res.set('Access-Control-Allow-Origin', '*');
        res.send(Buffer.from(buffer));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching TTS audio');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`TTS proxy running on port ${port}`));
