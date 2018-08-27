const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      app = express();

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
    required: [ true, 'A chipmunk needs a name' ],
    trim: true,
  },
  age: {
    type: Number,
    required: [ true, 'How old is this chipmunk' ],
  },
  favoriteNut: {
    type: String,
    trim: true,
    default: 'acorn',
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

// routes
app.get('/', function(request, response) {
  Chipmunk.find({})
    .then( chipmunks => {
      console.log(chipmunks);
      response.render('index', { chipmunks });
    })
    .catch(console.log);
});

app.get('/chipmunks/new', function(request, response) {
  response.render('chipmunks/new');
});

app.post('/chipmunks', function(request, response) {
  Chipmunk.create(request.body)
    .then(chipmunk => response.redirect('/'))
    .catch(console.log);
});

// start server
app.listen(port, () => console.log(`chipmunk app listening on port ${port}`));
