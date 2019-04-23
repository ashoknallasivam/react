import React, { Fragment } from 'react';
import { Row, Col, Preloader, Button } from 'react-materialize';
import CustomCard from '../../components/base/card';
import './dashboard.scss';
import objectUtil from '../../utils/objectUtil';

class Dashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         preloader: true,
         publishStatus: "published"
      };
   }
   componentDidMount() {
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
                                                      </div>
                                                      {(this.state.publishStatus === "published") ?
                                                            <Fragment>
                                                                  <h2>Published Projects </h2>
                                                                  {
                                                                        Object.keys(this.props.projectList).map((i, index) => {
                                                                              if (this.props.projectList[i].projectStatus !== "save")
                                                                                    return <CustomCard tenantId={i} key={index} history={this.props.history} loaderHandler={this._loaderHandler} />
                                                                        })}
                                                            </Fragment> :
                                                            <Fragment>
                                                                  <h2>UnPublished Project</h2>
                                                                  {
                                                                        Object.keys(this.props.projectList).map((i, index) => {
                                                                              if (this.props.projectList[i].projectStatus == "save")
                                                                                    return <CustomCard tenantId={i} key={index} history={this.props.history} loaderHandler={this._loaderHandler} projectStatus={this.props.projectList[i].projectStatus} />
                                                                        })
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
