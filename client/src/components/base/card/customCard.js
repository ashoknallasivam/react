import React,{Fragment} from 'react';
import { Col, Card, Badge } from 'react-materialize';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import './customCard.scss';
 class CustomCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sum:''
        }
      }
 _handleCardClick = (e) => {
        // this.props.actions.routeTo("/viewedit");
        this.props.history.push({
            pathname: '/viewedit',
            state: { id: e.currentTarget.id}
          })
    }
    
    render() {
        let testing = new Map(Object.entries(this.props.projectList));
        return (
            <Col s={12} m={3} l={3} xl={3} className="tenant-class">
                <span className="hamburger" onClick={this.handleExport}></span>
                
                    <Card className='white' title={testing.get(this.props.tenantId).name} id={this.props.tenantId} onClick={this._handleCardClick} >
                        { this.props.projectList ? 
                        <Fragment>
                            <p>Organisation: <span>{Object.keys(testing.get(this.props.tenantId).orgs).length}</span></p>
                            <p>Location: <span>  {(testing.get(this.props.tenantId).orgsList.filter(item => item.level > 0)).length } </span></p>  
                           
                         </Fragment> : null
                         } 
                    </Card>
            </Col>
        )
    }
}
export default withRouter(CustomCard);