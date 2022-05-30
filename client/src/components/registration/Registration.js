import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import './Registration.css'

export default () => {

    const [registerForm, setRegisterForm] = useState({ first_name: '', last_name: '', email: '', password: '', confirm_password: '' })
    const [messages, setMessages] = useState({message: '', status: ''})
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const handleValidation = () => {
        for(let index of Object.keys(registerForm)) {
            if(registerForm[index] === '')
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

        if(registerForm.password != registerForm.confirm_password) {
            setMessages({message: 'Slaptažodžiai nesutampa', status: 'danger'})
            return false
        }

        axios.post('/api/users/register/', registerForm)
        .then(resp => {            
            setMessages({message: resp.data.message, status: resp.data.status})
        
            if(resp.data.status === 'success') {
                setTimeout( () => {
                    navigate('/create-profile')
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
                    <h1 className="h3 mb-3 fw-normal">Registracija</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" name="first_name" value={registerForm.first_name} onChange={e => handleInputChange(e)} />
                        <label>Vardas</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" name="last_name" value={registerForm.last_name} onChange={e => handleInputChange(e)} />
                        <label>Pavardė</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" name="email" value={registerForm.email} onChange={e => handleInputChange(e)} />
                        <label>El. pašto adresas</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="password" value={registerForm.password} onChange={e => handleInputChange(e)} />
                        <label>Slaptažodis</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="confirm_password" value={registerForm.confirm_password} onChange={e => handleInputChange(e)} />
                        <label>Slaptažodžio patvirtinimas</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </main>
        </div>
    )
}