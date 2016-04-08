var express = require('express');
var router = express.Router();
var queries = require('../lib');
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function ( req, res, next ) {
  return knex('authors').leftOuterJoin('books_authors', 'authors.id', 'books_authors.author_fk')
  .leftOuterJoin('books', 'books.id', 'books_authors.book_fk')
  .select('authors.id', 'books.title', 'authors.first_name', 'authors.last_name', 'authors.biography', 'authors.portrait_url', 'books_authors.book_fk')
  .then(function(authors){
    console.log(authors);
          res.render('authors', {authors: authors});
        });
} )

router.get('/addAuthor', function(req, res, next) {
  res.render('addauthor')
});

router.post('/addAuthor', function (req, res, next ) {
  req.body.firstName = req.body.firstName.toLowerCase();
  req.body.lastName = req.body.lastName.toLowerCase();
  return knex('authors').where({ first_name: req.body.firstName, last_name: req.body.lastName }).returning('author_id')
    .then(function(author_id){
      if (author_id[0]) {
        console.log('exists');
        res.redirect('/authors')
      } else {
        return knex('authors').insert({first_name: req.body.firstName, last_name: req.body.lastName,
                                      biography: req.body.bio, portrait_url: req.body.url})
          .then( function(id) {
            res.redirect('/authors')
          })
      }
  })
})
router.get('/:id', function (req, res, next) {
  knex('authors').leftOuterJoin('books_authors', 'books_authors.author_fk', 'authors.id').leftOuterJoin('books', 'books.id', 'books_authors.book_fk').where({'authors.id': req.params.id})
  .select('authors.id', 'books.title', 'authors.first_name', 'authors.last_name', 'authors.biography', 'authors.portrait_url', 'books_authors.book_fk  ')

  .then( function (author) {
    res.render('authors', {authors: author})
  })
})
router.post('/:id/delete', function (req, res, next) {
  knex('authors').where({id: req.params.id}).del()
    .then( function () {
      res.redirect('/authors')
    })
})
router.get('/:id/edit', function (req, res, next) {
  knex('authors').where({id: req.params.id}).first()
    .then( function (author) {
      res.render('editauthor' , {author: author})
    })
})
router.post('/:id/edit', function (req, res, next) {

  knex('authors').where({id: req.params.id}).update({
    first_name: req.body.firstName.toLowerCase(),
    last_name: req.body.lastName.toLowerCase(),
    biography: req.body.bio,
    portrait_url: req.body.url
  }).then( function () {
    res.redirect('/authors')
  })
})
module.exports = router;
