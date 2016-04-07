var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function ( req, res, next ) {
  // knex('authors')
  // // .innerJoin('authors', 'authors.authors_id', 'authorsBooks.authors_fk').innerJoin('books', 'books.books_id', 'authorsBooks.books_fk')
  // .then(function (authors) {
  //   console.log(authors);
  //   res.render('authors', {authors: authors})
  // })
  knex('authors').leftJoin('booksAuthors', 'booksAuthors.author_fk', 'authors.author_id').rightJoin('books', 'books.book_id', 'booksAuthors.book_fk')
  .then( function(books){
    console.log(books);
    res.render('authors', {authors: books});
  });
} )

module.exports = router;
