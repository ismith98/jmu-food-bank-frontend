import React from 'react'
import logo from '../the-pantry-logo.png'

export default function Home() {
    return (
        <div>
            <img src={logo} alt="The Pantry Logo" className="pantry-logo" />
            <h1>Welcome to the Admin Site for The Pantry</h1>
        </div>
    )
}

