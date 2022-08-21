import React from 'react'
import {NavLink} from 'react-router-dom'
export default function Navbar() {
  return <>
  <nav className="navbar navbar-expand-lg bg-transparent navbar-dark fixed-top">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to={'home'}>NOTES</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to={'register'}>Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={'login'}>Login</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </>
}
