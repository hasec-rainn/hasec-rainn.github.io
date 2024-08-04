const express = require('express');
const {readFileSync} = require('node:fs');
const Handlebars = require("handlebars");
const app = express();
const port = 3000;


var options = {root: __dirname + "/public/"};

app.get('/', (req, res) => {
  
  //read the main handlebars file in and make it a template
  m = readFileSync(
    'public/templates/main.handlebars',
    "utf8", 
    (err, data) => {return data;}
  );
  const template = Handlebars.compile(m);

  //create the object that holds our handlebars data
  const hb_data = {
    navbar: null,
    body: null,
    footer: null
  };

  //write in the home page and navbar into our object
  hb_data.body = readFileSync(
    'public/html/home.html',
    "utf8", 
    (err, data) => {return data;}
  );
  hb_data.navbar  = readFileSync(
    'public/html/navbar_home.html',
    "utf8", 
    (err, data) => {return data;}
  );

  //send our filled-out template
  res.send(template(hb_data));
});

app.get('/projects', (req, res) => {
  
  //read the main handlebars file in and make it a template
  m = readFileSync(
    'public/templates/main.handlebars',
    "utf8", 
    (err, data) => {return data;}
  );
  const main_template = Handlebars.compile(m);

  //create the object that holds our main handlebars data
  const hb_data = {
    navbar: null,
    body: null,
    footer: null
  };

  //read in the projects page handlebars file and make it a template
  p_page = readFileSync(
    'public/templates/project_page.handlebars',
    "utf8", 
    (err, data) => {return data;}
  );
  const project_template = Handlebars.compile(p_page);

  //specify our data, embed it into the project page template,
  //then put that data into the body that we will send
  p_data = {
    project: [
      {
          id: "myte_project",
          title: "Myte",
          image: "public/images/mountain_cropped.png", 
          desc: "\
            The website you're looking at now! Built with node.js\
            and handlebars, it acts as a simple website portfolio\
            that displays all my projects and experiences.\
            <br><br>\
            Myte is a mashup of the words <u>My</u> and Si<u>te</u>."
      }, 
      {
          id: "ss_project",
          title: "Saving Sergeant",
          image: "public/images/dollar_sign.png", 
          desc: "This project acts as a proof-of-concept for a \
            receipt-scanning and receipt-analyzing software whose \
            aim is to provide financial insights into users' spending \
            habits. This is done by preprocessing images of receipts, \
            scanning them with Tesseract OCR, and storing them in a csv \
            file that can then be read into a SQL database. Analysis is \
            then performed with an SQL database to provide insights \
            into the user's spending habits.<br><br>\
            See the project <a href='https://github.com/hasec-rainn/Saving_Sergeant'><u>here</u></a> on github."
      }
  ]
  };
  hb_data.body = project_template(p_data);

  //write in the navbar into our object
  hb_data.navbar  = readFileSync(
    'public/html/navbar.html',
    "utf8", 
    (err, data) => {return data;}
  );

  //send our filled-out template
  res.send(main_template(hb_data));
});

app.get('/cat', (req, res) => {
  res.send("Cats are the best.")
});

app.get('/public/style.css', (req, res) => {
  res.sendFile("style.css",options)
});

app.get('/public/script.js', (req, res) => {
  res.sendFile("script.js",options)
});

app.get('/public/images/coffee.ico', (req, res) => {
  res.sendFile("images/coffee.ico",options)
});

app.get('/public/images/mountain.png', (req, res) => {
  res.sendFile("images/mountain_final.png",options)
});

app.get('/public/images/mountain_cropped.png', (req, res) => {
  res.sendFile("images/mountain_cropped.png",options)
});

app.get('/public/images/dollar_sign.png', (req, res) => {
  res.sendFile("images/dollar_sign.png",options)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});