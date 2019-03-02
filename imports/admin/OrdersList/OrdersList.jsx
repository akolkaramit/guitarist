import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { withTracker } from 'meteor/react-meteor-data';
import { Orders } from '/imports/api/Orders.js';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import moment from 'moment';

class OrdersList extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.viewOrderDetails = this.viewOrderDetails.bind(this);
    }

    viewOrderDetails = ()=>{
        Swal({
            position: 'center',
            type: 'warning',
            title: 'Just a Demo Website',
            showConfirmButton: false,
            timer: 1500
        })
    }

    render(){
        return(
            <div className="list-admin-orders">
                {   this.props.pubHandleReady ?
                        this.props.orderData && this.props.orderData.length > 0 ?
                            <table className="table table-responsive-sm table-responsive table-striped table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Order No.</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Products</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Ordred On</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.orderData.map((data, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <th scope="row">1</th>
                                                    <td>{data._id}</td>
                                                    <td>{data.userName}</td>
                                                    <td>{data.userAddress}</td>
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
                                                    <td>{moment(data.createdAt).fromNow()}</td>
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
                            <div className="jumbotron text-center">
                                No Orders Yet
                            </div>
                        :
                        <div className="guitar-loader-pre">
                            <div className="guitar-loader"></div>
                        </div>
                }
            </div>   
        )
    }
}

export default withTracker((props)=>{
    var pubHandle = Meteor.subscribe('orderpublish');
    var orderData = Orders.find({},{sort:{createdAt : -1}}).fetch() || [];

    return {
        orderData       : orderData,
        pubHandleReady  : pubHandle.ready(),
    }
})(OrdersList);