import React, { Component, Fragment } from "react";
import { Col, Row } from "react-materialize";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSideNavOpen:false
    };
}
  toggleProfileBtn = () =>{
    debugger;
    this.setState({isSideNavOpen:!this.state.isSideNavOpen});
}
  render() {
    return (
      <Fragment>
           <a onClick={this.toggleProfileBtn} data-activates="slide-out" className="sidebar-collapse btn-floating btn-medium waves-effect waves-light pink accent-2">
            <i className="material-icons">menu</i>
          </a>
          <ul id="slide-out"  className={this.state.isSideNavOpen ? "side-nav leftside-navigation slideOut" :"side-nav leftside-navigation"}>
            <li className="no-padding">
              <ul className="collapsible" data-collapsible="accordion">
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan active">
                    <i className="material-icons">dashboard</i>
                    <span className="nav-text">Dashboard</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li className="active">
                        <a href="index-2.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>eCommerce</span>
                        </a>
                      </li>
                      <li>
                        <a href="dashboard-analytics.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Analytics</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              
               
              </ul>
           
              
            </li>
           
          </ul>
         {this.state.isSideNavOpen ? <div id="sidenav-overlay" onClick={this.toggleProfileBtn}></div> : null} 
    </Fragment>
    );
  }
}
export default SideNav;