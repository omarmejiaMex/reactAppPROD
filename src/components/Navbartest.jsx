import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">JE-MEX</Link>
            <nav className="navbar">
                <Link to="/Cashier">Cashier</Link>
                <Link to="/Polaris">Polaris</Link>
                <Link to="/Terex">Terex</Link>
                <Link to="/Contacto">Contacto</Link>
            </nav>
        </header>
    )
}

export default NavBar
