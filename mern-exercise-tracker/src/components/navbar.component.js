import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to='/' className='navbar-brand'>ExerciseTracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTop" aria-controls="navbarTop" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTop">
                    <div className="navbar-nav">
                        <Link to='/' className='nav-link'>Exercises</Link>
                        <Link to='/create' className='nav-link'>Create Exercise Log</Link>
                        <Link to='/user' className='nav-link'>Create User</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
