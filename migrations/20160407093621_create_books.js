
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.text('biography');
    table.string('portrait_url');
  })
    .createTable('genres', function(table){
    table.increments('id');
    table.string('genre');
  })
    .createTable('books', function(table){
    table.increments('id');
    table.integer('genre_fk').references('genres.id').onUpdate('cascade').onDelete('cascade');
    table.string('title');
    table.text('description');
    table.string('cover_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
  return knex.schema.dropTable('authors');
  return knex.schema.dropTable('genres');
};
