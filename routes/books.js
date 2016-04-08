var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var queries = require('../lib');


var addBook = function(book){
  return knex('books').returning('id').insert({
          genre_fk: book.genre_id,
          title: book.title,
          description: book.description,
          cover_url: book.url
      }).then(function(book){
        return book[0]
      })
};

var addAuthor = function(book){
  return knex('authors').where({
          first_name: book.first_name,
          last_name: book.last_name
      }).returning('id').first()
      .then(function(author){
          if (author) {
              return author.id;
          } else {
            return knex('authors').returning('id').insert({
              first_name: book.first_name,
              last_name: book.last_name
            }).then(function(author) {
                return author[0]  ;
            })
          }
      })
};



var addGenre = function(book) {
    return knex('genres').where({
            genre: book.genre
        }).then(function(genre) {
            if (genre.length > 0) {
                return genre.id;
            } else {
                return knex('genres').returning('id').insert({
                    genre: book.genre
                }).then(function(genre) {
                    return genre[0];
                })
            }
        })
};



router.get('/', function(req, res, next) {
    queries.listAll().then(function(books) {
        res.render('books', {
            books: books
        });
    });
});

router.get('/addBooks', function(req, res, next) {
    res.render('addbooks')
});

router.post('/addbooks', function(req, res, next) {
  var book = {
    title: req.body.title.toLowerCase(),
    genre: req.body.genre.toLowerCase(),
    genre_id: null,
    description: req.body.description,
    first_name: req.body.firstName.toLowerCase(),
    last_name: req.body.lastName.toLowerCase(),
    url: req.body.url,
    book_id: null,
    author_id: null
  };

  return addGenre(book).then( function (genre_id) {
    book.genre_id = genre_id
    return book;
  }).then(function(book){
    return addBook(book).then(function (book_id){
      book.book_id = book_id
      return book;
    })
  }).then(function (book){
    return addAuthor(book).then(function(author_id){
      book.author_id = author_id
      return book;
    })
  }).then(function(book) {
    console.log(book);
    return knex('books_authors').insert({
        book_fk: book.book_id,
        author_fk: book.author_id
    }).then(function() {
    res.redirect('/books')
    })
  })
})










router.get('/:id', function(req, res, next) {
    console.log('here');
    knex('booksAuthors').rightOuterJoin('authors', 'booksAuthors.author_fk', 'authors.id').rightOuterJoin('books', 'books.id', 'booksAuthors.book_fk').where({
            'books.id': req.params.id
        })
        .then(function(book) {
            console.log(book);
            res.render('books', {
                books: book
            });
        })
});

router.post('/:id/delete', function(req, res, next) {
    return knex('books').where({
            id: req.params.id
        }).del()
        .then(function() {
            res.redirect('/books');
        })
});

router.get('/:id/edit', function(req, res, next) {
    knex('books').where({
            id: req.params.id
        }).first()
        .then(function(book) {
            console.log(book);
            res.render('bookEdit', {
                book: book
            })
        })
})
router.post('/:id/edit', function(req, res, next) {
    knex('books').where({
            id: req.params.id
        }).update({
            title: req.body.title.toLowerCase(),
            genre: req.body.genre.toLowerCase(),
            description: req.body.description.toLowerCase(),
            cover_url: req.body.url.toLowerCase()
        })
        .then(function(book) {
            res.redirect('/books')
        })
})

module.exports = router;
