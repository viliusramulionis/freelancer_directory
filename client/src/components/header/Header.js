import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Header.css'

export default () => {

    useEffect(() => {
        axios.get('/test', { withCredentials: true })
        .then(resp => {
            console.log(resp)
        })
    }, [])
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"><Link className="nav-link" to="/">Titulinis</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login">Prisijungti</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/registration">Registracija</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/create-profile">Sukurti profilį</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/edit">Redaguoti profilį</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}