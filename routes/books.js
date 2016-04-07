var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function(req, res, next) {
  knex('booksAuthors').innerJoin('authors', 'booksAuthors.author_fk', 'authors.author_id').innerJoin('books', 'books.book_id', 'booksAuthors.book_fk')
  .then( function(books){
    res.render('books', {books: books});
  });
});
knex('users').where({
  first_name: 'Test',
  last_name:  'User'
}).select('id')
router.post('/:id/delete', function(req, res, next) {
    knex('books').where({book_id: req.params.id}).del()
    .then( function(books){
    res.render('books', {books: books});
  });
});
knex('table').insert({a: 'b'})
router.get('/addBook', function(req, res, next) {
    knex('books').where({title: req.body.title,}).first()
      .then( function(book) {
      if(book){
        //book already exists
      } else {
        var index = {};
        knex('books').insert({title: req.body.title, genre: req.body.genre, description: req.body.description, cover_url: req.body.url})
          .returning('book_id').then( function(book_id){
            index.book_fk = book_id;
          }).then(funciton () {
            knex('authors').where({ firtName: req.body.firstName, lastName:
            })
          })
      }
    }

});


module.exports = router;
