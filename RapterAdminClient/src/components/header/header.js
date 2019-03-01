import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Col, Button } from 'react-materialize';
import logo from "../../../public/assets/images/logo/materialize-logo.png";
import profileImg from "../../../public/assets/images/avatar/avatar-7.png";
import Home from "./brand/index";
import './header.scss';
import Headersearch from "./headerSearch";
import CustomCreateButton from "./custom_create_btn";
import UserMenu from "./userMenu";
import Notification from "../notification";

const HeaderMenu = (props) => {
    return (
	  
        <ul className="right hide-on-med-and-down">
 
            <li>
                <a href="javascript:void(0);" onClick={props.toggleProfile} className="waves-effect waves-block waves-light profile-button" data-activates="profile-dropdown">
                    <span className="avatar-status avatar-online">
                        <img src={props.profileImg} alt="avatar" />
                        <i></i>
                    </span>
                </a>
            </li>
           
        </ul>
	  
    );
	
}
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNotificationOpen: false,
            isdropDownOpen: false
        };
    }

    toggleNotification = () => {
       
        this.setState({ isNotificationOpen: !this.state.isNotificationOpen });
    }
    toggleProfileDropDown = () => {
       
        this.setState({ isdropDownOpen: !this.state.isdropDownOpen });
    }
    handleImport = () => {
        this.props.actions.ImportAlltheProjects();
    }
	
   render() {
	     
	    const { toggleRightNav } = this.props;
		 return (
            <Fragment>

			{this.props.tokenStatus == true ?
                    <header id="header" className="page-topbar">
                        <Col className="navbar-fixed">
                            <nav className="navbar-color">
                                <Col className="nav-wrapper">
                                    <span className="header-nav">
                                        <Home brand={logo}/>
                                        <CustomCreateButton actionProps={this.props.actions.ChangeMode} actionProps2={this.props.actions.clearOrg} applicationMode={"VIEW"} link={"dashboard"} navName={"Home"}/>
                                        <CustomCreateButton actionProps={this.props.actions.ChangeMode} actionProps2={this.props.actions.clearOrg} applicationMode={"CREATE"} link={"createProject"} navName={"Create"}/>
                                        <Button onClick={this.handleImport}>Import project(s)</Button>
                                    </span>
                                    <HeaderMenu profileImg={profileImg} toggleNotifi={this.toggleNotification} toggleProfile={this.toggleProfileDropDown} toggleRightNav={toggleRightNav} />
                                    <UserMenu isprofileDropDown={this.state.isdropDownOpen}  />
                                
                                </Col>
                            </nav>
                        </Col>
                    </header>
			: null  }

                {this.state.isNotificationOpen ? <Col id="overlay" onClick={this.toggleNotification}></Col> : this.state.isdropDownOpen ? <Col id="overlay" onClick={this.toggleProfileDropDown}></Col> : null} 
            </Fragment>
        );
    }
}

Header.propTypes = {
};
Header.defaultProps = {

};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps)(Header);

