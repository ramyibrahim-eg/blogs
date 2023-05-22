import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import profileLogo from "../../img/profile-logo.webp";
import transaction from "bootstrap";

const Header = ({ user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span>
                <FaBars />
              </span>
            </button>
            <div
              className="collapse navbar-collapse text-uppercase"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink to="/">
                  <li className="nav-item nav-link">Home</li>
                </NavLink>
                <NavLink to="/create">
                  <li className="nav-item nav-link">Add Blog</li>
                </NavLink>
                <NavLink to="/about">
                  <li className="nav-item nav-link">About</li>
                </NavLink>
              </ul>

              <div className="row">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-0 align-items-center">
                  {userId ? (
                    <>
                      <div className="profile-logo ">
                        <img src={profileLogo} alt="profile logo" />
                      </div>
                      <p className="mb-0 mt-0 m-1 small text-muted">
                        {user?.displayName}
                      </p>
                      <li className="nav-item nav-link" onClick={handleLogout}>
                        LogOut
                      </li>
                    </>
                  ) : (
                    <NavLink to="/auth">
                      <li className="nav-item nav-link">Login</li>
                    </NavLink>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
