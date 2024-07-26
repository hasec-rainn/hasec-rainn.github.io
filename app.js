const express = require('express');
const {readFileSync} = require('node:fs');
const Handlebars = require("handlebars");
const app = express();
const port = 3000;


var options = {root: __dirname + "/public/"};

app.get('/', (req, res) => {
  
  //create the object that holds our handlebars data
  const hb_data = {
    navbar: null,
    body: null
  };
  hb_data.body = readFileSync(
    'public/html/home.html',
    "utf8", 
    (err, data) => {return data;}
  );

  //read the main handlebars file to string
  m = readFileSync(
    'public/templates/main.handlebars',
    "utf8", 
    (err, data) => {return data;}
  );

  //read the navbar to string and put in hb_data
  hb_data.navbar  = readFileSync(
    'public/html/navbar_home.html',
    "utf8", 
    (err, data) => {return data;}
  );

  //compile handlebars file
  const template = Handlebars.compile(m);
  console.log(template(hb_data));

  //send the compiled file
  res.send(template(hb_data));
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

app.get('/public/images/mountain.png', (req, res) => {
  res.sendFile("images/mountain_cropped.png",options)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});