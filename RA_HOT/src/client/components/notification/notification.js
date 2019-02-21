/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { isNotification,toggleNotifi } = this.props;
        return (
            <Fragment>
                <ul id="notifications-dropdown" className= {isNotification ? "dropdown-content showDropDown" : "dropdown-content" }>
                    <li>
                        <h6>NOTIFICATIONS  <span className="new badge">5</span>
                        </h6>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <a href="#!" className="grey-text text-darken-2">
                            <span className="material-icons icon-bg-circle cyan small">add_shopping_cart</span> A new order has been placed!</a>
                        <time className="media-meta" dateTime="2015-06-12T20:50:48+08:00">2 hours ago</time>
                    </li>
                   
                   
                    
                    
                </ul>
                
            </Fragment>
        );
    }
}


export default (Notification);