// Errori di coniazione
const table = require('../db/model/RUOLI_ASSEGNATI')

const PATH_NAME = '/RUOLI_ASSEGNATI'

module.exports = function (app, checkToken, db, tbNodeMethod) {
  //DataGrid con POST
  app.post(PATH_NAME, checkToken, (req, res) => table.select(req, res, db, tbNodeMethod))
  //count per la dashboard
  app.get(PATH_NAME + '_count', checkToken, (req, res) => table.selectCount(req, res, db))
  //count per la dashboard
  app.get(PATH_NAME + '_depositi', checkToken, (req, res) => table.selectDepositi(req, res, db))
  //insert or update con PUT
  app.put(PATH_NAME, checkToken, (req, res) => table.insert(req, res, db))
  //delete
  app.delete(PATH_NAME, checkToken, (req, res) => table.deleteRow(req, res, db))
}
