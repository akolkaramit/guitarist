import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { withTracker } from 'meteor/react-meteor-data';
import { UserCart } from '/imports/api/UserCart.js';

class Cart extends Component{
    constructor(props){
        super(props);
        this.deleteCart = this.deleteCart.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    deleteCart (id){
        Swal({
            title: 'Are you sure?',
            text: "You want to remove this from Cart",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove it!'
          }).then((result) => {
                if(result.value){
                    Meteor.call('deteteCart', id, (error, success)=>{
                        if(success){
                            Swal({
                                position: 'center',
                                type: 'success',
                                title: 'Removed from Cart Successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                }
          })
    }

    placeOrder = ()=>{
        var cartItems   = this.props.cartItems;
        var cartTotal   = this.props.cartTotal;
        var gstRate     = this.props.gstRate;
        var estmateTotal = this.props.estmateTotal;
        var gstCharges = this.props.gstCharges;

        if(cartItems > 0){
            Meteor.call('addNewOrder', cartItems, cartTotal, gstRate, estmateTotal, gstCharges, (error, result)=>{
                if(result){
                    Swal({
                        position: 'center',
                        type: 'success',
                        title: 'Order Placed Successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal({
                        position: 'center',
                        type: 'warning',
                        title: 'Order not Placed.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        } else {
            Swal({
                position: 'center',
                type: 'warning',
                title: 'Please Add Items to Cart.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    render(){
        return(
            <div className="guitar-cart-container container">
                {/* <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="guitar-cart-empty">
                            <Link to="/">
                                <img src="/images/empty-cart-icon.jpg" alt="Click to Shop" className="img-responsive cart-empty-img"/>
                            </Link>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <div className="guitar-cart-table">
                            <div className="row guitar-cart-tablerow">
                                <div className="col-lg-3 text-center">
                                    Image
                                </div>
                                <div className="col-lg-5">
                                    Guitar Details
                                </div>
                                <div className="col-lg-2">
                                   Price
                                </div>
                                <div className="col-lg-2"></div>
                            </div>

                            {
                                this.props.pubHandleReady ?
                                    this.props.currentCartData.map((data, index)=>{
                                        return(
                                            data.baseType == 'guitar' ?
                                                <div key={index} className="row carttablerow">
                                                    <div className="col-lg-3">
                                                        <div className="guitar-cart-imgbox">
                                                            <img src="/images/guitars/demo1.png" alt="" className="guitar-cart-img"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5">
                                                        <div className="guitar-cart-d-name">Guitar Name: {data.guitarName}</div>
                                                        <div className="guitar-cart-d-brand">Guitar Brand: {data.guitarBrand}</div>
                                                        <div className="guitar-cart-d-type">Guitar Type: {data.guitarType}</div>
                                                        <div className="guitar-cart-d-type">Guitar Serial Number: {data.guitarSerialNumber}</div>
                                                        <Link to={'/guitarDetails/' + data.productId} className="guitar-cart-d-view btn">View</Link>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="guitar-cart-d-price">
                                                            Rs. {data.price}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="btn guitar-cart-delete" onClick={()=>this.deleteCart(data._id)}>
                                                            Delete
                                                        </div>
                                                    </div>
                                                </div>
                                            :
                                            data.baseType == 'accessory' ?
                                                <div key={index} className="row carttablerow">
                                                    <div className="col-lg-3">
                                                        <div className="guitar-cart-imgbox">
                                                            <img src="/images/accessories/demo1.png" alt="" className="guitar-cart-img"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5">
                                                        <div className="guitar-cart-d-name">Accessory Name: {data.accessoryName}</div>
                                                        <div className="guitar-cart-d-brand">Accessory Brand: {data.accessoryType}</div>
                                                        {/* <Link to="/" className="guitar-cart-d-view btn">View</Link> */}
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="guitar-cart-d-price">
                                                            Rs. {data.price}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="btn guitar-cart-delete" onClick={()=>this.deleteCart(data._id)}>
                                                            Delete
                                                        </div>
                                                    </div>
                                                </div>
                                            :
                                                <div key={index} className="row carttablerow">
                                                    <div className="col-lg-3">
                                                        <div className="guitar-cart-imgbox">
                                                            <img src="/images/straps/demo1.png" alt="" className="guitar-cart-img"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5">
                                                        <div className="guitar-cart-d-name">Strap Name: {data.strapName}</div>
                                                        <div className="guitar-cart-d-brand">Strap Brand: {data.strapSize}</div>
                                                        {/* <div className="guitar-cart-d-type">Strap Type: Electric</div> */}
                                                        {/* <Link to="/" className="guitar-cart-d-view btn">View</Link> */}
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="guitar-cart-d-price">
                                                            Rs. {data.price}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <div className="btn guitar-cart-delete" onClick={()=>this.deleteCart(data._id)}>
                                                            Delete
                                                        </div>
                                                    </div>
                                                </div>
                                        )
                                    })
                                :
                                <div className="guitar-loader-pre">
                                    <div className="guitar-loader"></div>
                                </div>
                            }

                            {/* <div className="row carttablerow">
                                <div className="col-lg-3">
                                    <div className="guitar-cart-imgbox">
                                        <img src="/images/guitars/demo1.png" alt="" className="guitar-cart-img"/>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="guitar-cart-d-name">Guitar Name: Guitar 120XD</div>
                                    <div className="guitar-cart-d-brand">Guitar Brand: Allen Solly</div>
                                    <div className="guitar-cart-d-type">Guitar Type: Electric</div>
                                    <Link to="/" className="guitar-cart-d-view btn">View</Link>
                                </div>
                                <div className="col-lg-2">
                                    <div className="guitar-cart-d-price">
                                        Rs. 3000
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="btn guitar-cart-delete">
                                        Delete
                                    </div>
                                </div>
                            </div> */}
                    
                            
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        {
                            this.props.pubHandleReady ?
                                <div className="cart-total-billed">
                                    <div className="cart-bill-summery">
                                        Order Summery
                                    </div>
                                    <div className="cart-totalitems clearfix">
                                        <div className="totalitems-title float-left">Items in Cart</div>
                                        <div className="totalitems-value float-right">{this.props.cartItems}</div>
                                    </div>
                                    <div className="cart-subtotal clearfix">
                                        <div className="cart-subtotal-title float-left">Subtotal</div>
                                        <div className="cart-subtotal-value float-right">Rs. {this.props.cartTotal}</div>
                                    </div>
                                    <div className="cart-gst clearfix">
                                        <div className="cart-gst-title float-left">GST ({this.props.gstRate}%)</div>
                                        <div className="cart-gst-value float-right">Rs. {this.props.gstCharges}</div>
                                    </div>
                                    <hr />
                                    <div className="cart-estimate-total clearfix">
                                        <div className="cart-est-title float-left">Estimate Total</div>
                                        <div className="cart-est-value float-right">Rs. {this.props.estmateTotal}</div>
                                    </div>

                                    <div className="place-order btn" onClick={this.placeOrder}>
                                        Place Order
                                    </div>
                                </div>
                            :
                                <div className="guitar-loader-pre">
                                    <div className="guitar-loader"></div>
                                </div>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}


export default withTracker(() => {
    var pubHandle = Meteor.subscribe('cartpublish');
    const userId = Meteor.userId();
    var currentCartData = UserCart.find({"userId":userId}).fetch();
    var gstRate = 28;
    if(currentCartData){
        var cartItems = currentCartData.length;
        var cartTotal = 0;
        for(var i=0; i<cartItems; i++){
            cartTotal = cartTotal + parseInt(currentCartData[i].price);
        }
    } else {
        var cartItems = 0;
        var cartTotal = 0;
    }

    if(cartItems > 0){
        var gstCharges = gstRate / 100 * cartTotal;
        var estmateTotal = gstCharges + cartTotal;
    } else {
        var estmateTotal = 0;
        var gstCharges = 0;
    }
  
    return {
      userId : userId,
      pubHandleReady : pubHandle.ready(),
      currentCartData : currentCartData,
      cartItems : cartItems,
      cartTotal : cartTotal,
      gstRate   : gstRate,
      estmateTotal : estmateTotal,
      gstCharges : gstCharges,
    };
  })(Cart);