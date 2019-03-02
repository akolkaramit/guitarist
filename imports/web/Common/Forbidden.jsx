import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Forbidden extends Component {

    render(){
        return(
            <div className="container jumbotron text-center mt-5">
                <div  className="text-danger font-weight-bold">You don't have access to visit this page</div>
                <Link  className="text-white btn btn-success mt-3" to="/">go to Homepage</Link>
            </div>
        )
    }
}