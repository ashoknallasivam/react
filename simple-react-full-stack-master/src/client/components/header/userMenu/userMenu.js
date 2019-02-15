/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

class UserMenu extends Component {
	
    constructor(props) {
		super(props);
        this.state = {  };
    }
    render() {
		
        const { isprofileDropDown ,toggleProfile } = this.props;
		
		
			return (
				<Fragment>
					<ul id="profile-dropdown" className= {isprofileDropDown ? "dropdown-content showDropDown" : "dropdown-content" }>
						<li>
							<a href="#" className="grey-text text-darken-1">
								<i className="material-icons">face</i> Profile</a>
						</li>
						<li>
							<a href="#" className="grey-text text-darken-1">
								<i className="material-icons">settings</i> Settings</a>
						</li>
						<li>
							<a href="#" className="grey-text text-darken-1">
								<i className="material-icons">live_help</i> Help</a>
						</li>
						<li className="divider"></li>
						
						<li>
						  <Link to="/signout" className="grey-text text-darken-1">
							<i className="material-icons">keyboard_tab</i> Logout
						  </Link>
						</li>
					</ul>
					
				</Fragment>
			);
		
    }
}


export default (UserMenu);