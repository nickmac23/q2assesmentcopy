var knex = require('knex')(require('../knexfile')['development'])

module.exports = function (limit, offset) {
  var offset = offset ? offset : 0;
  return knex('books_authors')
  .rightJoin('authors', 'books_authors.author_fk', 'authors.id')
  .innerJoin('books', 'books.id', 'books_authors.book_fk')
  .innerJoin('genres', 'books.genre_fk', 'genres.id')
  .limit(limit)
  .offset(offset)
        .then( function(data) {
          return data
        });
}
