exports.up = function (knex) {
  return knex.schema.createTable('images', function (table) {
    // add an autoincrementing id column (serial type in Postgres)
    table.increments()
    // add a string column called COD_ART
    table.string('val')
    table.string('anno')
    table.string('progr')

    table.foreign(['val', 'anno', 'progr']).references(['val', 'anno', 'progr']).on('progressivo').onUpdate('cascade').onDelete('cascade')

    table.binary('image')
    // add created_at and updated_at columns with appropriate default values.
    table.timestamps()
    // create a foreign key that references the id column of the user table
    //table.integer('user_id')//.references('user.id');
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('images')
}
