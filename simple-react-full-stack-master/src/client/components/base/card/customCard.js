import React, { Fragment }from 'react';
import { Col,Card, Badge } from 'react-materialize';
import { Link } from 'react-router-dom';
import './CustomCard.scss';

export default class CustomCard extends React.Component{
    constructor(props){
        super(props);
        this.handleCardClick = this.handleCardClick.bind(this)
    }
    handleCardClick(){
        this.props.actions.ChangeMode('VIEW');
        this.props.actions.selectedOrg(this.props.tenantID);//write logic here to route and access the selected state
    }
    render(){
        //console.log(...this.props.orgList(2));
        return(
            <Col s={12} m={3} l={3} xl={3} className="tenant-class">
                <Card className='white' textClassName='' title={this.props.title}>
                    <span className={this.props.type}><Badge>{this.props.type}</Badge></span>
                    {this.props.newProj ? <Badge className="new-card">New</Badge>: null}
                    <p className=''>Organisation: <span>{this.props.orgList.length}</span></p>
                    <p>Location: <span>{this.props.locList.length}</span></p>
                    <Link to="/viewedit"><h6 className='project-link' onClick={this.handleCardClick}>Enter</h6></Link>
                </Card>
            </Col>
        )
    }
}
