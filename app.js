const express = require('express');
const app = express();
const port = 3000;
var options = {root: __dirname + "/public/"};

app.get('/', (req, res) => {
    res.sendFile("index.html",options)
});

app.get('/cat', (req, res) => {
  res.send("Cats are the best.")
});

app.get('/public/style.css', (req, res) => {
  res.sendFile("style.css",options)
});

app.get('/public/images/coffee.ico', (req, res) => {
  res.sendFile("images/coffee.ico",options)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});