var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.get('/', function ( req, res, next ) {
  knex('authors').leftOuterJoin('booksAuthors', 'booksAuthors.author_fk', 'authors.author_id').leftOuterJoin('books', 'books.book_id', 'booksAuthors.book_fk')
  .then( function(books){
    console.log(books);
    res.render('authors', {authors: books});
  });
} )

router.get('/addAuthor', function(req, res, next) {
  res.render('addauthor')
});

router.post('/addAuthor', function (req, res, next ) {
  req.body.firstName = req.body.firstName.toLowerCase();
  req.body.lastName = req.body.lastName.toLowerCase();
  return knex('authors').where({ firstName: req.body.firstName, lastName: req.body.lastName }).returning('author_id')
    .then(function(author_id){
      if (author_id[0]) {
        console.log('exists');
        res.redirect('/authors')
      } else {
        return knex('authors').insert({firstName: req.body.firstName, lastName: req.body.lastName,
                                      biography: req.body.bio, portrait_url: req.body.url})
          .then( function(id) {
            res.redirect('/authors')
          })
      }
  })
})
router.get('/:id', function (req, res, next) {
  var grr = [];
  knex('booksAuthors').rightOuterJoin('authors', 'booksAuthors.author_fk', 'authors.author_id').rightOuterJoin('books', 'books.book_id', 'booksAuthors.book_fk').where({author_id: req.params.id})
  .then( function (author) {
    for (var i = 0; i < author.length; i++) {
      grr.push(author[i].title)
    }
    console.log(author);
    res.render('authors', {authors: author, titles: grr})
  })
})
router.post('/:id/delete', function (req, res, next) {
  knex('authors').where({author_id: req.params.id}).del()
    .then( function () {
      res.redirect('/authors')
    })
})
router.get('/:id/edit', function (req, res, next) {
  knex('authors').where({author_id: req.params.id}).first()
    .then( function (author) {
      res.render('editauthor' , {author: author})
    })
})
router.post('/:id/edit', function (req, res, next) {
  knex('authors').where({author_id: req.params.id}).update({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    biography: req.body.bio,
    portrait_url: req.body.url
  }).then( function () {
    res.redirect('/authors')
  })
})
module.exports = router;
