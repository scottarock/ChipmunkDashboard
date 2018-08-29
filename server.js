const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      app = express();

// variables for dealing with errors
let errors = [],
    data ={};

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost/chipmunks',
  { useNewUrlParser: true }
);
mongoose.connection.on('connected', () => console.log('Mongo DB connected'));

// create and register chipmunk schema
const chipmunkSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'A chipmunk needs a name!' ],
    trim: true,
  },
  age: {
    type: Number,
    required: [ true, 'How old is this chipmunk?' ],
  },
  favoriteNut: {
    type: String,
    trim: true,
    default: 'Acorn',
  },
  treasure: {
    type: String,
    trim: true,
  },
});
const Chipmunk = mongoose.model('Chipmunk', chipmunkSchema);

// server set up
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({ extended: true }));

// ROUTES
// index page - shows table of all chipmunks
app.get('/', function(request, response) {
  Chipmunk.find({})
    .then( chipmunks => {
      response.render('index', { chipmunks });
    })
    .catch(console.log);
});

// add a chipmunk page - shows form to create a chipmunk
app.get('/chipmunks/new', function(request, response) {
  response.render('chipmunks/new', { errors, data });
  errors = [];
  data = {};
});

// add chipmunk submission route - creates new chipmunk and then goes to index
app.post('/chipmunks', function(request, response) {
  Chipmunk.create(request.body)
    .then(chipmunk => response.redirect(`/chipmunks/${ chipmunk.id }`))
    .catch(error => {
      errors = Object.keys(error.errors).map(key => error.errors[key].message);
      data = request.body;
      response.redirect('/chipmunks/new')
    });
});

// show details about one chipmunk
app.get('/chipmunks/:id', function(request, response) {
  Chipmunk.findById(request.params.id)
    .then(chipmunk => response.render('chipmunks/chipmunk', { chipmunk }))
    .catch(console.log);
});

// edit a chipmunk page - shows form with information about chipmunk to edit
app.get('/chipmunks/edit/:id', function(request, response) {
  Chipmunk.findById(request.params.id)
    .then(chipmunk => {
      response.render('chipmunks/edit', { errors, chipmunk });
      errors = [];
    })
    .catch(console.log);
});

// edit a chipmunk submission route - update chipmunk data, then go to details
app.post('/chipmunks/:id', function(request, response) {
  Chipmunk.findById(request.params.id)
    .then(chipmunk => {
      Object.keys(request.body).forEach(key => {
        chipmunk[key] = request.body[key];
      });
      return chipmunk.save()
        .then(chipmunk => {
          response.redirect(`/chipmunks/${ chipmunk.id }`);
        })
    })
    .catch(error => {
      errors = Object.keys(error.errors).map(key => error.errors[key].message);
      response.redirect(`/chipmunks/edit/${ request.params.id }`)
    });
});

// destroy a chipmunk submission route - deletes a chipmunk and goes to index
app.post('/chipmunks/destroy/:id', function(request, response) {
  Chipmunk.findByIdAndDelete(request.params.id)
    .then(response.redirect('/'))
    .catch(console.log);
});

// start server
app.listen(port, () => console.log(`chipmunk app listening on port ${ port }`));
