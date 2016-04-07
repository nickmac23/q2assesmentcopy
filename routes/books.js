var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function(req, res, next) {
  knex('booksAuthors').rightJoin('authors', 'booksAuthors.author_fk', 'authors.author_id').rightJoin('books', 'books.book_id', 'booksAuthors.book_fk')
  .then( function(books){
    console.log(books);
    res.render('books', {books: books});
  });
});

// router.post('/:id/delete', function(req, res, next) {
//     knex('books').where({book_id: req.params.id}).del()
//     .then( function(books){
//     res.render('books', {books: books});
//   });
// });


router.get('/addBooks', function(req, res, next) {
  res.render('addbooks')
});

router.post('/addbooks', function(req, res, next) {
  return knex('books').where({title: req.body.title}).first()
    .then( function(book) {
    if(book){
      res.redirect('/books')
    } else {
      var index = {};
      return knex('books').insert({title: req.body.title, genre: req.body.genre, description: req.body.description, cover_url: req.body.url})
        .returning('book_id').then( function(book_id){
          index.book_fk = +book_id[0];
        }).then(function () {
          return knex('authors').where({ firstName: req.body.firstName, lastName: req.body.lastName }).returning('author_id').first()
            .then(function(author_id){
              console.log('author_id :' + author_id);
              if (author_id) {
                console.log('a exsits');
                index.author_id = +author_id;
              } else {
                console.log('here');
                return knex('authors').insert({firstName: req.body.firstName, lastName: req.body.lastName})
                  .returning('author_id').then( function(id) {
                    console.log(id);
                    index.author_id = +id[0];
                  })
              }
            })
            .then(function () {
              console.log(index);
              return knex('booksAuthors').insert({book_fk: index.book_id, author_fk: index.author_id})
            })
            .then(function(){
              console.log('done');
              res.redirect('/books')
            })
        })
    }
  })
})

router.post('/:id/delete', function(req, res, next) {
  return knex('books').where({book_id: req.params.id}).del()
    .then( function () {
      res.redirect('/books');
    })
});

module.exports = router;
