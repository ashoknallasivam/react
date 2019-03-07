import React, { Fragment }from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Row, Col,Card,Input,Tabs,Tab, Preloader, Button } from 'react-materialize';
import CustomCard from '../../components/base/card';
import CloneCard from '../../components/base/cloneCard';
import DasboardSearch from './dashboard_search';
import './dashboard.scss';
import Search from '../../components/search/search';

class Dashboard extends React.Component {
   constructor(props){
      super(props);
      this.state = { filter: false, cards: 'All', preloader: false, showPublished: true };
      this.handleProjectSort = this.handleProjectSort.bind(this);
   }
   componentDidMount(){
	  //this.interval = setInterval(this.fetchNews, 3600000);
      this.props.actions.clearOrg();
      this.props.actions.getTenants();
      //this.props.actions.FetchRoles();
      //this.props.actions.FetchResource();
      //this.props.actions.FetchMenus();
      //this.props.actions.FetchRaConfig();
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
  handleDashboardBtn = (e) => {
      if(e.target.value === "published"){
         this.setState({
            showPublished: true
         })
      }else {
         this.setState({
            showPublished: false
         })
      }
  }

   render() {
      return (
            <div>
	  <Row >
         <Fragment>
		  
            {/* <DasboardSearch filterCards={this.handleProjectSort} selectedSort={this.state.cards} filter={this.state.filter} /> */}
            <Row className="card-container">
               {  this.state.preloader ? <Col s={4}>
                     <Preloader size='big'/>
               </Col>:
               <Fragment>
                  <div className="dashboard-btn"><Button value="published" className={this.state.showPublished ? "selected" : null} onClick={this.handleDashboardBtn}>Published</Button><Button value="unpublished" className={this.state.showPublished ?  null: "selected"} onClick={this.handleDashboardBtn}>unpublished</Button></div>
                  {this.state.showPublished ?
                  <Fragment>
                     <h2>Published </h2>
                     {
                     this.props.tenantData.map((i, index) =>
                           <CustomCard title={i.name} exportProjectPause={this.exportProjectPause} tenantID={i.id} newProj={this.props.newProject == i.id ? true: false} type={i.type} orgList={i.topLevelOrg} locList={i.lowerLevelOrg} key={index} />
                        )
                     }
                  </Fragment>:
                  <Fragment>
                     <h2>Imported Project</h2>
                     {
                     this.props.ProjectInformation.map((i, index) =>
                           <CloneCard key={index} title={i.tenant[0].name} orgLength={i.organization[0].length}/>
                        )
                     }
                  </Fragment>
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
 
 function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps, actions)(Dashboard);
 

