var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function(req, res, next) {
  knex('books').first().then( function(books){
    var book = books.map
    res.render('books', {books: books});
  })
});


module.exports = router;
