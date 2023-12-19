
exports.up = function(knex) {
  return knex.schema.createTable('stuff', t => {
    t.increments()
    t.string('thing')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stuff')
};
