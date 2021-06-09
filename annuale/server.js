const knexMigrate = require('knex-migrate')
const path = require('path')
const fileUpload = require('express-fileupload')

const morgan = require('morgan')

const cors = require('cors')

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  //path: '/socket.io'
  //path: '/api' //lo std è /socket.io/ e va specificato in nginx
})

async function run() {
  const log = ({ action, migration }) => console.log('Doing ' + action + ' on ' + migration)
  await knexMigrate('up', log)
}

run()

const jwt = require('jsonwebtoken')

const admin = require('firebase-admin')

const envKeys = require('./envKeys')

admin.initializeApp({
  credential: admin.credential.cert(envKeys),
  databaseURL: 'https://server-auth-41acc.firebaseio.com'
})

// //const csrfMiddleware = csrf({ cookie: true })

const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET

// APP USE
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))
app.use(fileUpload())

app.use(cors())
// //app.use(cors())

//app.use(morgan('dev'))

function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const checkToken = (req, res, next) => {
  var jwtToken = extractToken(req)
  try {
    var profile = jwt.verify(jwtToken, JWT_SECRET)
    req.profile = profile
    console.log(profile)
    db.select('*')
      .from('ruoli')
      .where('email', profile.user)
      .first()
      .then(row => {
        if (row) {
          req.profile.role = row.tipo_ruolo
          req.profile.id_ruoli = row.id
          next()
        } else {
          res.status(401).send('Unauthorized')
        }
      })
  } catch (err) {
    console.log('jwt verify error', err)
    res.status(500).json({ message: 'Invalid jwt token' })

    alertClients('error', `JWT verify error`)
  }
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const db = require('./db')

app.post('/sessionLogin', (req, res) => {
  console.log(req.body)
  const idToken = req.body.idToken.toString()

  const expiresIn = 365 * 60 * 60 * 24 * 5 * 1000

  admin
    .auth()
    .verifyIdToken(idToken, true /** checkRevoked */)
    .then(async claims => {
      const row = await db.select('*').from('ruoli').where('email', claims.email).first()
      if (row) {
        const credentials = { user: claims.email, role: row.tipo_ruolo }
        const jwtToken = jwt.sign(credentials, JWT_SECRET, { expiresIn }) // expires in 24h
        res.status(200).json({ id_token: jwtToken })
        alertClients('info', `User '${credentials.user}' just logged in`)
      } else {
        //res.redirect('/login')
        res.status(401).send('Unauthorized')
      }
    })
    .catch(error => {
      res.redirect('/login')
    })
})

app.post('/sessionLoginForm', async (req, res) => {
  console.log(req.body.data.email)

  const expiresIn = 365 * 60 * 60 * 24 * 5 * 1000

  try {
    if (req.body.data.password != null || req.body.data.password != undefined || req.body.data.password.length >= 8) {
      const row = await db.select('*').from('ruoli').where('email', req.body.data.email).andWhere('password', req.body.data.password).first()
      if (row) {
        const credentials = { user: req.body.data.email, role: row.tipo_ruolo }
        const jwtToken = jwt.sign(credentials, JWT_SECRET, { expiresIn }) // expires in 24h
        res.status(200).json({ id_token: jwtToken })
        alertClients('info', `User '${credentials.user}' just logged in`)
      } else {
        //res.redirect('/login')
        res.status(401).send('Unauthorized')
      }
    }
  } catch (error) {
    res.redirect('/login')
  }
})

app.post('/sessionLogout', function (req, res) {
  console.log('Requesting /logout ...')

  var jwtToken = extractToken(req)
  try {
    var profile = jwt.verify(jwtToken, JWT_SECRET)
    res.status(200).json({ message: `User ${profile.user} logged out` })

    alertClients('info', `User '${profile.user}' just logged out`)
  } catch (err) {
    console.log('jwt verify error', err)
    res.status(500).json({ message: 'Invalid jwt token' })

    alertClients('error', `JWT verify error`)
  }
})

var tbNodeMethod = require('tubular-nodejs')('knex')

// Crea le rotte GET POST PUT etx
require('./routes/RUOLI')(app, checkToken, db, tbNodeMethod)
require('./routes/RUOLI_ASSEGNATI')(app, checkToken, db, tbNodeMethod)
require('./routes/ANNUALE')(app, checkToken, db, tbNodeMethod)
require('./routes/PROGRESSIVO')(app, checkToken, db, tbNodeMethod)
require('./routes/IMAGES')(app, checkToken, db, tbNodeMethod)
require('./routes/IMAGES_VALORE')(app, checkToken, db)
require('./routes/VALORE')(app, checkToken, db, tbNodeMethod)

const reportingApp = express()
app.use('/reporting', reportingApp)

// ---------------- SOCKET.iO ---------------------

app.get('/welcome', (req, res) => {
  res.send(new Date())
})

io.on('connection', socket => {
  console.log('a user connected')
})

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})

// Alerts all clents via socket io.
function alertClients(type, msg) {
  console.log('SocketIO alerting clients: ', msg)
  io.sockets.emit('alert', { message: msg, time: new Date(), type })
}

setInterval(() => {
  alertClients('MSG', 'Hello from server...')
}, 60000)

// PRODUCTION BUILD VERSION RELEASE reactjs
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, './build')))

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
  })
}

// ---------------- Init Reporting ---------------------

const jsreport = require('jsreport')({
  store: { provider: 'fs' },
  appPath: '/reporting',
  chrome: {
    launchOptions: {
      args: ['--no-sandbox']
    }
  },
  extensions: {
    express: { app: reportingApp, server: server },
    'fs-store': {
      dataDirectory: 'data'
    },
    authentication: {
      cookieSession: {
        secret: 'dasd321as56d1sd5s61vdv32'
      },
      admin: {
        username: process.env.JSREPORT_USER,
        password: process.env.JSREPORT_PASSWORD
      }
    }
  }
})

jsreport
  .init()
  .then(() => {
    console.log('jsreport server started')
  })
  .catch(e => {
    console.error(e)
  })
