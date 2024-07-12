const express = require('express');
const {readFileSync} = require('node:fs');
const Handlebars = require("handlebars");
const app = express();
const port = 3000;


var options = {root: __dirname + "/public/"};

app.get('/', (req, res) => {
    //read the handlebars file to string
    f = readFileSync(
      'public/templates/main.handlebars',
      "utf8", 
      (err, data) => {return data;}
    );

    //compile handlebars file
    const template = Handlebars.compile(f);
    console.log(template({ main: "<h1>Grim world</h1>" }));

    //send the compiled file
    res.send(template({ main: "<h1>Grim world</h1>" }));
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