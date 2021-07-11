
exports.up = function(knex) {
  return knex.schema.createTable("buyers", (table) => {
      table.uuid("id").unique
      table.string("idPayment")
      table.string("email")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("buyers")
};
