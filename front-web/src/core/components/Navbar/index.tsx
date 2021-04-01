import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getAccessTokenDecoded, logout } from "core/utils/auth";
import Menu from 'core/assets/images/menu.svg';

const Navbar = () => {
  const [drawerActive, setDrawerActive] = useState(false);
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

      <button
        className="menu-mobile-btn"
        type="button"
        onClick={() => setDrawerActive(!drawerActive)}
      >
        <img src={Menu} alt="Menu Mobile" />
      </button>

      <div className={drawerActive ? 'menu-mobile-container' : 'menu-container'}>
        <ul className="main-menu">
          <li>
            <NavLink
              to="/"
              className="nav-link"
              exact
              onClick={() => setDrawerActive(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="nav-link"
              onClick={() => setDrawerActive(false)}
            >
              Catalogo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              className="nav-link"
              onClick={() => setDrawerActive(false)}>
              Admin
            </NavLink>
          </li>
          {drawerActive && (
            <li>
              {
                currentUser && (
                  <a
                    href="#logout"
                    className="nav-link active d-inline"
                    onClick={() => setDrawerActive(false)}>
                    {`LOGOUT - ${currentUser}`}
                  </a>
                )
              }
            </li>
          )}
          {drawerActive && (
            <>
              {!currentUser && (
                <li>
                  <Link
                    to="/auth/login"
                    className="nav-link active"
                    onClick={() => setDrawerActive(false)}
                  >Login</Link>
                </li>
              )}
            </>
          )

          }
        </ul>
      </div>
      <div className="user-info-dnone text-right">
        {currentUser && (
          <>
            {currentUser}
            <a
              href="#logout"
              className="nav-link d-inline"
              onClick={(e) => {
                handleLogout(e);
                setDrawerActive(false);
              }}>
              LOGOUT
            </a>
          </>
        )}
        {!currentUser && (
          <Link
            to="/auth/login"
            className="nav-link active"
            onClick={() => setDrawerActive(false)}
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  )
};

export default Navbar;
