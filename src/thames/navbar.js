import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import {connect} from 'react-redux';
import {signOut} from '../actions/index';

const Navbar = ({signOut}) => {
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* <!-- Navbar Brand--> */}
            <NavLink className="navbar-brand ps-3" to="/">LDM Apps</NavLink>
            {/* <!-- Sidebar Toggle--> */}
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" to="#!"><i className="fas fa-bars"></i></button>
            {/* <!-- Navbar Search--> */}
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </form>
            {/* <!-- Navbar--> */}
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></NavLink>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/">Settings</Link></li>
                        <li><Link className="dropdown-item" to="/">Activity Log</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={() => signOut()}>Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default connect(null, {signOut})(Navbar);