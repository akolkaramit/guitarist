import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { withTracker } from 'meteor/react-meteor-data';
import { Guitar } from '/imports/api/Guitar.js';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import moment from 'moment';

class AddNewGuitar extends Component {
    constructor(props){
        super(props);
        this.state = {
            guitarName          : '',
            guitarBrand         : '',
            guitarSerialNumber  : '',
            guitarType          : '--Select--',
            guitarNoOfStrings   : '--Select--',
            guitarPrice         : '',
            guitarInformation   : '',
            guitarStatus        : 'unsold',
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitGuitar = this.submitGuitar.bind(this);
        this.deleteGuitar = this.deleteGuitar.bind(this);
    }

    componentWillReceiveProps(nextProps){
        var data = nextProps.updateGuitarData;
        if(data){
            this.setState({
                guitarName          : data.guitarName,
                guitarBrand         : data.guitarBrand,
                guitarSerialNumber  : data.guitarSerialNumber,
                guitarType          : data.guitarType,
                guitarNoOfStrings   : data.guitarNoOfStrings,
                guitarPrice         : data.guitarPrice,
                guitarInformation   : data.guitarInformation,
                guitarStatus        : data.status,
            });
            $('#guitarName').focus();
        }
    }

    handleChange = (event)=> {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]  :   value,
        });
    }

    submitGuitar = (event)=> {
        event.preventDefault();
        var guitarName = this.state.guitarName;
        var guitarBrand = this.state.guitarBrand;
        var guitarSerialNumber = this.state.guitarSerialNumber;
        var guitarType = this.state.guitarType;
        var guitarNoOfStrings = this.state.guitarNoOfStrings;
        var guitarPrice = this.state.guitarPrice;
        var guitarInformation = this.state.guitarInformation;
        
        if(guitarName && guitarBrand && guitarSerialNumber && guitarType && guitarNoOfStrings && guitarPrice && guitarInformation && guitarType != '--Select' && guitarNoOfStrings != '--Select--'){
            if(this.props.guitarId){
                Meteor.call('updateGuitar', this.props.guitarId, guitarName, guitarBrand, guitarSerialNumber, guitarType, guitarNoOfStrings, guitarPrice, guitarInformation, (error, result)=>{
                    if(result){
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Guitar Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.setState({
                            guitarName          : '',
                            guitarBrand         : '',
                            guitarSerialNumber  : '',
                            guitarType          : '--Select--',
                            guitarNoOfStrings   : '--Select--',
                            guitarPrice         : '',
                            guitarInformation   : '',
                        });
                        browserHistory.replace("/addNewGuitar");
                    }
                })
            } else {
                Meteor.call('addNewGuitar', guitarName, guitarBrand, guitarSerialNumber, guitarType, guitarNoOfStrings, guitarPrice, guitarInformation, (error, result)=>{
                    if(result){
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Guitar Added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.setState({
                            guitarName          : '',
                            guitarBrand         : '',
                            guitarSerialNumber  : '',
                            guitarType          : '--Select--',
                            guitarNoOfStrings   : '--Select--',
                            guitarPrice         : '',
                            guitarInformation   : '',
                        });
                        browserHistory.replace("/addNewGuitar");
                    }
                })
            }
        } else {
            Swal({
                position: 'center',
                type: 'warning',
                title: 'Please Fill all fields',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    cancelGuitar = ()=> {
        this.setState({
            guitarName          : '',
            guitarBrand         : '',
            guitarSerialNumber  : '',
            guitarType          : '--Select--',
            guitarNoOfStrings   : '--Select--',
            guitarPrice         : '',
            guitarInformation   : '',
        });
        browserHistory.replace("/addNewGuitar");
    }

    deleteGuitar = (id)=>{
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
                    Meteor.call('deteteGuitar', id, (error, success)=>{
                        if(success){
                            Swal(
                                '',
                                'Guitar Deleted Successfully.',
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
                    <h5 className="card-header addNewGuitar-header">{this.props.guitarId ? "Update Guitar" : "Add New Guitar"}</h5>
                    <div className="card-body">
                        <form onSubmit={this.submitGuitar}>
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="guitarName">Guitar Name</label>
                                        <input type="text" className="form-control" id="guitarName" value={this.state.guitarName} name="guitarName" onChange={this.handleChange} placeholder="Guitar Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="guitarBrand">Guitar Brand</label>
                                        <input type="text" className="form-control" id="guitarBrand" value={this.state.guitarBrand} name="guitarBrand" onChange={this.handleChange} placeholder="Guitar Brand" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="guitarSerialNumber">Guitar Serial Number</label>
                                        <input type="text" className="form-control" id="guitarSerialNumber" value={this.state.guitarSerialNumber} name="guitarSerialNumber" onChange={this.handleChange} placeholder="Guitar Serial Number" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="guitarType">Guitar Type</label>
                                        <select className="form-control" id="guitarType" value={this.state.guitarType} name="guitarType" onChange={this.handleChange}>
                                            <option>--Select--</option>
                                            <option>Acoustic</option>
                                            <option>Electric</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="guitarNoOfStrings">Number of Strings</label>
                                        <select className="form-control" id="guitarNoOfStrings" value={this.state.guitarNoOfStrings} name="guitarNoOfStrings" onChange={this.handleChange}>
                                            <option>--Select--</option>
                                            <option>4</option>
                                            <option>6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="guitarPrice">Price</label>
                                        <input disabled={this.state.guitarStatus == "sold" ? true : false} type="number" className="form-control" id="guitarPrice" value={this.state.guitarPrice} name="guitarPrice" onChange={this.handleChange} placeholder="Price" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="guitarInformation">Guitar Information</label>
                                        <textarea className="form-control" id="guitarInformation" value={this.state.guitarInformation} name="guitarInformation" onChange={this.handleChange} rows="3" placeholder="Guitar Information"></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-success" value={this.props.guitarId ? "Update Guitar" : "Add New Guitar"} />
                                        <div onClick={this.cancelGuitar} className="btn btn-danger ml-3 addNewAccessCancel">Cancel</div>
                                    </div>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>

                 <div className="card mt-5">
                    <h5 className="card-header addNewGuitar-header">List of Guitars</h5>
                    <div className="card-body">
                        <div className="guitar-u-orders container">
                            {
                                this.props.guitarData && this.props.guitarData.length > 0 ?
                                    <table className="table table-responsive-sm table-responsive table-striped table-hover">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Brand</th>
                                                <th scope="col">Serial Number</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Strings</th>
                                                <th scope="col">Price(Rs.)</th>
                                                <th scope="col">Added On</th>
                                                <th scope="col">Sold On</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.guitarData.map((data, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td scope="row">{index + 1}</td>
                                                            <td>{data.guitarName}</td>
                                                            <td>{data.guitarBrand}</td>
                                                            <td>{data.guitarSerialNumber}</td>
                                                            <td>{data.guitarType}</td>
                                                            <td>{data.guitarNoOfStrings}</td>
                                                            <td>{data.guitarPrice}</td>
                                                            <td>{moment(data.createdAt).fromNow()}</td>
                                                            <td>{data.soldOn ? moment(data.soldOn).fromNow() : null}</td>
                                                            <td className="text-center">
                                                                {
                                                                    this.props.guitarId ? 
                                                                        null
                                                                        :
                                                                        <div>
                                                                            <Link to={'/addNewGuitar/'+data._id} className="guitar-ac-btn btn btn-success mr-3 d-inline-block edit-guitar">Edit</Link>
                                                                            <div onClick={()=>this.deleteGuitar(data._id)} className="guitar-ac-btn btn btn-danger d-inline-block">Delete</div>
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
                                        No Guitar Added Yet
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
    var pubHandle = Meteor.subscribe('guitarpublish');
    var guitarData = Guitar.find({},{sort:{'createdAt':-1}}).fetch() || [];
    var updateGuitarData = Guitar.findOne({"_id":id});

    return {
        guitarData       : guitarData,
        updateGuitarData : updateGuitarData,
        pubHandle        : pubHandle.ready(),
        guitarId         : id,
    }
})(AddNewGuitar);