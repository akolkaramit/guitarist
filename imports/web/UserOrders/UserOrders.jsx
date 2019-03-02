import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { withTracker } from 'meteor/react-meteor-data';
import { Orders } from '/imports/api/Orders.js';

class UserOrders extends Component {
    constructor(props){
        super(props);
        this.viewOrderDetails = this.viewOrderDetails.bind(this);
    }

    viewOrderDetails = ()=>{
        Swal({
            position: 'center',
            type: 'warning',
            title: 'Just a Demo Website.',
            showConfirmButton: false,
            timer: 1500
        });
    }

    render(){
        return (
            <div className="guitar-u-orders container">
                <h2 className="guitar-uo-title text-center">
                    List of All Orders you have placed
                </h2>
                {
                    this.props.pubHandleReady ?
                        <table className="table table-responsive-sm table-responsive-xs table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Order Number</th>
                                    <th scope="col">Products</th>
                                    <th scope="col">Total(Rs.)</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.userOrderData.map((data, index)=>{
                                        return(
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>{data._id}</td>
                                                <td>
                                                    <div className="guitar-uo-list">
                                                        {
                                                            data.orderProducts.map((products, prodInd)=>{
                                                                return(
                                                                    products.baseType == "guitar" ?
                                                                    <div key={prodInd} className="productsList">{products.guitarName}</div>
                                                                    : 
                                                                    products.baseType == "accessory" ?
                                                                    <div key={prodInd} className="productsList">{products.accessoryName}</div>
                                                                    :
                                                                    <div key={prodInd} className="productsList">{products.strapName}</div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </td>
                                                <td>{data.estmateTotal}</td>
                                                <td>{data.status}</td>
                                                <td className="text-center">
                                                    <div className="guitar-uo-detailbtn btn" onClick={this.viewOrderDetails}>View</div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                
                            </tbody>
                        </table>
                    :
                        <div className="guitar-loader-pre">
                            <div className="guitar-loader"></div>
                        </div>
                }
                
            </div>
        );
    }
}

export default withTracker((props)=>{
    var userId = Meteor.userId();
    var pubHandle = Meteor.subscribe('orderpublishusers', userId);
    var userOrderData = Orders.find({"userId":userId}).fetch() || [];

    return {
        pubHandleReady : pubHandle.ready(),
        userOrderData  : userOrderData,
    }
})(UserOrders);