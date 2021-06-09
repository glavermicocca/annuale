exports.up = function (knex) {
  return knex.schema.createTable('images_valore', function (table) {
    // add an autoincrementing id column (serial type in Postgres)
    table.increments()
    // add a string column called COD_ART
    table.string('val').references('val').inTable('valore').onUpdate('cascade').onDelete('cascade')
    table.binary('image')
    // add created_at and updated_at columns with appropriate default values.
    table.timestamps()
    // create a foreign key that references the id column of the user table
    //table.integer('user_id')//.references('user.id');
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('images_valore')
}
