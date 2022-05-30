import express from 'express'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from '../middleware/validator.js'
import {exists, insert, getUserByEmail} from '../service/users.js'
import { loadJsonFile } from 'load-json-file'

const Router = express.Router()
const config = await loadJsonFile('./config.json')

const registerSchema = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    validator(req, next, schema)
}

const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    validator(req, next, schema)
}

const saltRounds = 10

Router.post('/register', registerSchema,  async (req, res) => {
    
    if(await exists({
        email: req.body.email
    })) {
        res.json({status: 'danger', message: 'Toks vartotojas jau egzistuoja'})
        return
    } 
    
    req.body.password = await bcrypt.hash(req.body.password, saltRounds)

    if(await insert(req.body)) {
        res.json({status: 'success', message: 'Varototojas sėkmingai sukurtas'})
    } else {
        res.json({status: 'danger', message: 'Įvyko klaida'})
    }
})

Router.post('/login', loginSchema, async (req, res) => {
    const user = await getUserByEmail(req.body.email)

    if(!user) {
        res.json({status: 'danger', message: 'Nepavyko autentifikuoti vartotojo'})
        return 
    }

    if(!await bcrypt.compare(req.body.password, user.password)) {
        res.json({status: 'danger', message: 'Nepavyko autentifikuoti vartotojo'})
        return 
    }

    const payload = { email: req.body.email }
    const token = jwt.sign(payload, config.secret, {
        expiresIn: '1h'
    })
    res.cookie('token', token, { httpOnly: true })
    res.json({status: 'success', message: 'Prisijungimas sėkmingas'})
})

export default Router