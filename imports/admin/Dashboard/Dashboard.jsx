import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dashboardData : {
                userCount         : 0,
                totalBuyings      : 0,
                totalSell         : 0,
                accessoryCount    : 0,
                guitarCount       : 0,
                strapCount        : 0,
                ordersCount       : 0
            },
        }
    }

    componentWillMount(){
        Meteor.call('adminDashboardData', (error, result)=>{
            if(result){
                this.setState({
                    dashboardData : result
                })
            }
        });
    }

    render(){
        return(
            <div className="guitar-dashboard">
                <div className="card">
                    <h5 className="card-header dashboard-header">Dashboard</h5>
                    <div className="card-body">
                        <div className="row">
                            
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header text-center">Users</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title text-center">{this.state.dashboardData.userCount}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header text-center">Total Orders</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title text-center">{this.state.dashboardData.ordersCount}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header text-center">BUY (Rs)</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title text-center">{this.state.dashboardData.totalBuyings}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header text-center">Sell (Rs)</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title text-center">{this.state.dashboardData.totalSell}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header text-center">Guitars</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title text-center">{this.state.dashboardData.guitarCount}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header text-center">Straps</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title text-center">{this.state.dashboardData.strapCount}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header text-center">Accessories</div>
                                    <div className="card-body text-primary">
                                        <h5 className="card-title text-center">{this.state.dashboardData.accessoryCount}</h5>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker((props)=>{
   

    return {
        
    }
})(Dashboard);