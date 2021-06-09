exports.up = function (knex) {
  return knex.schema.createTable('ruoli', function (table) {
    // add an autoincrementing id column (serial type in Postgres)
    table.increments()
    // add a string column called COD_ART
    table.string('email')
    table.string('des_ruolo')
    table.string('tipo_ruolo')
    table.string('password')
    // add created_at and updated_at columns with appropriate default values.
    table.timestamps()
    // create a foreign key that references the id column of the user table
    //table.integer('user_id')//.references('user.id');
    table.unique(['email', 'tipo_ruolo'])
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('ruoli')
}
