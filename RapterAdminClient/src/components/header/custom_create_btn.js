import React, { Component, Fragment } from "react";
import { Col, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
//import AddIcon from '../../../public/project_assets/icons/addbtn.png';


export default class CustomCreateButton extends React.Component {
    constructor(props){
        super(props);
    }
    // handleCreateClick = () =>{
    //     this.props.actionProps("CREATE");
    // }
    handleClick = () => {
        this.props.actionProps(this.props.applicationMode);
        this.props.actionProps2()
    }
    render(){
        return(
            <Fragment>
                <Link to={this.props.link} onClick={this.handleClick}>{this.props.navName}</Link>
            </Fragment>
        )
    }
}