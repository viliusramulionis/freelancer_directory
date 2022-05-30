import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import ProfileBox from '../profile-box/ProfileBox'

export default () => {

    const [profiles, setProfiles] = useState([])
    const [filter, setFilter] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/profiles/')
        .then(resp => {  
            setIsLoading(false)
            if(resp.data.status === 'success')
                setProfiles(resp.data.message)
        })
        .catch(() => {
            setIsLoading(false)
            //setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
        })
    }, [])

    const List = () => {
        return profiles.map((value, index) => (
            <ProfileBox key={index} profile={value} />
        ))
    }

    const ListContainer = () => {
        return (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 pt-5"> 
                <List />
            </div>
        )
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const handleFilter = () => {

        setIsLoading(true)
        axios.get('/api/profiles/filter/hourly_rate/' + filter)
        .then(resp => {  
            setIsLoading(false)
            if(resp.data.status === 'success')
                setProfiles(resp.data.message)
        })
        .catch(() => {
            setIsLoading(false)
            //setMessages({message: 'Įvyko serverio klaida', status: 'danger'})
        })
    }

    const sortAscending = () => {
        axios.get('/api/profiles/sort/asc')
        .then(resp => {  
            setIsLoading(false)
            if(resp.data.status === 'success')
                setProfiles(resp.data.message)
        })
        .catch(() => {
            setIsLoading(false)
        })
    }

    const sortDescending = () => {
        axios.get('/api/profiles/sort/desc')
        .then(resp => {  
            setIsLoading(false)
            if(resp.data.status === 'success')
                setProfiles(resp.data.message)
        })
        .catch(() => {
            setIsLoading(false)
        })
    } 

    return (
        <Container>
            <h1>Freelancerių sąrašas</h1>
            {isLoading ? 
                'Duomenys kraunasi...' : (
                    <>
                        <div className="Filter">
                            <label>Filtravimas pagal valandinį įkainį:</label>
                            <input type="number" min="0" value={filter} onChange={e => handleFilterChange(e)} />
                            <button onClick={handleFilter}>Filtruoti</button>
                        </div>
                        <div className="sorting pt-3">
                            <button className="btn btn-primary mr-5" onClick={sortAscending}>Didėjančia tvarka</button>
                            <button className="btn btn-primary" onClick={sortDescending}>Mažėjančia tvarka</button>
                        </div>
                        <ListContainer />
                    </>
                )
            }
        </Container>
    )
}