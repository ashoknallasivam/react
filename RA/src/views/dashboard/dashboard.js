import React, { Fragment }from 'react';
import ReactDom from 'react-dom';
import { Row, Col,Card,Input,Tabs,Tab, Preloader } from 'react-materialize';
import CustomCard from '../../components/base/card';
import CloneCard from '../../components/base/cloneCard';
import DasboardSearch from './dashboard_search';
import './dashboard.scss';
import Search from '../../components/search/search';

class Dashboard extends React.Component {
   constructor(props){
      super(props);
      this.state = { filter: false, cards: 'All', preloader: false };
      this.handleProjectSort = this.handleProjectSort.bind(this);
   }
   componentDidMount(){
      this.props.actions.clearOrg();
      this.props.actions.getTenants();
      this.props.actions.FetchRoles();
      this.props.actions.FetchResource();
      this.props.actions.FetchMenus();
      this.props.actions.FetchEnrollmentTarget();
      this.props.actions.FetchRaConfig();
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
  exportProjectPause = (temp) => {
      console.log(temp);
      var a = this;
      temp.then(function (response) {
         
         a.setState({
            preloader: response == "successful" ? false : true 
         }) 
      })
  }

   render() {
      return (
            <div>
	  <Row >
         <Fragment>
		  
            <DasboardSearch filterCards={this.handleProjectSort} selectedSort={this.state.cards} filter={this.state.filter} />
			
            <Row className="card-container">
            {  this.state.preloader ? <Col s={4}>
                     <Preloader size='big'/>
               </Col>:
               <Fragment>
                  <p>Published Project</p>
                  {
                  this.props.tenantData.map((i, index) =>
                        <CustomCard title={i.name} exportProjectPause={this.exportProjectPause} tenantID={i.id} newProj={this.props.newProject == i.id ? true: false} type={i.type} orgList={i.topLevelOrg} locList={i.lowerLevelOrg} key={index} />
                     )
                  }
                  {this.props.ProjectInformation.length > 0 ? <p>Imported Projects</p>: null}
                  {
                  this.props.ProjectInformation.map((i, index) =>
                        <CloneCard key={index} title={i.tenant[0].name} orgLength={i.organization[0].length}/>
                     )
                  }
               </Fragment>
            }
            </Row>
            {this.props.ApplicationMode==="CLONE" ?
            <Row className="card-container">
            {this.props.tenantData.map((i, index) =>
                  <ClonedCard tenantID={i.id} newProj={this.props.newProject == i.id ? true: false} type={i.type} orgList={i.topLevelOrg} locList={i.lowerLevelOrg} key={index}/>
                  )
            }
            </Row>:null
            }			
         </Fragment>

		 </Row >
             </div>
   
	
      )
   }
 }

export default Dashboard;