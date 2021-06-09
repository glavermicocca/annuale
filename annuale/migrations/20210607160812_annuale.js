exports.up = function (knex) {
  return knex.schema.createTable('annuale', function (table) {
    // add an autoincrementing id column (serial type in Postgres)
    // table.increments('id').primary()
    // add a string column called COD_ART
    //table.string('cod_art').references('cod_art').inTable('art_ana').notNull().onUpdate('cascade') //.onDelete('cascade')

    table.string('val').references('val').inTable('valore').onUpdate('cascade').onDelete('cascade')
    table.string('anno')
    //valore per l'anno p.e. -> 1995
    table.string('anno_label')

    //table.string('cod_dep').references('cod_dep').inTable('depositi').notNull().onUpdate('cascade') //.onDelete('cascade')
    // table.decimal('quant_carico', 1000, 16)
    // table.string('cod_dep_2').references('cod_dep').inTable('depositi').onUpdate('cascade') //.onDelete('cascade')
    // table.decimal('quant_scarico', 1000, 16)
    // table.datetime('data_movimento')
    //table.string('doc_table')
    table.unique(['val', 'anno'])

    // add created_at and updated_at columns with appropriate default values.
    table.timestamps()
    // create a foreign key that references the id column of the user table
    //table.integer('user_id')//.references('user.id');
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('annuale')
}
