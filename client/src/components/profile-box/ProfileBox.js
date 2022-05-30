import React from 'react'
import {Link} from 'react-router-dom'

export default (props) => {
    const date = new Date(props.profile.createdAt)

    return (
        <div className="col">
            <div className="card shadow-sm">
                <Link to={ '/profile/' + props.profile.id }>
                    <img className="bd-placeholder-img card-img-top" 
                        src={props.profile.profile_image}
                        />

                    <div className="card-body">
                        <p className="card-text h5">{props.profile.headline}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">{date.toLocaleDateString('lt-LT')}</small>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}