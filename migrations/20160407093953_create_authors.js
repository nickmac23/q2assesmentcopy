
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments('author_id');
    table.string('firstName');
    table.string('lastName');
    table.text('biography');
    table.string('portrait_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
