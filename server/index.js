import express from 'express'
import database from './database/connection.js'
import users from './controller/users.js'
import profile from './controller/profile.js'
import portfolio from './controller/portfolio.js'
import cookieParser from 'cookie-parser'
import authenticate from './middleware/authenticate.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
 
app.use( express.urlencoded({
  extended: false
}))

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))
app.use('/', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.use('/api/users/', users)
app.use('/api/profiles/', profile)
app.use('/api/portfolio/', portfolio)

app.get('/test', authenticate, (req, res) => {
  res.json(req.email)
})

app.listen(3001)