import React, { Component } from 'react';
 
// Task component - represents a single todo item
export default class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small guitar-footer">
        <div className="container">
          <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
            <div className="col-md-8 col-12 mt-5">
              <p className="guitar-footer-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
            </div>
          </div>
          <hr className="clearfix d-md-none rgba-white-light"  />
          <div className="row pb-3">
            <div className="col-md-12">
              <div className="flex-center text-center guitar-footer-icons">
                <a className="fb-ic guitar-footer-icons-a">
                  <i className="fa fa-facebook fa-lg white-text mr-md-4"> </i>
                </a>
                <a className="tw-ic guitar-footer-icons-a">
                  <i className="fa fa-twitter fa-lg white-text mr-md-4"> </i>
                </a>
                <a className="gplus-ic guitar-footer-icons-a">
                  <i className="fa fa-google-plus fa-lg white-text mr-md-4"> </i>
                </a>
                <a className="li-ic guitar-footer-icons-a">
                  <i className="fa fa-linkedin fa-lg white-text mr-md-4"> </i>
                </a>
                <a className="ins-ic guitar-footer-icons-a">
                  <i className="fa fa-instagram fa-lg white-text mr-md-4"> </i>
                </a>
                <a className="pin-ic guitar-footer-icons-a">
                  <i className="fa fa-pinterest fa-lg white-text"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}