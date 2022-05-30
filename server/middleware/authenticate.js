import jwt from 'jsonwebtoken' 
import { loadJsonFile } from 'load-json-file'

const config = await loadJsonFile('./config.json')

export default (req, res, next) => {
    if (!req.cookies?.token) {
        res.json({message: 'Unauthorized: No token provided', status: 'danger'})
        return
    } 

    jwt.verify(req.cookies.token, config.secret, (err, decoded) => {
        if (err) {
            res.json({message: 'Unauthorized: Invalid token', status: 'danger'})
            return
        } 
        req.email = decoded.email
        next()
    })

}