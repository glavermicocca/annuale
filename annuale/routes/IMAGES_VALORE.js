// Errori di coniazione
const table = require('../db/model/IMAGES_VALORE')

const PATH_NAME = '/IMAGES_VALORE'

module.exports = function (app, checkToken, db) {
  app.get(PATH_NAME, (req, res) => table.select(req, res, db))
  app.get(PATH_NAME + 'Thumb', (req, res) => table.selectThumb(req, res, db))
  //count per la dashboard
  app.post(PATH_NAME, checkToken, (req, res) => table.insertOrUpdate(req, res, db))
  // //insert or update con PUT
  // app.put(PATH_NAME, checkToken, (req, res) => table.insertOrUpdate(req, res, db))
  // //delete
  // app.delete(PATH_NAME, checkToken, (req, res) => table.deleteRow(req, res, db))
}
