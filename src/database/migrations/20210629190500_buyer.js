
exports.up = function(knex) {
  return knex.schema.createTable("purchase", (table) => {
      table.uuid("id").unique()
      table.string("idPayment")   
      table.string("buyer_email")
      table.integer("email_sent").notNullable().defaultTo(0)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("purchase")
};
