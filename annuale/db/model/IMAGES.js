const sharp = require('sharp')

const TABLE_NAME = 'images'

const selectList = (req, res, knex, tbNodeMethod) => {
  const val = req.query.val
  const anno = req.query.anno
  const progr = req.query.progr

  let queryBuilder = knex.select(['id', 'val', 'anno', 'progr']).from(TABLE_NAME).where({ val }).andWhere({ anno }).andWhere({ progr })

  tbNodeMethod
    .createGridResponse(req.body, queryBuilder)
    .then(function (response) {
      return res.json(response)
    })
    .catch(err => {
      res.status(400).json({ error: err.detail || err.message })
    })
}

const select = async (req, res, knex) => {
  const id = req.query.id

  const img = await knex.select('image').from(TABLE_NAME).where({ id }).first()

  if (img !== null && img.image !== null) {
    const im = img.image
    res.send(img.image)
  } else {
    res.end('No Img with that Id!')
  }
}

const selectThumb = async (req, res, knex) => {
  const id = req.query.id

  const img = await knex.select('image').from(TABLE_NAME).where({ id }).first()

  if (img !== null && img.image !== null) {
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
    res.end('No Img with that Id!')
  }
}

const insertOrUpdate = async (req, res, knex) => {
  const timestamp = knex.fn.now()

  const data = req.files.file.data

  const id = req.query.id

  if (id) {
    knex(TABLE_NAME)
      .update({ image: data, updated_at: timestamp })
      //.where('updated_at', '<', timestamp)
      .andWhere('id', '=', id)
      .then(item => {
        res.json(item)
      })
      .catch(err => {
        res.status(400).json({ error: err.detail || err.message })
      })
  } else {
    const val = req.query.val
    const anno = req.query.anno
    const progr = req.query.progr

    let obj = { val, anno, progr, image: data, created_at: timestamp, updated_at: timestamp }

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

const deleteRow = (req, res, knex) => {
  const rows = req.body
  knex(TABLE_NAME)
    .delete()
    .whereIn('id', rows)
    .then(() => {
      res.json({ deleted: true })
    })
    .catch(err => res.status(400).json({ error: err.detail || err.message }))
}

module.exports = {
  selectList,
  select,
  selectThumb,
  insertOrUpdate,
  deleteRow
}
