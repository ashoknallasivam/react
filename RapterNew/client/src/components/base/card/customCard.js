import React, { Fragment }from 'react';
import { Col,Card, Badge } from 'react-materialize';
import { Link } from 'react-router-dom';
import './customCard.scss';

export default class CustomCard extends React.Component{
    constructor(props){
        super(props);
    }
    handleCardClick =() => {
        this.props.actions.ChangeMode('VIEW');
        this.props.actions.selectedOrg(this.props.tenantID);//write logic here to route and access the selected state
    }
    handleToClone = () =>{
        console.log()
    }
    handleExport = () => {
        console.log('hetre');
        let temp = this.props.actions.ExportThisProject(this.props.tenantID, this.props.title);
        this.props.exportProjectPause(temp);
    }
    render(){
        //console.log(...this.props.orgList(2));
        return(
            <Col s={12} m={3} l={3} xl={3} className="tenant-class">
                <Link to="/viewedit" onClick={this.handleCardClick}>
                    <Card className='white' textClassName='' title={this.props.title}>
                        {/* <span className={this.props.type}><Badge>{this.props.type}</Badge></span> */}
                        <span className="hamburger" onClick={this.handleExport}></span>
                        {this.props.newProj ? <Badge className="new-card">New</Badge>: null}
                        <p className=''>Organisation: <span>{this.props.orgList.length}</span></p>
                        <p>Location: <span>{this.props.locList.length}</span></p>
                        <div>
                        {/* <Link to="/clone"><h6 className='project-link' onClick={this.handleClone}>Clone</h6></Link> */}
                        </div>
                    </Card>
                </Link>
            </Col>
        )
    }
}
