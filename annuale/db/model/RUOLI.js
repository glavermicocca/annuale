const TABLE_NAME = 'ruoli'

const select = (req, res, knex, tbNodeMethod) => {
  let queryBuilder = knex.select('*').from(TABLE_NAME)

  tbNodeMethod
    .createGridResponse(req.body, queryBuilder)
    .then(function (response) {
      return res.json(response)
    })
    .catch(err => {
      ares.status(400).json({ dbError: err })
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

const insertOrUpdate = async (req, res, db) => {
  if (req.profile.role === 'ADMIN') {
    const timestamp = db.fn.now()
    if (req.body.prev.id == null) {
      const obj = {
        email: req.body.email,
        des_ruolo: req.body.des_ruolo,
        tipo_ruolo: req.body.tipo_ruolo.option,
        password: req.body.password,
        created_at: timestamp,
        updated_at: timestamp
      }
      db(TABLE_NAME)
        .insert(obj)
        .returning('*')
        .then(item => {
          res.json(item)
        })
        .catch(err => {
          res.status(400).json({ error: err.detail || err.message })
        })
    } else {
      //campi da aggiornare se c'è conflitto
      const obj = {
        email: req.body.email,
        des_ruolo: req.body.des_ruolo,
        tipo_ruolo: req.body.tipo_ruolo.option,
        password: req.body.password,
        updated_at: timestamp
      }
      db(TABLE_NAME)
        .where('id', req.body.prev.id)
        .update(obj)
        .returning('*')
        .then(item => {
          res.json(item)
        })
        .catch(err => {
          res.status(400).json({ error: err.detail || err.message })
        })
    }
  } else {
    res.status(401).send('Unauthorized')
  }
}

const deleteRow = (req, res, db) => {
  if (req.profile.role === 'ADMIN') {
    const rows = req.body
    db(TABLE_NAME)
      .delete()
      .whereIn('id', rows)
      .then(() => {
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
  select,
  insertOrUpdate,
  deleteRow
}
