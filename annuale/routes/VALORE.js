// Errori di coniazione
const table = require('../db/model/VALORE')

const PATH_NAME = '/VALORE'

module.exports = function (app, checkToken, db, tbNodeMethod) {
  //DataGrid con POST
  //no checkToken -> Readonly
  app.post(PATH_NAME, (req, res) => table.select(req, res, db, tbNodeMethod))
  //count per la dashboard
  app.get(PATH_NAME + '_count', checkToken, (req, res) => table.selectCount(req, res, db))
  //insert or update con PUT
  app.put(PATH_NAME, checkToken, (req, res) => table.insertOrUpdate(req, res, db))
  //delete
  app.delete(PATH_NAME, checkToken, (req, res) => table.deleteRow(req, res, db))
}
