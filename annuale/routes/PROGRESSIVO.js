// Errori di coniazione
const table = require('../db/model/PROGRESSIVO')

const PATH_NAME = '/PROGRESSIVO'

module.exports = function (app, checkToken, db, tbNodeMethod) {
  //DataGrid con POST
  //no checkToken -> Readonly
  app.post(PATH_NAME, (req, res) => table.select(req, res, db, tbNodeMethod))
  app.post(PATH_NAME + '_dettaglio', (req, res) => table.selectDettaglio(req, res, db))
  //count per la dashboard
  app.get(PATH_NAME + '_count', checkToken, (req, res) => table.selectCount(req, res, db))
  //insert or update con PUT
  app.put(PATH_NAME, checkToken, (req, res) => table.insertOrUpdate(req, res, db))
  //insert or update con PUT
  app.put(PATH_NAME + '_dettaglio', checkToken, (req, res) => table.updateDettaglio(req, res, db))
  //delete
  app.delete(PATH_NAME, checkToken, (req, res) => table.deleteRow(req, res, db))
}
