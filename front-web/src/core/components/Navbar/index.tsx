import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getAccessTokenDecoded, logout } from "core/utils/auth";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState('');
  const location = useLocation();

  useEffect(() => {
    const currentUserData = getAccessTokenDecoded();
    setCurrentUser(currentUserData.user_name);
  }, [location])

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
  }

  return (
    <nav className="bg-primary main-nav">

      <Link to="/" className="nav-logo-text">
        <h4>AB Catalog</h4>
      </Link>

      <div className="menu-container">
        <ul className="main-menu">
          <li>
            <NavLink to="/" className="nav-link" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="nav-link" >
              Catalogo
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="text-right">
        {currentUser && (
          <>
            {currentUser}
            <a
              href="#logout"
              className="nav-link d-inline"
              onClick={handleLogout}>
              LOGOUT
            </a>
          </>
        )}
        {!currentUser && (
          <Link to="/auth/login" className="nav-link active">
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  )
};

export default Navbar;
