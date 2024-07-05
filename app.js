const express = require('express');
const app = express();
const port = 3000;
var options = {root: __dirname + "/public/"};

app.get('/', (req, res) => {
    res.send("Hello grim world.")
});

app.get('/cat', (req, res) => {
    res.send("Cats are the best.")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});