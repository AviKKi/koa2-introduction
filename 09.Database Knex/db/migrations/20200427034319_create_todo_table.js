
exports.up = function(knex) {
  return knex.schema.createTable('todo', function(table){
      table.increments()
      table.string('name').notNullable()
      table.boolean('is_done').default('false').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};
