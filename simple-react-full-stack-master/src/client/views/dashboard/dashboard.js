import React, { Fragment }from 'react';
import ReactDom from 'react-dom';
import { Row, Col,Card,Input,Tabs,Tab } from 'react-materialize';
import CustomCard from '../../components/base/card';
import DasboardSearch from './dashboard_search';
import './dashboard.scss';
import Search from '../../components/search/search';

class Dashboard extends React.Component {
   constructor(props){
      super(props);
      this.state = { filter: false, cards: 'All' };
      this.handleProjectSort = this.handleProjectSort.bind(this);
   }
   componentDidMount(){
      this.props.actions.clearOrg();
      this.props.actions.getTenants();
      this.props.actions.FetchRoles();
      this.props.actions.FetchResource();
      this.props.actions.FetchMenus();
      this.props.actions.FetchEnrollmentTarget();
   }

   handleProjectSort(e){
      if (e == 'published') {
         this.setState({ filter: true, cards: 'published' });
      } else if (e == 'unpublished') {
         this.setState({ filter: true, cards: 'unpublished' });                  
      } else {
         this.setState({ filter: false, cards: 'All' });                 
      }
  }

   render() {
      return (
	  <Row >
         <Fragment>
		  
            <DasboardSearch filterCards={this.handleProjectSort} selectedSort={this.state.cards} filter={this.state.filter} />
			
            <Row className="card-container">
            {
               this.props.tenantData.map((i, index) =>
                     <CustomCard title={i.name} tenantID={i.id} newProj={this.props.newProject == i.id ? true: false} type={i.type} orgList={i.topLevelOrg} locList={i.lowerLevelOrg} key={index} />
                  )
            }
            </Row>
			
         </Fragment>
		 </Row >
   
	
      )
   }
 }

export default Dashboard;