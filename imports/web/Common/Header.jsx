import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { UserCart } from '/imports/api/UserCart.js';


class Header extends Component {
  constructor(props){
    super(props);
    var userId = Meteor.userId();
    if(userId){
      var currentId = userId;
    }else{
      var currentId = "";
    }
    this.state = {
      loginState : true,
      userInputName : "",
      userInputEmail : "",
      userInputAddress : "",  
      userInputCity : "", 
      userInputState : "", 
      userInputZip : "", 
      userInputPassword1 : "", 
      userInputPassword2 : "",
      userloginEmail :"",
      userLoginPassward: "",
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  loginUser = (event)=> {
    event.preventDefault();
    var email = this.state.userloginEmail;
    var password = this.state.userLoginPassward;

    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(email.match(pattern) !=null){
      Meteor.loginWithPassword(email, password, (error)=>{
        console.log('error: ', error);
        if(error && error.error == 403){
           Swal({
              position: 'center',
              type: 'warning',
              title: error.reason,
              showConfirmButton: false,
              timer: 1500
            })
        } else {
          this.state = {
            loginState : true,
            userloginEmail :"",
            userLoginPassward: "",
          }
          Swal({
            position: 'center',
            type: 'success',
            title: 'Login Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          $("#guitarLogin").modal("hide");
        }
        
      });
    }else{
      Swal({
        position: 'center',
        type: 'warning',
        title: 'Please Enter Correct Email',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  logoutUser = ()=>{
    Meteor.logout(()=>{
      this.setState({
        loggedIn : "",
      });
      Swal({
          position: 'center',
          type: 'success',
          title: 'Admin Log Out Successfully',
          showConfirmButton: false,
          timer: 1500
      });
    })
  }

  signUpUser = (event)=> {
    event.preventDefault();

    var userName = (this.state.userInputName).trim();
    var userEmail = (this.state.userInputEmail).trim();
    var userAddress = (this.state.userInputAddress).trim(); 
    var userCity = (this.state.userInputCity).trim();
    var userState = (this.state.userInputState).trim();
    var userZip = (this.state.userInputZip).trim();
    var userPassword1 = (this.state.userInputPassword1).trim(); 
    var userPassword2 = (this.state.userInputPassword2).trim();
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(userEmail.match(pattern) !=null && userPassword1 == userPassword2 && userName && userEmail && userAddress && userCity && userState && userZip && userPassword1 && userPassword2){
      Accounts.createUser({
        username: userEmail,
        email:    userEmail,
        password: userPassword1,
        profile: {
          name: userName,
          address: userAddress,
          city: userCity,
          state: userState,
          zip: userZip
        }
      }, (error, result)=> {
        if (error) {
          console.log("Cannot create user");
        }
        if(result){
         
          // var userId = Meteor.userId();
          Meteor.call("addGuitarUserRole", (error, result)=>{
            if(result){
              Swal({
                position: 'center',
                type: 'success',
                title: 'Account Created Successfully.',
                showConfirmButton: false,
                timer: 1500
              });
              this.setState({
                loginState : true,
                userInputName : "",
                userInputEmail : "",
                userInputAddress : "",  
                userInputCity : "", 
                userInputState : "", 
                userInputZip : "", 
                userInputPassword1 : "", 
                userInputPassword2 : "",
              });
              $("#guitarLogin").modal("hide");
            }
          });
        }
      });
    }else{
      if(!userName && !userEmail && !userAddress && !userCity && !userState && !userZip && !userPassword1 && !userPassword2){
        Swal({
          position: 'center',
          type: 'warning',
          title: 'Please Fill all fields',
          showConfirmButton: false,
          timer: 1500
        })
      } else if(userEmail.match(pattern) == null){
        Swal({
          position: 'center',
          type: 'warning',
          title: 'Please Enter Valid Email Address',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal({
          position: 'center',
          type: 'warning',
          title: 'Passward and Confirm Passward not Matching',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }



  render() {
    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">
              <img src="/images/logo.png" className="guitar-nav" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link activeClassName="activeGuitarLink" className="nav-link activeGuitarLinkCom" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="activeGuitarLink" className="nav-link activeGuitarLinkCom" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link activeClassName="activeGuitarLink" className="nav-link activeGuitarLinkCom" to="/accessories">Accessories</Link>
                </li>
                {/* <li className="nav-item">
                  <Link  activeClassName="activeGuitarLink" className="nav-link activeGuitarLinkCom" to="/guitarDetails">Accessories Details</Link>
                </li> */}
                <li className="nav-item">
                  <Link activeClassName="activeGuitarLink" className="nav-link activeGuitarLinkCom" to="/userOrders">Your Orders</Link>
                </li>
              </ul>
              {
                this.props.userId ?
                  <Link to="/cart" className="navbar-text guitar-header-cart">
                    Cart <span className="guitar-cart-count" >{this.props.currentCartCount}</span>
                  </Link>
                  :
                  null
              }

              {
                this.props.adminRole ?
                  <Link to="/dashboard" className="navbar-text guitar-header-cart">
                    Dashboard
                  </Link>
                  :
                  null
              }

              {
                this.props.userId ?
                  <span className="navbar-text guitar-login" onClick={this.logoutUser.bind(this)}>
                    Logout
                  </span>
                  :
                  <span className="navbar-text guitar-login" data-toggle="modal" data-target="#guitarLogin">
                    Login
                  </span>
              }
              
            </div>
          </nav>

          <div className="modal fade" id="guitarLogin" role="dialog" aria-labelledby="guitarLoginLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="">GuitaRist {this.state.loginState ? "Login"  : "SignUp"}</div>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="loginClass">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* ============ Login Form ================== */}
                        {
                          this.state.loginState ?
                            <form  onSubmit={this.loginUser.bind(this)} noValidate>
                              <div className="form-group">
                                <label>Email</label>
                                <input onChange={this.handleChange.bind(this)} name="userloginEmail" value={this.state.userloginEmail} type="email" className="form-control" id="userLoginEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                              </div>
                              <div className="form-group">
                                <label>Password</label>
                                <input onChange={this.handleChange.bind(this)} name="userLoginPassward" value={this.state.userLoginPassward} type="password" className="form-control" id="userLoginPassword1" placeholder="Password" />
                              </div>
                              <div className="loginSignUp">
                                <button type="submit" className="btn btn-primary d-inline-block pull-left pl-5 pr-5">Login</button>
                                <a href="#" className="d-inline-block pull-right userSignUp btn" onClick={()=>this.setState({loginState : false})}>Sign Up Here</a>
                              </div>
                            </form>
                            :
                            <form onSubmit={this.signUpUser.bind(this)} noValidate>
                            
                              <div className="form-group">
                                <label>Name</label>
                                <input onChange={this.handleChange.bind(this)} type="text" className="form-control" name="userInputName" value={this.state.userInputName} id="inputName" placeholder="Name" />
                              </div>

                              <div className="form-group">
                                <label>Email</label>
                                <input onChange={this.handleChange.bind(this)} type="email" className="form-control" name="userInputEmail" value={this.state.userInputEmail} id="inputEmail" placeholder="Email" />
                              </div>

                              <div className="form-group">
                                <label>Address</label>
                                <input type="text" onChange={this.handleChange.bind(this)} className="form-control" name="userInputAddress" value={this.state.userInputAddress} id="inputAddress" placeholder="Address" />
                              </div>

                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  <label>City</label>
                                  <input type="text" onChange={this.handleChange.bind(this)} className="form-control" name="userInputCity" value={this.state.userInputCity} id="inputCity" />
                                </div>
                                <div className="form-group col-md-4">
                                  <label>State</label>
                                  <input type="text" onChange={this.handleChange.bind(this)} className="form-control" name="userInputState" value={this.state.userInputState} id="inputState" />
                                </div>
                                <div className="form-group col-md-2">
                                  <label>Zip</label>
                                  <input type="text" onChange={this.handleChange.bind(this)} className="form-control" name="userInputZip" value={this.state.userInputZip} id="inputZip" />
                                </div>
                              </div>
                              <div className="form-group">
                                <label>Password</label>
                                <input type="password" onChange={this.handleChange.bind(this)} className="form-control" name="userInputPassword1" value={this.state.userInputPassword1} id="inputPassword1" placeholder="Password" />
                              </div>
                              <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" onChange={this.handleChange.bind(this)} className="form-control" name="userInputPassword2" value={this.state.userInputPassword2} id="inputPassword2" placeholder="Confirm Password" />
                              </div>
                              <div className="loginSignUp">
                                <button type="submit" className="btn btn-primary d-inline-block pull-left pl-5 pr-5">Sign Up</button>
                                <a href="#" className="d-inline-block pull-right userLogin btn" onClick={()=>this.setState({loginState : true})}>Login Here</a>
                              </div>
                            </form>
                        }

                      </div>
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

export default withTracker(() => {
  var pubHandle = Meteor.subscribe('cartpublish');
  const userId = Meteor.userId();
  var role = Roles.userIsInRole(userId, 'admin');
  var currentCartCount = UserCart.find({"userId":userId}).count();

  return {
    userId : userId,
    adminRole : role,
    currentCartCount : currentCartCount,
  };
})(Header);
