const mongoose = require('mongoose'),
      path = require('path'),
      fs = require('fs');

let models_path = path.join(__dirname, '../models');

module.exports = function() {

  mongoose.Promise = global.Promise;
  mongoose.connect(
    'mongodb://localhost/chipmunks',
    { useNewUrlParser: true }
  );
  mongoose.connection.on('connected', () => console.log('Mongo DB connected'));

  fs.readdirSync(models_path).forEach(file => {
    if ( file.indexOf('.js') >= 0 ) {
      require(`${models_path}/${file}`)();
    }
  });

}
