const TABLE_NAME = 'annuale'

const select = (req, res, knex, tbNodeMethod) => {
  let queryBuilder = knex.select('*').from(TABLE_NAME).where({ val: req.query.val })

  tbNodeMethod
    .createGridResponse(req.body, queryBuilder)
    .then(function (response) {
      return res.json(response)
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

const insertOrUpdate = async (req, res, db) => {
  // const timestamp = db.fn.now()
  // const val = req.body.val
  // const anno = req.body.anno
  // const progr = req.body.progr
  // const anno_label = req.body.anno_label
  // const prev_val = req.body.prev.val
  // const prev_anno = req.body.prev.anno
  // //.first()
  // // let pprogressivo = await db.select('*').from('progressivo').where({ val, anno, progr }).first()
  // // Using trx as a transaction object:
  // db.transaction(async function (trx) {
  //   try {
  //     try {
  //       let vvalore_1 = await db.select('*').from('valore').where({ val: prev_val })
  //       let vvalore_2 = await db.select('*').from('valore').where({ val: val })
  //       if (vvalore_1.length > 0 || vvalore_2.length > 0) {
  //         const vv = await db('valore')
  //           .update({
  //             val,
  //             updated_at: timestamp
  //           })
  //           .where({ val: prev_val })
  //       } else if (prev_val === null) {
  //         const vv = await db('valore').insert({
  //           val,
  //           created_at: timestamp,
  //           updated_at: timestamp
  //         })
  //       }
  //     } catch (error) {
  //       throw error
  //     }
  //     try {
  //       let aannuale_1 = await db.select('*').from('annuale').where({ val: prev_val }).andWhere({ anno: prev_anno })
  //       let aannuale_2 = await db.select('*').from('annuale').where({ val }).andWhere({ anno })
  //       if (aannuale_1.length > 0 || aannuale_2.length > 0) {
  //         const aa = await db('annuale')
  //           .update({
  //             val,
  //             anno,
  //             anno_label,
  //             updated_at: timestamp
  //           })
  //           .where({ val: prev_val, anno: prev_anno })
  //       } else {
  //         const aa = await db('annuale').insert({
  //           val,
  //           anno,
  //           anno_label,
  //           created_at: timestamp,
  //           updated_at: timestamp
  //         })
  //       }
  //     } catch (error) {
  //       throw error
  //     }
  //     res.json({ row: [] })
  //     // try {
  //     //   const aa = await db('annuale')
  //     //     .insert({
  //     //       val,
  //     //       anno,
  //     //       anno_label,
  //     //       created_at: timestamp,
  //     //       updated_at: timestamp
  //     //     })
  //     //     .onConflict(['val', 'anno'])
  //     //     .merge({
  //     //       val,
  //     //       anno,
  //     //       anno_label,
  //     //       updated_at: timestamp
  //     //     })
  //     // } catch (error) {
  //     //   console.log(error)
  //     // }
  //     //trx.commit()
  //   } catch (err) {
  //     //trx.rollback()
  //     if (err.response) {
  //       res.status(400).json({ error: err.response.message || err.response.statusText })
  //     } else {
  //       res.status(400).json({ error: err.detail || err.message })
  //     }
  //   }
  // })
}

const deleteRow = (req, res, db) => {
  const rows = req.body
  db(TABLE_NAME)
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
  insertOrUpdate,
  deleteRow
}
