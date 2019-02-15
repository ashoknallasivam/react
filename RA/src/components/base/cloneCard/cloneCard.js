import React, { Fragment }from 'react';
import { Col,Card, Badge } from 'react-materialize';
import { Link } from 'react-router-dom';
import './CustomCard.scss';

export default class cloneCard extends React.Component{
    constructor(props){
        super(props);
        this.handleCardClick = this.handleCardClick.bind(this)
    }
    handleCardClick(){
    }
    render(){
        //console.log(...this.props.orgList(2));
        return(
            <Col s={12} m={3} l={3} xl={3} className="tenant-class">
                <Card className='white' textClassName='' title={this.props.title}>
                    <span className="bold"><Badge>Imported</Badge></span>
                    <p className=''>Organisation: <span>{this.props.orgLength}</span></p>
                    <p>Location: <span>{this.props.locLength}</span></p>
                    <Link to="/viewedit"><h6 className='project-link'>Edit and Publish</h6></Link>
                </Card>
            </Col>
        )
    }
}
