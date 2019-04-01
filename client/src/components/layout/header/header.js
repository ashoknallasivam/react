import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Col, Button } from 'react-materialize';
import logo from "../../../../public/assets/images/logo/materialize-logo.png";
import profileImg from "../../../../public/assets/images/logo/materialize-logo.png";
import './header.scss';
import UserMenu from "../userMenu";
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isdropDownOpen: false
        };
    }

    toggleProfileDropDown = () => {
        this.setState({ isdropDownOpen: !this.state.isdropDownOpen });
    }
    handleImport = () => {
        this.props.actions.ImportAlltheProjects();
    }
    handleClick= (e) =>{
        this.props.actions.ChangeMode(e.target.name);
    }
    render() {
		var homeLink = '';
		var createLink = '';
		var importButton = '';
		var profileButton = '';
		var userMenu = '';
		
		if (this.props.tokenStatus == true)
		{
			homeLink =  <Link to={"/dashboard"} onClick={this.handleClick} name="VIEW">{"Home"}</Link> ;
			createLink =  <Link to={"/createProject"} onClick={this.handleClick} name="CREATE">{"Create"}</Link> ;
			importButton = <Button onClick={this.handleImport}>Import project(s)</Button>;
			profileButton = <ul className="right hide-on-med-and-down">
								<li>
									<a onClick={this.toggleProfileDropDown} className="waves-effect waves-block waves-light profile-button" data-activates="profile-dropdown">
										<span className="avatar-status avatar-online">
											<img src={profileImg} alt="avatar" />
										</span>
									</a>
								</li>
							</ul>;
		userMenu = <UserMenu isprofileDropDown={this.state.isdropDownOpen}/>;					
							
		}
		
        return (
            <Fragment>
                   <header id="header" className="page-topbar">
                        <Col className="navbar-fixed">
                            <nav className="navbar-color">
                                <Col className="nav-wrapper">
                                    <span className="header-nav">
                                        <Link to="/dashboard" className="mpr-logo">
                                            <img src={logo} alt="logo" />
                                        </Link>
									    {homeLink}{createLink}{importButton}
                                    </span>
									{profileButton} {userMenu}
                                </Col>
                            </nav>
                        </Col>
                    </header>
                  

            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps)(Header);

