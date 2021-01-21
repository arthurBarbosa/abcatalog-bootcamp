import React from 'react';
import './styles.scss';

const Navbar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-2">
            <a href="#" className="nav-logo-text">
                <h4>AB Catalog</h4>
            </a>
        </div>
        <div className="col-6 offset-2">
            <ul className="main-menu">
                <li>
                    <a href="#" className="active">Home</a>
                </li>
                <li>
                    <a href="/">Catalogo</a>
                </li>
                <li>
                    <a href="/">Admin</a>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navbar;