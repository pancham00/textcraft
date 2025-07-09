import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ title = "Set title here", aboutText = "About", mode, toggleMode }) {
  const location = useLocation();

  return (
    <nav className={`navbar navbar-${mode} bg-${mode}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            {title}
          </Link>

          <ul className="navbar-nav d-flex flex-row ms-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                {aboutText}
              </Link>
            </li>
          </ul>
        </div>

        <div className={`form-check form-switch text-${mode === "light" ? "dark" : "light"}`}>
          <input
            onClick={toggleMode}
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Enable {mode === "light" ? "Dark" : "Light"} Mode
          </label>
        </div>
      </div>
    </nav>
  );
}
