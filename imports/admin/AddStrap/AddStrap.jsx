import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { withTracker } from 'meteor/react-meteor-data';
import { Strap } from '/imports/api/Strap.js';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import moment from 'moment';

class AddStrap extends Component {
    constructor(props){
        super(props);

        this.state = {
            strapName : '',
            strapPrice : '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitStrap = this.submitStrap.bind(this);
        this.deleteStrap = this.deleteStrap.bind(this);
    }

    componentWillReceiveProps(nextProps){
        var data = nextProps.updateStrapData;
        if(data){
            this.setState({
                strapName : data.strapName,
                strapPrice : data.strapPrice,
            });
            $('#strapName').focus();
        }
    }

    handleChange = (event)=> {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value,
        })
    }

    submitStrap = (event)=>{
        event.preventDefault();
        var strapName = this.state.strapName;
        var strapPrice = this.state.strapPrice;

        if(strapName && strapPrice){
            if(this.props.strapId){    
                Meteor.call('updateStrap', this.props.strapId, strapName, strapPrice, (error, result)=>{
                    if(result){
                        this.setState({
                            strapName : '',
                            strapPrice : '',
                        })
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Strap Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        browserHistory.replace("/addNewStrap");
                    }
                })
            } else {
                Meteor.call('addNewStrap', strapName, strapPrice, (error, result)=>{
                    if(result){
                        this.setState({
                            strapName : '',
                            strapPrice : '',
                        })
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Strap Added Successfully',
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

    cancelStrap = ()=> {
        this.setState({
            strapName : '',
            strapPrice : '',
        });
        browserHistory.replace("/addNewStrap");
    }

    deleteStrap = (id)=>{
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
                 Meteor.call('deteteStrap', id, (error, success)=>{
                    if(success){
                        Swal(
                            '',
                            'Strap Deleted Successfully.',
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
                    <h5 className="card-header addNewAccess-header">{ this.props.strapId ? "Update Strap" : "Add New Strap"}</h5>
                    <div className="card-body">
                        <form onSubmit={this.submitStrap}>
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="strapName">Strap Name</label>
                                        <input onChange={this.handleChange} type="text" className="form-control" name="strapName" value={this.state.strapName} id="strapName" placeholder="Guitar Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="strapPrice">Strap Price</label>
                                        <input onChange={this.handleChange} type="number" className="form-control" name="strapPrice" value={this.state.strapPrice} id="accessPrice" placeholder="Price" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-success" value={this.props.strapId ? "Update Strap" : "Add New Strap"} />
                                        <div onClick={this.cancelStrap} className="btn btn-danger ml-3 addNewAccessCancel">Cancel</div>
                                    </div>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>

                 <div className="card mt-3">
                    <h5 className="card-header addNewGuitar-header">List of Strap</h5>
                    <div className="card-body">
                        <div className="guitar-u-orders">
                            {
                                this.props.strapData && this.props.strapData.length > 0 ?
                                    <table className="table table-responsive-sm table-responsive-xs table-striped table-hover">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price(Rs.)</th>
                                                <th scope="col">Added On</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.strapData.map((data, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td scope="row">{index + 1}</td>
                                                            <td>{data.strapName}</td>
                                                            <td>{data.strapPrice}</td>
                                                            <td>{moment(data.createdAt).fromNow()}</td>
                                                            <td className="text-center">
                                                                {
                                                                    this.props.strapId ? 
                                                                        null
                                                                        :
                                                                        <div>
                                                                            <Link to={'/addNewStrap/'+data._id} className="guitar-ac-btn btn btn-success mr-3 edit-accessory"> Edit </Link>
                                                                            <div onClick={()=>this.deleteStrap(data._id)} className="guitar-ac-btn btn btn-danger">Delete</div>
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
                                        No Straps Added Yet
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
    var pubHandle = Meteor.subscribe('strappublish');
    var strapData = Strap.find({},{sort:{'createdAt':-1}}).fetch() || [];
    var updateStrapData = Strap.findOne({"_id":id});

    return {
        strapData           : strapData,
        updateStrapData     : updateStrapData,
        pubHandle           : pubHandle.ready(),
        strapId             : id,
    }
})(AddStrap);