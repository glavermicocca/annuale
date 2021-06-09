const TABLE_NAME = 'ruoli_assegnati'

const select = (req, res, knex, tbNodeMethod) => {
  let whereCond = {}

  if (req.query.id_ruolo !== undefined) {
    whereCond['ruoli_assegnati.id_ruolo'] = req.query.id_ruolo
  }

  if (req.query.is_cliente !== undefined) {
    whereCond['depositi.is_cliente'] = req.query.is_cliente
  }

  const colArr = req.body.columns.map(col => {
    return col.name
  })

  const colSelect = [...colArr]

  let queryBuilder = knex.select(colSelect).from(TABLE_NAME).leftJoin('depositi', 'depositi.cod_dep', 'ruoli_assegnati.cod_dep').where(whereCond)

  tbNodeMethod
    .createGridResponse(req.body, queryBuilder)
    .then(function (response) {
      return res.json(response)
    })
    .catch(err => {
      ares.status(400).json({ dbError: err })
    })
}

const selectDepositi = (req, res, db) => {
  let whereCond = {}

  if (req.query.is_cliente !== undefined) {
    whereCond['is_cliente'] = req.query.is_cliente
  }

  const colSelect = ['cod_dep', 'des_dep']

  let queryBuilder = db.select(colSelect).from('depositi').where(whereCond)

  console.log(queryBuilder.toString())

  queryBuilder
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(400).json({ error: err.detail || err.message })
    })
}

const selectCount = (req, res, db) => {
  db(TABLE_NAME)
    .count({ count: '*' })
    .then(async total => {
      res.json({
        total: total[0].count
      })
    })
    .catch(err => res.status(400).json({ error: err.detail || err.message }))
}

const insert = async (req, res, db) => {
  if (req.profile.role === 'ADMIN') {
    const timestamp = db.fn.now()
    const obj = {
      id_ruolo: req.body.id,
      cod_dep: req.body.cod_dep.option,
      created_at: timestamp,
      updated_at: timestamp
    }
    db(TABLE_NAME)
      .insert(obj)
      .returning('*')
      .then(item => {
        res.json({ rows: item })
      })
      .catch(err => {
        res.status(400).json({ error: err.detail || err.message })
      })
  } else {
    res.status(401).send('Unauthorized')
  }
}

const deleteRow = (req, res, db) => {
  if (req.profile.role === 'ADMIN') {
    const rows = req.body
    db(TABLE_NAME)
      .delete()
      .whereIn(['id_ruolo', 'cod_dep'], rows)
      .then(item => {
        res.json({ deleted: true })
      })
      .catch(err => {
        res.status(400).json({ error: err.detail || err.message })
      })
  } else {
    res.status(401).send('Unauthorized')
  }
}

module.exports = {
  selectCount,
  selectDepositi,
  select,
  insert,
  deleteRow
}
