
exports.up = function(knex, Promise) {
  return knex.schema
  // .createTable('genres', function(table){
  //     table.increments('genre_id');
  //     table.string('genre');
  //   })
    .createTable('books', function(table){
    table.increments('book_id');
    table.string('title');
    table.integer('genre_fk').unsigned().references('genre_id').inTable('genres');
    table.text('description');
    table.string('cover_url');
  })
};

exports.down = function(knex, Promise) {
  // return knex.schema.dropTable('genres');
  return knex.schema.dropTable('books');
};
