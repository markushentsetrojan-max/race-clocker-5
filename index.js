const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/proxy/:path(*)', async (req, res) => {
  const url = 'https://raceclocker.com/' + req.params.path;
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || 'text/html';
    res.setHeader('Content-Type', contentType);
    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send('Ошибка проксирования: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
