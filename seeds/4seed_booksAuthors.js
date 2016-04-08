exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('books_authors').del(),
    knex('books_authors').insert({ book_fk: 1, author_fk: 1 }),
    knex('books_authors').insert({ book_fk: 1, author_fk: 5 }),
    knex('books_authors').insert({ book_fk: 1, author_fk: 6 }),
    knex('books_authors').insert({ book_fk: 3, author_fk: 2 }),
    knex('books_authors').insert({ book_fk: 2, author_fk: 3 }),
    knex('books_authors').insert({ book_fk: 4, author_fk: 4 }),
    knex('books_authors').insert({ book_fk: 5, author_fk: 4 }),
    knex('books_authors').insert({ book_fk: 6, author_fk: 4 })
  );
};
