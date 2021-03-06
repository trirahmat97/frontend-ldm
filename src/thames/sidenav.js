import React from 'react';
import { NavLink } from 'react-router-dom';

import {connect} from 'react-redux';

const Sidenav = ({auth}) => {
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            {auth.role === 'Admin' || auth.role === 'Super-Visor' ? (
                                <>
                                    <div className="sb-sidenav-menu-heading">Home</div>
                                    <NavLink className="nav-link" to="/dashboard">
                                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                        Dashboard
                                    </NavLink>
                                </>
                            ): null }
                            
                            <div className="sb-sidenav-menu-heading">Management</div>
                            {auth.role === 'Admin' || auth.role === 'Super-Visor' ? (
                                <>
                                <NavLink className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Management Data
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </NavLink>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/users">Users</NavLink>
                                        <NavLink className="nav-link" to="/products">Products</NavLink>
                                        <NavLink className="nav-link" to="/categories">Categories</NavLink>
                                    </nav>
                                </div>
                                </>
                            ): null}
                            
                            <NavLink className="nav-link" to="/jobs">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Daftar JOB
                            </NavLink>
                            {auth.role === 'Admin' || auth.role === 'Super-Visor' ? (
                            <NavLink className="nav-link" to="/reports">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Reports
                            </NavLink>
                            ): null}
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {auth.role} / {auth.name}
                    </div>
                </nav>
            </div>
        )
};

const mapStatetoProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStatetoProps, null)(Sidenav);