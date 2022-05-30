import express from 'express'
import database from './database/connection.js'
import users from './controller/users.js'
import profile from './controller/profile.js'
import portfolio from './controller/portfolio.js'
import cookieParser from 'cookie-parser'
import authenticate from './middleware/authenticate.js'

const app = express()
 
app.use( express.urlencoded({
  extended: false
}))

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))
app.use('/api/users/', users)
app.use('/api/profiles/', profile)
app.use('/api/portfolio/', portfolio)

app.get('/test', authenticate, (req, res) => {
  res.json(req.email)
})

app.listen(3001)