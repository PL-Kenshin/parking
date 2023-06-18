import React from "react";
import {Link } from "react-router-dom";
import { isExpired, decodeToken  } from "react-jwt";

const Navbar = (props) => {
  const user = decodeToken(localStorage.getItem('token'));
  const isNotLogged = isExpired(localStorage.getItem('token'));

   return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand flex-grow-1">Smart Parking</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse pt-4 pt-lg-0 flex-grow-1 justify-content-end" id="navbarSupportedContent">

        {isNotLogged &&<Link to="/login"><button type="button" className="btn btn-primary me-2 mt-2 mt-lg-0">Log In</button></Link>}
        {isNotLogged && <Link to="/signup"><button type="button" className="btn btn-outline-primary me-2 mt-2 mt-lg-0">Sign Up</button></Link>}
        {!isNotLogged && <span  className="badge me-2 mt-2 mt-lg-0">Welcome, {user.username}</span>}
        {user?.isAdmin && <Link to="/admin"><button type="button" className="btn btn-primary me-2 mt-2 mt-lg-0">Manage users</button></Link>}
        {!isNotLogged && <a href="/"><button type="button" className="btn btn-primary me-2 mt-2 mt-lg-0" onClick={() => localStorage.removeItem('token')}>Log out</button></a>}
      </div>
    </div>
  </nav>
    )
};

export default Navbar;