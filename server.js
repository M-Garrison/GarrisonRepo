//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const { GridFSBucketWriteStream } = require('mongodb');
const mongoose = require ('mongoose');
const Meme = require('./models/memes.js');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

//___________________
// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

//___________________
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// 7 ROUTES:
//___________________

//___________________
// EDIT ROUTE
app.get('/fantasy/:id/edit', (req, res) => {
  Meme.findById(req.params.id, (err, foundMeme) => {
      res.render('edit.ejs', {
          bongo: foundMeme
      });        
  });
});

//___________________
// NEW ROUTE
app.get('/fantasy/new', (req, res) => {
  res.render('new.ejs')
});

//___________________
// SHOW ROUTE
app.get('/fantasy/:id', (req, res) => {
  Meme.findById(req.params.id, (error, foundMeme) => {
    res.render(
      'show.ejs',
      {
        bango: foundMeme
      }
    )
  })
}); 

//___________________
// PUT ROUTE
app.put('/fantasy/:id', (req, res)=>{
  if(req.body.motherKnow === 'on'){
      req.body.motherKnow = true;
  } else {
      req.body.motherKnow = false;
  }
  Meme.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/fantasy')
  })
});


//___________________
// CREATE ROUTE
app.post('/fantasy', (req, res) => {
  if(req.body.motherKnow === "on"){
    req.body.motherKnow = true;
  } else { 
    req.body.motherKnow = false;
  }
  Meme.create(req.body, (error, createdMeme) => {
    res.redirect('/fantasy')
  })
  // res.send(req.body); 
});

//___________________
// INDEX ROUTE
app.get('/fantasy', (req, res) => {
  Meme.find({}, (error, allMemes) => {
    res.render(
      'index.ejs',
      {
        bingo: allMemes
      }
    )
  })
});


//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));