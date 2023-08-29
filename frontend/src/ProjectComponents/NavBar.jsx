import React from 'react';
import { NavLink } from 'react-router-dom';
import '../ProjectCss/navbar.css'
const NavBar = () => {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/create" className="navbar-link">Register</NavLink>
        <NavLink to="/login" className="navbar-link">Login</NavLink>
        <NavLink to="/my-profile" className="navbar-link">My Profile</NavLink>
        <NavLink to="/security" className="navbar-link">Security</NavLink>
        <NavLink to="/admin/panel" className="navbar-link">Admin Panel</NavLink>
      </nav>
    </div>
  );
};

export default NavBar;


