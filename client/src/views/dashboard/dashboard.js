import React, { Fragment } from 'react';
import { Row, Col, Preloader, Button, Table } from 'react-materialize';
import CustomCard from '../../components/base/card';
import ListView from '../../components/base/list';
import './dashboard.scss';
import objectUtil from '../../utils/objectUtil';

class Dashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         preloader: true,
         publishStatus: "published",
         viewGrid : true
      };
   }
   componentDidMount() {
    this.props.actions.fetchUserInfo();
      if(this.props.auth) {
    this.props.actions.fetchAllTenants().then((response)=>{
       if(response.status !== 200){
         //  console.log(response)
          alert(response)
       }
      this.setState({
         preloader: false
      })
      this.props.actions.fetchSavedTenants()
    });
}
      }

      componentWillReceiveProps(props) {


      }

      handleDashboardBtn = (e) => {
            this.setState({
                  publishStatus: e.target.value
            })
      }
      //  _populateLocation = (data) => {
      //   var location ;
      //   Object.keys(data).map((item =>  { 
      //           if(data[item].children ){
      //             this._populateLocation(data.children) 
      //             console.log(data[item].children.id)
      //           }
      //           else{
      //             // location = [...location,data]
      //             console.log("end")

      //           }

      //         })); 
      //         console.log(Object.keys(data))

      // }
      _loaderHandler = (e) => {

            this.setState({
                  preloader: e

            })

      }
      handleGridView = () => {
            this.setState({
               viewGrid : !this.state.viewGrid
            })
      }
    


      render() {
            return (
                  <div>
                        <Row >
                              {this.props.projectList &&
                                    <Fragment>
                                          <Row className="card-container">
                                                <Col s={12} className={this.state.preloader ? "valign-wrapper loader-overlay" : "hide"}>
                                                      <Preloader className="spinner" size='big' active={this.state.preloader ? true : false} />
                                                </Col>
                                                <Fragment>
                                                      <div className="dashboard-btn">
                                                            <Button value="published" className={(this.state.publishStatus === "published") ? "selected" : null} onClick={this.handleDashboardBtn}>Published</Button>
                                                            <Button value="unpublished" className={(this.state.publishStatus === "unpublished") ? "selected" : null} onClick={this.handleDashboardBtn}>unpublished</Button>
                                                           {this.state.viewGrid == false &&  <i class="material-icons pointer" title="Grid View" onClick={this.handleGridView}>
                                                                  grid_on
                                                            </i>} 
                                                            {this.state.viewGrid == true && <i class="material-icons pointer" title="List View" onClick={this.handleGridView}>
                                                                  view_list
                              </i> }
                                                      </div>
                                                      {(this.state.publishStatus === "published") ?
                                                            <Fragment>
                                                                  <h2>Published Projects </h2>
                                                                  {this.state.viewGrid == true ?
                                                                        Object.keys(this.props.projectList).map((i, index) => {
                                                                              if (this.props.projectList[i].projectStatus !== "save")
                                                                                    return <CustomCard tenantId={i} key={index} history={this.props.history} loaderHandler={this._loaderHandler} />
                                                                        }) :
                                                                        <Fragment>
                                                                              <div className="row create-project-page z-depth-4">
                                                                                    <Table className="striped responsive-table centered mt-4">
                                                                                          <thead>
                                                                                                <tr>
                                                                                                      <th className ="pl-4"style={{ textAlign: 'left'}}>Project Name</th>
                                                                                                      <th>Organization</th>
                                                                                                      <th>Location</th>
                                                                                                      <th>Option</th>
                                                                                                </tr>
                                                                                          </thead>
                                                                                          <tbody className="pl-4">
                                                                                                {Object.keys(this.props.projectList).map((i, index) => {
                                                                                                      if (this.props.projectList[i].projectStatus !== "save")
                                                                                                            return <ListView tenantId={i} key={index} history={this.props.history} loaderHandler={this._loaderHandler} />



                                                                                                })}
                                                                                          </tbody>
                                                                                    </Table>
                                                                              </div>
                                                                        </Fragment>
                                                                  }
                                                            </Fragment> :
                                                            <Fragment>
                                                                  <h2>UnPublished Project</h2>
                                                                  {this.state.viewGrid == true ?
                                                                        Object.keys(this.props.projectList).map((i, index) => {
                                                                              if (this.props.projectList[i].projectStatus == "save")
                                                                                    return <CustomCard tenantId={i} key={index} history={this.props.history} loaderHandler={this._loaderHandler} projectStatus={this.props.projectList[i].projectStatus} />
                                                                        }) :
                                                                        <Fragment>
                                                                              <div className="row create-project-page z-depth-4">
                                                                                    <Table className="striped responsive-table centered mt-4">
                                                                                          <thead>
                                                                                                <tr>
                                                                                                      <th className="pl-4"style={{ textAlign: 'left'}}>Project Name</th>
                                                                                                      <th>Organization</th>
                                                                                                      <th>Location</th>
                                                                                                </tr>
                                                                                          </thead>
                                                                                          <tbody>
                                                                                                {Object.keys(this.props.projectList).map((i, index) => {
                                                                                                      if (this.props.projectList[i].projectStatus == "save")
                                                                                                            return <ListView tenantId={i} key={index} history={this.props.history} loaderHandler={this._loaderHandler} projectStatus={this.props.projectList[i].projectStatus} />
                                                                                                })}
                                                                                          </tbody>
                                                                                    </Table>
                                                                              </div>
                                                                        </Fragment>
                                                                  }
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
