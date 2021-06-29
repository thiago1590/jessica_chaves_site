
exports.up = function(knex) {
  return knex.schema.createTable("buyers", (table) => {
      table.uuid("id").unique
      table.string("name")
      table.string("email").unique()
      table.string("phone").unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("buyers")
};
