import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Strap } from '/imports/api/Strap.js';
import { Accessory } from '/imports/api/Accessory.js';
import Swal from 'sweetalert2';

class AccessoriesBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            strapSize : '',
            selectedId : '',
        }
        this.buyAccessory = this.buyAccessory.bind(this);
        this.setStrapSize = this.setStrapSize.bind(this);
    }


    setStrapSize = (strap, selectedId)=> {
        this.setState({
            strapSize : strap,
            selectedId : selectedId,
        })
    }


    buyAccessory = (accessoryData)=>{
        var userId = Meteor.userId();
        if(userId){
            if(accessoryData.baseType == 'strap'){
                var strapSize = this.state.strapSize;
                if(strapSize){
                    Meteor.call('addToCartSrap', accessoryData, strapSize, (error, result)=>{
                        if(result){
                            Swal({
                                position: 'center',
                                type: 'success',
                                title: 'Strap Added to Cart',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.setState({
                                strapSize : "",
                                selectedId : "",
                            })
                        }
                    });
                } else {
                    Swal({
                        position: 'center',
                        type: 'warning',
                        title: 'Please select Strap Size First',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } else {
                Meteor.call('addToCartAccessory', accessoryData, (error, result)=>{
                    if(result){
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Accessory Added to Cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                });
            }
        }else{
              $("#guitarLogin").modal("show");
        }
    }

    render(){
        return(
            <div className="row accessr-row">
                {
                    this.props.pubHandleReady ?
                        this.props.allAccessories.map((data, index)=>{
                            return(
                                <div key={index} className="col-lg-3 col-md-4 col-sm-12 col-xs-12 accessr-col">
                                    <div className="accessr-box">
                                        <div className="accessr-img">
                                            <img src={data.baseType == "strap" ? "/images/straps/demo1.png" : "/images/accessories/demo1.png"} alt="" className="accessr-imgin"/>
                                        </div>
                                        <div className="accessr-detail">
                                            <div className="accessr-price">Rs {data.baseType == "strap" ? data.strapPrice : data.accessoryPrice}</div>
                                            {
                                                data.baseType == "strap" ?
                                                    <div className="accessr-size pull-right">
                                                        Select Size
                                                        <div title="Small Size" className={this.state.selectedId == data._id && this.state.strapSize == 'Small' ? "accessr-small access-size-selected" : "accessr-small"} onClick={()=>this.setStrapSize('Small', data._id)}>S</div>
                                                        <div title="Medium Size" className={this.state.selectedId == data._id && this.state.strapSize == 'Medium' ? "accessr-med access-size-selected" : "accessr-med"} onClick={()=>this.setStrapSize('Medium', data._id)}>M</div>
                                                        <div title="Large Size" className={this.state.selectedId == data._id && this.state.strapSize == 'Large' ? "accessr-large access-size-selected" : "accessr-large"} onClick={()=>this.setStrapSize('Large', data._id)}>L</div>
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <div className="accessr-text">{data.baseType == "strap" ? data.strapName : data.accessoryName}</div>
                                            <div className="accessr-buy" onClick={()=>this.buyAccessory(data, data._id)}>BUY</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    :
                    null
                }
            </div>   
        );
    }
}

export default withTracker((props)=>{
    var pubHandle1 = Meteor.subscribe('accessorypublish');
    var pubHandle2 = Meteor.subscribe('strappublish');

    var accessoryData = Accessory.find({}).fetch() || [];
    var strapData = Strap.find({}).fetch() || [];
    var allAccessories = [...strapData, ...accessoryData];

    return {
        allAccessories  :   allAccessories,
        pubHandleReady  :   pubHandle1.ready() && pubHandle2.ready(),
    }
})(AccessoriesBox);