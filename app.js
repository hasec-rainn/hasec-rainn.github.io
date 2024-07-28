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
          title: "Myte",
          image: "mountain", 
          desc: "The very website you're looking at now!"
      }, 
      {
          title: "Saving Sergeant",
          image: "file icon", 
          desc: "Machine vision receipts into an SQL database"
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

app.get('/public/images/coffee.ico', (req, res) => {
  res.sendFile("images/coffee.ico",options)
});

app.get('/public/images/mountain.png', (req, res) => {
  res.sendFile("images/mountain_final.png",options)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});