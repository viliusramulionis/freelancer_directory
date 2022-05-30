import express from 'express'
import { getAll, remove} from '../service/portfolio.js'

const Router = express.Router()

Router.delete('/remove/:id', async (req, res) => {
    const id = req.params.id
    if(await remove(id)) {
        res.json({ message: 'Įrašas sėkmingai ištrintas', status: 'success' })
    } else {
        res.json({ message: 'Įvyko klaida', status: 'danger' })
    }
})

export default Router