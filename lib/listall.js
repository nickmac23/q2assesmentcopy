var knex = require('knex')(require('../knexfile')['development'])

module.exports = function (meetupId) {
  return knex('books_authors')
  .rightOuterJoin('authors', 'books_authors.author_fk', 'authors.id')
  .rightOuterJoin('books', 'books.id', 'books_authors.book_fk')
  .rightOuterJoin('genres', 'books.genre_fk', 'genres.id')
        .then( function(data) {
          return data
        });
}
