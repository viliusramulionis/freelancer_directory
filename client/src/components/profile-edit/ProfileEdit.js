import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './ProfileEdit.css'

const userid = 1 //Statinis userio ID kuri veliau pakeisime

export default () => {

    const [profileForm, setProfileForm] = useState({ 
        headline: '', 
        subheadline: '', 
        description: '', 
        hourly_rate: 5, 
        location: ''
    })
    const [profileImage, setProfileImage] = useState('')
    const [imageGallery, setImageGallery] = useState('')
    const [messages, setMessages] = useState({message: '', status: ''})
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.files[0] })
    }

    const handleMultipleFilesChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.files })
    }

    const handleValidation = () => {
        for(let index of Object.keys(profileForm)) {
            if(index === 'hourly_rate' && profileForm[index] < 0)
                return false

            if(profileForm[index] === '')
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

        let formData = new FormData();
        formData.append('UserId', userid)

        for(const key of Object.keys(profileForm)) {
            if(key === 'portfolio_items') {
                for(const image of Object.keys(profileForm[key])) {
                    formData.append('portfolio_items', profileForm[key][image])
                }    
                continue
            }

            formData.append(key, profileForm[key])
        }

        axios.put('/api/profiles/update/', formData)
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

    const deletePhoto = (e) => {
        const id = e.target.dataset.id

        axios.delete('/api/portfolio/remove/' + id)
        .then(resp => {
            setMessages({message: resp.data.message, status: resp.data.status})

            if(resp.data.status === 'success') 
                e.target.parentNode.remove()
        })
        .catch(() => {
            setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
        })
    }

    useEffect(() => {
        axios.get('/api/profiles/edit/' + userid)
        .then(resp => {
            const message = resp.data.message            
            if(resp.data.status === 'success') {
                setProfileForm({ 
                    headline: message.headline, 
                    subheadline: message.subheadline, 
                    description: message.description, 
                    hourly_rate: message.hourly_rate, 
                    location: message.location
                })

                if(message.profile_image)
                    setProfileImage(message.profile_image)

                if(message.portfolio)
                    setImageGallery(message.portfolio)

            } else {
                setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
            }
        })
        .catch(() => {
            setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
        })
    }, [])
    
    return (
        <Container>
            <div className="profileCreate">
                <h1>Profilio redagavimas</h1>
                {messages.message && (
                    <Alert variant={messages.status}>{messages.message}</Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Antraštė</label>
                        <input type="text" name="headline" className="form-control" placeholder="Nuostabus programuotojas" value={ profileForm.headline } onChange={ (e) => handleInputChange(e) } />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Poraštė</label>
                        <input type="text" name="subheadline" className="form-control" placeholder="Dešimt metų darbo praktikos" value={ profileForm.subheadline } onChange={ (e) => handleInputChange(e) } />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Prisistatymas</label>
                        <textarea className="form-control" rows="3" name="description" value={ profileForm.description } onChange={ (e) => handleInputChange(e) }></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Valandinis įkainis</label>
                        <input type="number" name="hourly_rate" className="form-control" min="0" value={ profileForm.hourly_rate } onChange={ (e) => handleInputChange(e) } />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Vieta</label>
                        <input type="text" name="location" className="form-control" placeholder="Kaunas, Lietuva" value={ profileForm.location } onChange={ (e) => handleInputChange(e) } />
                    </div>
                    {profileImage && (
                        <div className="mb-3">
                            <img src={profileImage} className="w-25" />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Profilio nuotrauka</label>
                        <input type="file" name="profile_image" className="form-control" onChange={ (e) => handleFileChange(e) } />
                    </div>
                    {imageGallery && (
                        <div className="row mb-3">
                            <div className="grid">
                                {imageGallery.map(image => (
                                    <div key={image.id} className="profile-image">
                                        <img src={image.image_url} className="mw-100" />
                                        <span className="deletePhoto" data-id={image.id} onClick={(e) => deletePhoto(e)}>Trinti</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Atliktų darbų nuotraukos</label>
                        <input type="file" name="portfolio_items" className="form-control" onChange={ (e) => handleMultipleFilesChange(e) } multiple/>
                    </div>
                    <Button type="submit" variant="primary">Redaguoti profilį</Button>
                </form>
            </div>
        </Container>
    )
}