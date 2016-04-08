exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('genres').del(),
    knex('genres').insert({genre: 'python'}),
    knex('genres').insert({genre: 'javascript'})
  );
};
