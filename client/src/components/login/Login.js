import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import './Login.css'

export default () => {

    const [loginForm, setLoginForm] = useState({ email: '', password: ''})
    const [messages, setMessages] = useState({message: '', status: ''})
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleValidation = () => {
        for(let index of Object.keys(loginForm)) {
            if(loginForm[index] === '')
                return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if( !handleValidation() ) {
            setMessages({message: 'Netinkamai užpildyta forma', status: 'danger'})
            return false
        }

        axios.post('/api/users/login/', loginForm)
        .then(resp => {            
            setMessages({message: resp.data.message, status: resp.data.status})
        
            if(resp.data.status === 'success') {
                setTimeout( () => {
                    navigate('/')
                }, 2000 )
            } 
        })
        .catch(() => {
            setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
        })
    }

    return (
        <div className="text-center">
            <main className="form-signin w-100 m-auto">
                {messages.message && (
                    <Alert variant={messages.status}>{messages.message}</Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Prisijungimas</h1>
                    <div className="form-floating">
                        <input type="email" className="form-control" name="email" value={loginForm.email} onChange={e => handleInputChange(e)} />
                        <label>El. pašto adresas</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="password" value={loginForm.password} onChange={e => handleInputChange(e)} />
                        <label>Slaptažodis</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
                </form>
            </main>
        </div>
    )
}