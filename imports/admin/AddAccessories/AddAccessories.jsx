import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { withTracker } from 'meteor/react-meteor-data';
import { Accessory } from '/imports/api/Accessory.js';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import moment from 'moment';

class AddAccessories extends Component {
    constructor(props){
        super(props);

        this.state = {
            accessoryName : '',
            accessoryType : '--Select--',
            accessoryPrice : '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitAccessory = this.submitAccessory.bind(this);
        this.deleteAccessory = this.deleteAccessory.bind(this);
    }

    componentWillReceiveProps(nextProps){
        var data = nextProps.updateAccessoryData;
        if(data){
            this.setState({
                accessoryName : data.accessoryName,
                accessoryType : data.accessoryType,
                accessoryPrice : data.accessoryPrice,
            });
            $('#accessName').focus();
        }
    }

    handleChange = (event)=> {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value,
        })
    }

    submitAccessory = (event)=>{
        event.preventDefault();
        var accessoryName = this.state.accessoryName;
        var accessoryType = this.state.accessoryType;
        var accessoryPrice = this.state.accessoryPrice;

        if(accessoryName && accessoryType && accessoryPrice && accessoryType != '--Select--'){
            if(this.props.accessoryId){    
                Meteor.call('updateAccessory', this.props.accessoryId, accessoryName, accessoryType, accessoryPrice, (error, result)=>{
                    if(result){
                        this.setState({
                            accessoryName : '',
                            accessoryType : '--Select--',
                            accessoryPrice : '',
                        })
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Accessory Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        browserHistory.replace("/addAccessories");
                    }
                })
            } else {
                Meteor.call('addNewAccessory', accessoryName, accessoryType, accessoryPrice, (error, result)=>{
                    if(result){
                        this.setState({
                            accessoryName : '',
                            accessoryType : '--Select--',
                            accessoryPrice : '',
                        })
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Accessory Added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
            }
        }else{
            Swal({
                position: 'center',
                type: 'warning',
                title: 'Please Fill all fields',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    cancelAccessory = ()=> {
        this.setState({
            accessoryName : '',
            accessoryType : '--Select--',
            accessoryPrice : '',
        });
        browserHistory.replace("/addAccessories");
    }

    deleteAccessory = (id)=>{
        Swal({
            title: 'Are you sure?',
            text: "You want to delete this",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if(result.value){
                 Meteor.call('deteteAccessory', id, (error, success)=>{
                    if(success){
                        Swal(
                            '',
                            'Accessory Deleted Successfully.',
                            'success'
                        )
                    }
                })
            }

           
        })
    }

    render(){
        return(
            <div className="guitar-dashboard">
                <div className="card">
                    <h5 className="card-header addNewAccess-header">{ this.props.accessoryId ? "Update Accessory" : "Add New Accessories"}</h5>
                    <div className="card-body">
                        <form onSubmit={this.submitAccessory}>
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="accessName">Accessory Name</label>
                                        <input onChange={this.handleChange} type="text" className="form-control" name="accessoryName" value={this.state.accessoryName} id="accessName" placeholder="Guitar Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="accessType">Accessory Type</label>
                                        <select onChange={this.handleChange} className="form-control" name="accessoryType" value={this.state.accessoryType} id="accessType">
                                            <option>--Select--</option>
                                            <option>Wooden</option>
                                            <option>Plastic</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="accessPrice">Accessory Price</label>
                                        <input onChange={this.handleChange} type="number" className="form-control" name="accessoryPrice" value={this.state.accessoryPrice} id="accessPrice" placeholder="Price" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-success" value={this.props.accessoryId ? "Update Accessory" : "Add New Accessory"} />
                                        <div onClick={this.cancelAccessory} className="btn btn-danger ml-3 addNewAccessCancel">Cancel</div>
                                    </div>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>

                 <div className="card mt-3">
                    <h5 className="card-header addNewGuitar-header">List of Accessories</h5>
                    <div className="card-body">
                        <div className="guitar-u-orders">
                            {
                                this.props.accessoryData && this.props.accessoryData.length > 0 ?
                                    <table className="table table-responsive-sm table-responsive-xs table-striped table-hover">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Price(Rs.)</th>
                                                <th scope="col">Added On</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.accessoryData.map((data, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td scope="row">{index + 1}</td>
                                                            <td>{data.accessoryName}</td>
                                                            <td>{data.accessoryType}</td>
                                                            <td>{data.accessoryPrice}</td>
                                                            <td>{moment(data.createdAt).fromNow()}</td>
                                                            <td className="text-center">
                                                                {
                                                                    this.props.accessoryId ? 
                                                                        null
                                                                        :
                                                                        <div>
                                                                            <Link to={'/addAccessories/'+data._id} className="guitar-ac-btn btn btn-success mr-3 edit-accessory"> Edit </Link>
                                                                            <div onClick={()=>this.deleteAccessory(data._id)} className="guitar-ac-btn btn btn-danger">Delete</div>
                                                                        </div>
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            } 
                                        </tbody>
                                    </table>
                                :
                                    <div className="jumbotron text-center">
                                        No Accessories Added Yet
                                    </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTracker((props)=>{
    var id = props.params.id;
    var pubHandle = Meteor.subscribe('accessorypublish');
    var accessoryData = Accessory.find({},{sort:{'createdAt':-1}}).fetch() || [];
    var updateAccessoryData = Accessory.findOne({"_id":id});

    return {
        accessoryData       : accessoryData,
        updateAccessoryData : updateAccessoryData,
        pubHandle           : pubHandle.ready(),
        accessoryId         : id,
    }
})(AddAccessories);