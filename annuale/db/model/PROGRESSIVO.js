const TABLE_NAME = 'progressivo'

const select = (req, res, knex, tbNodeMethod) => {
  let queryBuilder = knex.select('*').from(TABLE_NAME).where({ val: req.query.val, anno: req.query.anno })

  tbNodeMethod
    .createGridResponse(req.body, queryBuilder)
    .then(function (response) {
      return res.json(response)
    })
    .catch(err => {
      res.status(400).json({ error: err.detail || err.message })
    })
}

const selectDettaglio = (req, res, knex) => {
  knex
    .select('*')
    .from(TABLE_NAME)
    .where({ val: req.body.val, anno: req.body.anno, progr: req.body.progr })
    .then(rows => {
      res.json(rows)
    })
    .catch(err => res.status(400).json({ error: err.detail || err.message }))
}

const selectCount = (req, res, knex) => {
  knex(TABLE_NAME)
    .count({ count: '*' })
    .then(async total => {
      res.json({
        total: total[0].count
      })
    })
    .catch(err => res.status(400).json({ error: err.detail || err.message }))
}

const insertOrUpdate = async (req, res, knex) => {
  //TODO
}

const updateDettaglio = async (req, res, knex) => {
  const timestamp = knex.fn.now()
  const obj = {
    descrizione_errore: req.body.descrizione_errore,
    tipo_errore: req.body.tipo_errore,
    metallo: req.body.metallo,
    contorno: req.body.contorno,
    peso: req.body.peso,
    diametro: req.body.diametro,
    link: req.body.link,
    updated_at: timestamp
  }
  knex(TABLE_NAME)
    .where('val', req.body.prev.val)
    .andWhere('anno', req.body.prev.anno)
    .andWhere('progr', req.body.prev.progr)
    .update(obj)
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => {
      res.status(400).json({ error: err.detail || err.message })
    })
}

const deleteRow = (req, res, knex) => {
  const rows = req.body
  knex(TABLE_NAME)
    .delete()
    .whereIn('id', rows)
    .returning('*')
    .then(rows => {
      res.json({ deleted: true })
    })
    .catch(err => {
      res.status(400).json({ error: err.detail || err.message })
    })
}

module.exports = {
  selectCount,
  select,
  selectDettaglio,
  insertOrUpdate,
  updateDettaglio,
  deleteRow
}
