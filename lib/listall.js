var knex = require('knex')(require('../knexfile')['development'])

module.exports = function () {
  return knex('books_authors')
  .rightJoin('authors', 'books_authors.author_fk', 'authors.id')
  .innerJoin('books', 'books.id', 'books_authors.book_fk')
  .innerJoin('genres', 'books.genre_fk', 'genres.id')
        .then( function(data) {
          return data
        });
}
