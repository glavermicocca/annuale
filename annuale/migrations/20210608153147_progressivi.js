exports.up = function (knex) {
  return knex.schema.table('progressivo', table => {
    table.string('descrizione_errore')
    table.string('tipo_errore')
    table.string('metallo')
    table.string('contorno')
    table.string('peso')
    table.string('diametro')
    table.string('link')
  })
}

exports.down = function (knex) {
  return knex.schema.table('progressivo', table => {
    table.dropColumn('descrizione_errore')
    table.dropColumn('tipo_errore')
    table.dropColumn('metallo')
    table.dropColumn('contorno')
    table.dropColumn('peso')
    table.dropColumn('diametro')
    table.dropColumn('link')
  })
}
