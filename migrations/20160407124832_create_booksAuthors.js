
exports.up = function(knex, Promise) {
  return knex.schema.createTable('booksAuthors', function(table){
    table.increments('id');
    table.integer('book_fk').unsigned().references('books.book_id').onUpdate('cascade').onDelete('cascade');
    table.integer('author_fk').unsigned().references('authors.author_id').onUpdate('cascade').onDelete('cascade');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('booksAuthors');

};
