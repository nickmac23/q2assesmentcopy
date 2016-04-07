var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function(req, res, next) {
  knex('booksAuthors').rightOuterJoin('authors', 'booksAuthors.author_fk', 'authors.author_id').rightOuterJoin('books', 'books.book_id', 'booksAuthors.book_fk')
  .then( function(books){
    // console.log(books);
    res.render('books', {books: books});
  });
});


router.get('/addBooks', function(req, res, next) {
  res.render('addbooks')
});

router.post('/addbooks', function(req, res, next) {
  req.body.title = req.body.title.toLowerCase();
  req.body.genre = req.body.genre.toLowerCase();
  req.body.firstName = req.body.firstName.toLowerCase();
  req.body.lastName = req.body.lastName.toLowerCase();

  return knex('books').where({title: req.body.title}).first()
    .then( function(book) {
    if(book){
      res.redirect('/books')
    } else {
      var index = {};
      return knex('books').insert({title: req.body.title, genre: req.body.genre, description: req.body.description, cover_url: req.body.url})
        .returning('book_id').then( function(book_id){
          index.book_id = +book_id[0];
        }).then(function () {
          return knex('authors').where({ firstName: req.body.firstName, lastName: req.body.lastName }).returning('author_id')
            .then(function(author_id){
              if (author_id[0]) {
                index.author_id = +author_id[0].author_id;
              } else {
                return knex('authors').insert({firstName: req.body.firstName, lastName: req.body.lastName})
                  .returning('author_id').then( function(id) {
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

router.get('/:id', function(req, res, next) {
  console.log('hi');
  return knex('books').where({book_id: req.params.id})
    .then( function (book) {
      console.log(book);
      res.render('/books', {books: book});
    })
});

router.post('/:id/delete', function(req, res, next) {
  return knex('books').where({book_id: req.params.id}).del()
    .then( function () {
      res.redirect('/books');
    })
});

router.get('/:id/edit', function (req, res, next) {
  knex('books').where({book_id: req.params.id}).first()
  .then(function ( book ){
    console.log(book);
    res.render('bookEdit', {book: book})
  })
})
router.post('/:id/edit', function (req, res, next) {
  knex('books').where({book_id: req.params.id}).update({
    title: req.body.title.toLowerCase(),
    genre: req.body.genre.toLowerCase(),
    description: req.body.description.toLowerCase(),
    cover_url: req.body.url.toLowerCase()
  })
  .then(function ( book ){
    res.redirect('/books')
  })
})

module.exports = router;
