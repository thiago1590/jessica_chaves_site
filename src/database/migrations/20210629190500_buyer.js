
exports.up = function(knex) {
  return knex.schema.createTable("buyers", (table) => {
      table.uuid("id").unique
      table.string("email").unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("buyers")
};
