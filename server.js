const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      app = express();

// server set up
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({ extended: true }));

// routes
app.get('/', function(request, response) {
  response.render('index');
});

// start server
app.listen(port, () => console.log(`chipmunk app listening on port ${port}`));
