const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      mongoose = require('mongoose'),
      { Schema } = mongoose,
      app = express();



// server set up
app.set('view engine', 'ejs');
app.set('views', path.resolve('client', 'views'));
app.use(express.static(path.resolve('client', 'static')));
app.use(parser.urlencoded({ extended: true }));

require('./server/config/mongoose')();
require('./server/config/routes')(app);

// start server
app.listen(port, () => console.log(`chipmunk app listening on port ${ port }`));
