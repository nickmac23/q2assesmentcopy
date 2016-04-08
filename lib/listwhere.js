var knex = require('knex')(require('../knexfile')['development'])

module.exports = function (id) {
  return knex('books_authors')
  .innerJoin('authors', 'books_authors.author_fk', 'authors.id')
  .innerJoin('books', 'books.id', 'books_authors.book_fk')
  .innerJoin('genres', 'books.genre_fk', 'genres.id')
  .where({'book.id': id})
        .then( function(data) {
          return data
        });
}
