exports.up = function(knex, Promise) {
  return knex.schema.createTable('booksToAuthors', function(table){
    table.increments();
    table.integer('author_fk').unsigned().references('author_id').inTable('authors');
    table.integer('book_fk').unsigned().references('book_id').inTable('books');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('booksToAuthors');
};
