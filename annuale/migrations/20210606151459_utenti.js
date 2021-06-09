exports.up = function (knex) {
  return knex.schema.createTable('utenti', function (table) {
    // add an autoincrementing id column (serial type in Postgres)
    table.increments()
    // add a string column called description
    table.string('email')
    // add a boolean column to indicate whether the meal had queso.
    table.string('ruolo')
    // add created_at and updated_at columns with appropriate default values.
    table.timestamps()
    // create a foreign key that references the id column of the user table
    //table.integer('user_id')//.references('user.id');
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('utenti')
}
