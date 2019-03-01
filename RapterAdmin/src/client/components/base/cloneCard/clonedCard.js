import React, { Fragment } from 'react';
import { Col, Card, Badge } from 'react-materialize';
import { Link } from 'react-router-dom';

    export default class ClonedCard extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                tenantName: '',
            }
        }
        // handlePublish=()=>{
        //     //this.props.actions.ChangeMode('CLONE');
        //     console.log(this.props.tenantID)
        //     this.props.actions.selectedOrg(this.props.tenantID);
        // }
        handleTenantInput = (e) => {
            this.setState({ tenantName: e.target.value });
        }
        updateTenant = () => {
            this.props.actions.UpdateTenant(this.state.tenantName);
        }
        render(){
        return (
            <Col s={12} m={3} l={3} xl={3} className="tenant-class">
            <Card className='white' textClassName=''>
                <input type="text" onChange={this.handleTenantInput} onBlur={this.updateTenant}></input>
                <span className={this.props.type}><Badge>{this.props.type}</Badge></span>
                {this.props.newProj ? <Badge className="new-card">New</Badge>: null}
                <p className=''>Organisation: <span>{this.props.orgList.length}</span></p>
                <p>Location: <span>{this.props.locList.length}</span></p>
                <div>
                <button onClick={this.props.actions.ClonePublish}>Publish</button>
                {/* <Link to="/viewedit"><h6 className='project-link' >Enter</h6></Link> */}
                </div>
            </Card>
        </Col>
        )}
}