
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments('author_id');
    table.string('firstName');
    table.string('lastName');
    table.text('biography');
    table.string('portrait_url');
  }).createTable('genres', function(table){
    table.increments('genre_id');
    table.string('genre');
  })
    .createTable('books', function(table){
    table.increments('book_id');
    table.string('title');
    table.string('genre');
    table.text('description');
    table.string('cover_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
  return knex.schema.dropTable('authors');
};
