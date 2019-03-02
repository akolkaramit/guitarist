import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Guitar } from '/imports/api/Guitar.js';
import Carousel from '/imports/web/Homepage/Carousel.jsx';

// var TOUCHED_TO_BOTTOM = false;
// var TOUCHED_HEIGHT = 0;
// $(window).scroll(function() {
//     var totalWindowHeight = $(window).scrollTop() + $(window).height();
//     // var totalDocumentHeight = $(document).height();
//     var totalFooterfromTop = $(".guitar-footer").offset().top;
//     console.log('TOUCHED_TO_BOTTOM: ', TOUCHED_TO_BOTTOM);
//     console.log('TOUCHED_HEIGHT: ', TOUCHED_HEIGHT);
//     if((totalWindowHeight + TOUCHED_HEIGHT) > (totalFooterfromTop)) {
//       TOUCHED_TO_BOTTOM = true;
//       console.log('true: ', "true");
//       TOUCHED_HEIGHT = TOUCHED_HEIGHT + 200;
//     } else{
//       TOUCHED_TO_BOTTOM = false;
//       console.log('false: ', "false");
//     }
//  });


class Homepage extends Component {
  constructor(props){
    super(props);
    this.state = {
      // loadMore  : false,
      // page      : false,
      // skip      : 4,
      searchText:'',
      guitarData:[],
      searchFromProps : true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchMoreGuitars = this.searchMoreGuitars.bind(this);
  }

  searchMoreGuitars(event){
    event.preventDefault()
    var searchText = this.state.searchText;
    var guitarData = Guitar.find(
      {
        $or:[
          {guitarName:{ $regex : new RegExp(searchText, "i") }},
          {guitarBrand:{ $regex : new RegExp(searchText, "i") }},
          {guitarType:{ $regex : new RegExp(searchText, "i") }},
          {guitarInformation:{ $regex : new RegExp(searchText, "i") }},
        ]
      });

      this.setState({
        searchFromProps : false,
        guitarData : guitarData,
      });
  }

  handleChange = (event)=>{
    var name = event.target.name;
    var value = event.target.value;

    this.setState({
      [name] : value,
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 guitar-container">
            <Carousel />
          </div>
          <div className="col-lg-12">
            <form onSubmit={this.searchMoreGuitars}>
              <div className="input-group mb-3 mt-5">
                <input type="text" name="searchText" value={this.state.searchText} onChange={this.handleChange} className="form-control guitar-search" aria-label="Guitar Search" placeholder="Search Guitars Here..." />
                <div className="input-group-append">
                  <span className="input-group-text searchGuitars" onClick={this.searchMoreGuitars}>Search</span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-12">
            <div className="row guitar-container-box">
              {
                this.props.pubHandle ?
                  this.state.searchFromProps ? 
                    this.props.guitarData.map((data, index)=>{
                      return(
                        <div key={index} className="col-lg-3 col-md-4 col-sm-12 col-xs-12 mb-3">
                          <Link to={"/guitarDetails/" + data._id}>
                            <div className="guitar-box">
                              <div className="guitar-img">
                                <img src="/images/guitars/demo1.png" alt="" className="img-responsive"/>
                              </div>
                              <div className="guitar-pricee">
                                <h6 className="guitar-pricee-h6">
                                  Rs. {data.guitarPrice}
                                </h6>
                              </div>
                              <div title={data.status == "unsold" ? "Available for Sell" : "Already Baught"} className={data.status == "unsold" ? "guitarHompageAva" : "guitarHompageNoAva"}></div>
                              <div className="guitar-price">
                                <h6 className="guitar-price-h6">
                                  Rs. {data.guitarPrice}
                                </h6>
                              </div>
                              <div className="guitar-title">
                                <h6 className="guitar-title-h6">
                                  {data.guitarName}
                                </h6>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                    :
                    this.state.guitarData.map((data, index)=>{
                      return(
                        <div key={index} className="col-lg-3 col-md-4 col-sm-12 col-xs-12 mb-3">
                          <Link to={"/guitarDetails/" + data._id}>
                            <div className="guitar-box">
                              <div className="guitar-img">
                                <img src="/images/guitars/demo1.png" alt="" className="img-responsive"/>
                              </div>
                              <div title={data.status == "unsold" ? "Available for Sell" : "Already Baught"} className={data.status == "unsold" ? "guitarHompageAva" : "guitarHompageNoAva"}></div>
                              <div className="guitar-price">
                                <h6 className="guitar-price-h6">
                                  Rs. {data.guitarPrice}
                                </h6>
                              </div>
                              <div className="guitar-title">
                                <h6 className="guitar-title-h6">
                                  {data.guitarName}
                                </h6>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  :
                  <div className="guitar-loader-pre">
                    <div className="guitar-loader"></div>
                  </div>
              }
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default withTracker((props)=>{
  var pubHandle = Meteor.subscribe('guitarpublish');
  var guitarData = Guitar.find({},{sort:{'createdAt':-1}, limit: 20}).fetch() || [];

  return {
      guitarData       : guitarData,
      pubHandle        : pubHandle.ready(),
  }
})(Homepage)