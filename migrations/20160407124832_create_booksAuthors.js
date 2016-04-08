
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books_authors', function(table){
    table.integer('book_fk').references('books.id').onUpdate('cascade').onDelete('cascade');
    table.integer('author_fk').references('authors.id').onUpdate('cascade').onDelete('cascade');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books_authors');
};
