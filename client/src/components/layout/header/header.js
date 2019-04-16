import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Col, Button } from 'react-materialize';
import logo from "../../../../public/assets/images/logo/materialize-logo.png";
import profileImg from "../../../../public/assets/images/logo/materialize-logo.png";
import './header.scss';
import UserMenu from "../userMenu";
import { Link } from 'react-router-dom';
import { format } from "util";
import axios from "axios";

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
    handleImport = (e) => {
        this.refs.fileUpload.click();
    }
	handleClick= (e) =>{
    }
    onChangFile =(e) =>{
        e.stopPropagation();
        e.preventDefault();
        let file = e.target.files[0];
        this.setState({file});
        let form = new FormData();
        form.append('json',file)
        axios({
            url : '/',
            method:'POST',
            headers:{
                authorization : "token"
            },
            data: form
        })
        console.log(file)
    }
    render() {
        var homeLink = '';
        var createLink = '';
        var importButton = '';
        var profileButton = '';
        var userMenu = '';

        if (this.props.tokenStatus == true) {
            homeLink = <Link to={"/dashboard"} onClick={this.handleClick} name="VIEW">{"Home"}</Link>;
            createLink = <Link to={"/createProject"} onClick={this.handleClick} className="pl-2" name="CREATE">{"Create"}</Link>;
            importButton = <Button  onClick={this.handleImport} className=" imporButton">{"Import project(s)"}
            <input type="file" className="hide" ref="fileUpload" onChange={this.onChangFile} accept=".json" ></input>
            </Button>;
            profileButton = <ul className="right hide-on-med-and-down">
                <li>
                    <a onClick={this.toggleProfileDropDown} className="waves-block profile-button" data-activates="profile-dropdown">
                        <span className="avatar-status avatar-online">
                            <img src={profileImg} alt="avatar" />
                        </span>
                    </a>
                </li>
            </ul>;
            userMenu = <UserMenu isprofileDropDown={this.state.isdropDownOpen} toggleProfileDropDown={this.toggleProfileDropDown} />
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

