const sharp = require('sharp')

const TABLE_NAME = 'images_valore'

const select = async (req, res, db) => {
  const val = req.query.val

  await db
    .select('image')
    .from(TABLE_NAME)
    .where({ val })
    .first()
    .then(img => {
      if (img !== undefined && img.image !== null) {
        res.send(img.image)
      } else {
        res.status(400).json({ error: 'No Img with that Id!' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.detail || err.message })
    })
}

const selectThumb = (req, res, db) => {
  const val = req.query.val

  db.select('image')
    .from(TABLE_NAME)
    .where({ val })
    .first()
    .then(img => {
      if (img !== undefined && img.image !== null) {
        sharp(img.image)
          .resize(200)
          //.jpeg({ mozjpeg: true })
          .toBuffer()
          .then(data => {
            res.send(data)
          })
          .catch(err => {
            console.log(err)
            res.send(img.image)
          })
      } else {
        res.status(400).json({ error: 'No Img with that Id!' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.detail || err.message })
    })
}

const insertOrUpdate = async (req, res, knex) => {
  const timestamp = knex.fn.now()

  const data = req.files.file.data

  const val = req.body.val

  let row = await knex.select('val').from(TABLE_NAME).where({ val }).first()

  if (row) {
    knex(TABLE_NAME)
      .update({ image: data, updated_at: timestamp })
      //.where('updated_at', '<', timestamp)
      .andWhere('val', '=', row.val)
      .then(item => {
        res.json(item)
      })
      .catch(err => {
        res.status(400).json({ error: err.detail || err.message })
      })
  } else {
    let obj = { val, image: data, created_at: timestamp, updated_at: timestamp }

    knex(TABLE_NAME)
      .insert(obj)
      .then(item => {
        res.json(item)
      })
      .catch(err => {
        res.status(400).json({ error: err.detail || err.message })
      })
  }
}

const deleteRow = (req, res, db) => {
  const rows = req.body
  db(TABLE_NAME)
    .delete()
    .whereIn('val', rows)
    .then(() => {
      res.json({ deleted: true })
    })
    .catch(err => res.status(400).json({ error: err.detail || err.message }))
}

module.exports = {
  select,
  selectThumb,
  insertOrUpdate,
  deleteRow
}
