const chipmunks = require('../controller/chipmunks');

module.exports = function(app) {

  // ROUTES
  app.get('/', function(request, response) {
    chipmunks.index(request, response);
  });

  app.get('/chipmunks/new', function(request, response) {
    chipmunks.new(request, response);
  });

  app.post('/chipmunks', function(request, response) {
    chipmunks.create(request, response)
  });

  app.get('/chipmunks/:id', function(request, response) {
    chipmunks.getChipmunk(request, response);
  });

  app.get('/chipmunks/edit/:id', function(request, response) {
    chipmunks.edit(request, response);
  });

  app.post('/chipmunks/:id', function(request, response) {
    chipmunks.update(request, response);
  });

  app.post('/chipmunks/destroy/:id', function(request, response) {
    chipmunks.destroy(request, response);
  });
}
