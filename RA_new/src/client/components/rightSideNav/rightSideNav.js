
import React, { Component, Fragment } from "react";
import { Col, Row , Tabs,Tab } from "react-materialize";

class RightSideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSideNavOpen: false
        };
    }
   
    render() {
        const {isRightNavOpen, toggleRightNav } = this.props;
        return (
            <Fragment>
              
                <ul id="chat-out" className={isRightNavOpen ? "side-nav rightside-navigation right-aligned right-navout" : "side-nav rightside-navigation right-aligned"}>
                    <li className="li-hover">
                        <div className="row">
                            <div className="col s12 border-bottom-1 mt-5">
                                <ul className="tabs">
                                    <li className="tab col s4">
                                        <a href="#activity" className="active">
                                            <span className="material-icons">graphic_eq</span>
                                        </a>
                                    </li>
                                    <li className="tab col s4">
                                        <a href="#chatapp">
                                            <span className="material-icons">face</span>
                                        </a>
                                    </li>
                                    <li className="tab col s4">
                                        <a href="#settings">
                                            <span className="material-icons">settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div id="settings" className="col s12">
                                <h6 className="mt-5 mb-3 ml-3">GENERAL SETTINGS</h6>
                                <ul className="collection border-none">
                                    <li className="collection-item border-none">
                                        <div className="m-0">
                                            <span className="font-weight-600">Notifications</span>
                                            <div className="switch right">
                                                <label>
                                                    <input checked type="checkbox" />
                                                    <span className="lever"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <p>Use checkboxes when looking for yes or no answers.</p>
                                    </li>
                                </ul>
                            </div>
                            <div id="chatapp" className="col s12">
                                <div className="collection border-none">
                                    <a href="#!" className="collection-item avatar border-none">
                                        <img src="images/avatar/avatar-1.png" alt="" className="circle cyan" />
                                        <span className="line-height-0">Elizabeth Elliott </span>
                                        <span className="medium-small right blue-grey-text text-lighten-3">5.00 AM</span>
                                        <p className="medium-small blue-grey-text text-lighten-3">Thank you </p>
                                    </a>
                                    <a href="#!" className="collection-item avatar border-none">
                                        <img src="images/avatar/avatar-2.png" alt="" className="circle deep-orange accent-2" />
                                        <span className="line-height-0">Mary Adams </span>
                                        <span className="medium-small right blue-grey-text text-lighten-3">4.14 AM</span>
                                        <p className="medium-small blue-grey-text text-lighten-3">Hello Boo </p>
                                    </a>

                                </div>
                            </div>
                            <div id="activity" className="col s12">
                                <h6 className="mt-5 mb-3 ml-3">RECENT ACTIVITY</h6>
                                <div className="activity">
                                    <div className="col s3 mt-2 center-align recent-activity-list-icon">
                                        <i className="material-icons white-text icon-bg-color deep-purple lighten-2">add_shopping_cart</i>
                                    </div>
                                    <div className="col s9 recent-activity-list-text">
                                        <a href="#" className="deep-purple-text medium-small">just now</a>
                                        <p className="mt-0 mb-2 fixed-line-height font-weight-300 medium-small">Jim Doe Purchased new equipments for zonal office.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        </li>              
          </ul>
       
            { isRightNavOpen ? <div id="rightSide-overlay" onClick={toggleRightNav}></div> : null } 
    </Fragment >
    );
    }
}
export default RightSideNav;