
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments('author_id');
    table.string('firstName');
    table.string('lastName');
    table.text('biography');
    table.string('portrait_url');
  })
    .createTable('books', function(table){
    table.increments('book_id');
    table.string('title');
    table.integer('genre_fk').unsigned().references('genre_id').inTable('genres');
    table.integer('author_fk').unsigned().references('author_id').inTable('authors');
    table.text('description');
    table.string('cover_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
  return knex.schema.dropTable('books');
};
