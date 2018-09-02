const mongoose = require('mongoose'),
      Chipmunk = mongoose.model('Chipmunk');

// error information when submitting forms
let errors = [],
    data ={};

module.exports = {

  // index page - shows table of all chipmunks
  index: function(request, response) {
    Chipmunk.find({})
      .then( chipmunks => {
        response.render('index', { chipmunks });
      })
      .catch(console.log);
  },

  // add a chipmunk page - shows form to create a chipmunk
  new: function(request, response) {
    response.render('chipmunks/new', { errors, data });
    errors = [];
    data = {};
  },

  // add chipmunk submission route - creates new chipmunk and then goes to index
  create: function(request, response) {
    Chipmunk.create(request.body)
      .then(chipmunk => response.redirect(`/chipmunks/${ chipmunk.id }`))
      .catch(error => {
        errors = Object.keys(error.errors).map(key => error.errors[key].message);
        data = request.body;
        response.redirect('/chipmunks/new')
      });
  },

  // show details about one chipmunk
  getChipmunk: function(request, response) {
    Chipmunk.findById(request.params.id)
      .then(chipmunk => response.render('chipmunks/chipmunk', { chipmunk }))
      .catch(console.log);
  },

  // edit a chipmunk page - shows form with information about chipmunk to edit
  edit: function(request, response) {
    Chipmunk.findById(request.params.id)
      .then(chipmunk => {
        response.render('chipmunks/edit', { errors, chipmunk });
        errors = [];
      })
      .catch(console.log);
  },

  // edit a chipmunk submission route - update chipmunk data, then go to details
  update: function(request, response) {
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
  },

  // destroy a chipmunk submission route - deletes a chipmunk and goes to index
  destroy: function(request, response) {
    Chipmunk.findByIdAndDelete(request.params.id)
      .then(response.redirect('/'))
      .catch(console.log);
  },

}
