// Errori di coniazione
const request = require('request')
const table = require('../db/report/conferma')

const PATH_NAME = '/report'

module.exports = function (app, checkToken, db) {
  app.get(PATH_NAME + '_sposta', (req, res) => table.sposta(req, res, db))
  app.get('/test', (req, res, next) => {
    var data = {
      template: { shortid: 'bPDyrNDY5A' }
    }

    var option = {
      uri: 'http://localhost:3000/reporting/api/report',
      method: 'POST',
      headers: {
        Authorization: 'Basic YWRtaW46cGFzc3dvcmQ='
      },
      json: data
    }

    request(option).pipe(res)
  })
}
