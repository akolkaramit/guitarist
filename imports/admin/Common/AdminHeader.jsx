import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';

export default class AdminHeader extends Component {

    logoutUser = ()=>{
        Meteor.logout(()=>{
            Swal({
                position: 'center',
                type: 'success',
                title: 'Admin Log Out Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            browserHistory.replace("/");
        })
      }

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light giutar-admin-nav shadow">
                <div className="container">
                    <a className="navbar-brand" href="#">GuitarRist Admin</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link activeClassName='activeAdminMenu' className="nav-link text-white" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link activeClassName='activeAdminMenu' className="nav-link text-white" to="/addNewGuitar">Guitars</Link>
                            </li>
                            <li className="nav-item">
                                <Link activeClassName='activeAdminMenu' className="nav-link text-white" to="/addAccessories">Accessories</Link>
                            </li>
                            <li className="nav-item">
                                <Link activeClassName='activeAdminMenu' className="nav-link text-white" to="/addNewStrap">Straps</Link>
                            </li>
                            <li className="nav-item">
                                <Link activeClassName='activeAdminMenu' className="nav-link text-white" to="/adminOrders">Orders</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link text-white" to="/">Visit Guitarist</Link>
                            </li>
                        </ul>
                        <span className="navbar-text text-white guitar-admin-username">
                            Wecome, Admin
                        </span>
                        <span className="navbar-text text-white guitar-admin-logout"  onClick={this.logoutUser.bind(this)}>
                            Logout
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}