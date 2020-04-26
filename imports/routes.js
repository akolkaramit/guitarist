import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Roles } from 'meteor/alanning:roles';

// ******************************** Import Other Component ******************************
import Header from '/imports/web/Common/Header.jsx';
import Footer from '/imports/web/Common/Footer.jsx';
import Homepage from '/imports/web/Homepage/Homepage.jsx';
import AboutUs from '/imports/web/AboutUs/AboutUs.jsx';
import Accessories from '/imports/web/Accessories/Accessories.jsx';
import GuitarDetails from '/imports/web/GuitarDetails/GuitarDetails.jsx';
import Cart from '/imports/web/Cart/Cart.jsx';
import UserOrders from '/imports/web/UserOrders/UserOrders.jsx';

import AdminHeader from '/imports/admin/Common/AdminHeader.jsx';
import AdminFooter from '/imports/admin/Common/AdminFooter.jsx';
import Sidebar from '/imports/admin/Common/Sidebar.jsx';
import Dashboard from '/imports/admin/Dashboard/Dashboard.jsx';
import AddNewGuitar from '/imports/admin/AddNewGuitar/AddNewGuitar.jsx';
import AddAccessories from '/imports/admin/AddAccessories/AddAccessories.jsx';
import AddStrap from '/imports/admin/AddStrap/AddStrap.jsx';
import OrdersList from '/imports/admin/OrdersList/OrdersList.jsx';
import Forbidden from '/imports/web/Common/Forbidden.jsx';


// ******************************* Component To Render Start ****************************
class Website extends React.Component{
    render(){
        return(
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

class AdminWebsite extends React.Component{
  render(){
      return(
          <div>
                <AdminHeader />
                <div className="container admin-wrapper">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                            <Sidebar />
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" >
                            {this.props.children}
                        </div>
                    </div>
                </div>
              <AdminFooter />
          </div>
      );
  }
}


checkPageAuth = ()=>{
    var userId = Meteor.userId();
    // if(!userId){
    //     console.log("Aunuathorised page");
    //     browserHistory.replace("/forbidden");
    // }
}

checkAdminPageAuth = ()=>{
    var userId = Meteor.userId();
    var role = Roles.userIsInRole(userId, 'admin');
    // if(!userId){
    //     browserHistory.replace("/forbidden");
    //     console.log("Aunuathorised ad page");
    // }
}
// ************************************ Add Routes **************************************
Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
        <Route path="/" component={Website}>
            <IndexRoute component = {Homepage} />
            <Route path='/about' component = {AboutUs} />
            <Route path='/accessories' component = {Accessories} />
            <Route path='/guitarDetails/:id' component = {GuitarDetails} />
            <Route path="/cart" component = {Cart} onEnter={this.checkPageAuth()} />
            <Route path="/userOrders" component = {UserOrders}  onEnter={this.checkPageAuth()} />
        </Route>
        {
            var userId = Meteor.userId();
            var role = Roles.userIsInRole(userId, 'admin');

            if(role){
                <Route path='/' component = { AdminWebsite}>
                    <Route path="/dashboard" component = {Dashboard} onEnter={this.checkAdminPageAuth()} />
                    <Route path="/addNewGuitar" component = {AddNewGuitar} onEnter={this.checkAdminPageAuth()} />
                    <Route path="/addNewGuitar/:id" component = {AddNewGuitar} onEnter={this.checkAdminPageAuth()} />
                    <Route path="/addAccessories" component = {AddAccessories} onEnter={this.checkAdminPageAuth()} />
                    <Route path="/addAccessories/:id" component = {AddAccessories} onEnter={this.checkAdminPageAuth()} />
                    <Route path="/addNewStrap" component = {AddStrap} onEnter={this.checkAdminPageAuth()} />
                    <Route path="/addNewStrap/:id" component = {AddStrap} onEnter={this.checkAdminPageAuth()} />
                    <Route path="/adminOrders" component = {OrdersList} onEnter={this.checkAdminPageAuth()} />
                </Route>  
            }
        }
        <Route path="/forbidden" component = {Forbidden} />
        
    </Router>
    , document.getElementById('render-target'));
});
