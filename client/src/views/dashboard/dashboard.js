import React, { Fragment } from 'react';
import { Row, Col, Preloader, Button } from 'react-materialize';
import CustomCard from '../../components/base/card';
import './dashboard.scss';

class Dashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         preloader: true,
         publishStatus: "published"
      };
      this.obj = {
         1:{
              id:'parent',
              children:{
                  2:{
                      id: 'one',
                      children:{
                        3:{
                            id:'two',
                            children:{}
                        }
                      }
                  }
              }
          },
          2:{
            id:'parent -2',
            children:{}
          }
      }
   }

   componentDidMount() {
      this.props.actions.fetchAllTenants().then(response=>{ 
         this.setState({
            preloader : response
 
         }) 
     });
   }

   componentWillReceiveProps(props){
      
     
   }
 
   handleDashboardBtn = (e) => {
      this.setState({
         publishStatus: e.target.value
      })
   }
 _populateLocation = (data) => {
  var location ;
  Object.keys(data).map((item =>  { 
          if(data[item].children ){
            this._populateLocation(data.children) 
            console.log(data[item].children.id)
          }
          else{
            // location = [...location,data]
            console.log("end")

          }
       
        })); 
        console.log(Object.keys(data))
   
}
_loaderHandler = (e) =>{

   this.setState({
      preloader : e

   })

}


   render() {
      return (
         <div>
            <Row >{
                //  this._populateLocation(this.obj)

            }
               {this.props.projectList  && 
               <Fragment>
                  <Row className="card-container">
                     <Col s={12} className={this.state.preloader ? "valign-wrapper loader-overlay" :"hide" }>
                        <Preloader className="spinner" size='big'  active={this.state.preloader} />
                     </Col> 
                        <Fragment>
                           <div className="dashboard-btn">
                              <Button value="published" className={(this.state.publishStatus === "published") ? "selected" : null} onClick={this.handleDashboardBtn}>Published</Button>
                              <Button value="unpublished" className={(this.state.publishStatus === "unpublished") ? "selected" : null} onClick={this.handleDashboardBtn}>unpublished</Button>
                           </div>
                           {(this.state.publishStatus === "published") ?
                              <Fragment>
                                 <h2>Published Projects </h2>
                                 {
                                 Object.keys(this.props.projectList).map((i, index) => 
                                       <CustomCard tenantId={i}  key={index} history={this.props.history} loaderHandler={this._loaderHandler} />
                                    )}
                              </Fragment> : 
                              <Fragment>
                                 <h2>UnPublished Project</h2>
                                 {/* {
                                    this.props.projectList.map((i, index) =>
                                       <CloneCard key={index} title={i.name} orgLength={i.organizations.length} />
                                    )
                                 } */}
                              </Fragment>
                           }
                        </Fragment>
                  </Row>
                  </Fragment>
               } 
         </Row>
         </div>
      )
   }
}

export default Dashboard;
