
exports.up = function(knex) {
  return knex.schema.createTable("purchase", (table) => {
      table.uuid("id").unique()
      table.string("id_payment").unique()
      table.string("buyer_name")
      table.string("buyer_email")
      table.string("buyer_phone")
      table.integer("first_email_sent").notNullable().defaultTo(0)
      table.integer("second_email_sent").notNullable().defaultTo(0)
      table.string("status")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("purchase")
};
