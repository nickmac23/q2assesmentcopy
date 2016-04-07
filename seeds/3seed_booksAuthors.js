
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('booksAuthors').del(),

    // Inserts seed entries
    knex('booksAuthors').insert({id: 1, book_fk: 1, author_fk: 1}),
    knex('booksAuthors').insert({id: 2, book_fk: 1, author_fk: 5}),
    knex('booksAuthors').insert({id: 3, book_fk: 1, author_fk: 6}),
    knex('booksAuthors').insert({id: 4, book_fk: 3, author_fk: 2}),
    knex('booksAuthors').insert({id: 5, book_fk: 2, author_fk: 3}),
    knex('booksAuthors').insert({id: 6, book_fk: 4, author_fk: 4}),
    knex('booksAuthors').insert({id: 7, book_fk: 5, author_fk: 4}),
    knex('booksAuthors').insert({id: 8, book_fk: 6, author_fk: 4})
  );
};
