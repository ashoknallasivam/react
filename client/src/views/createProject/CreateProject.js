import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Preloader, Col } from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
import PropTypes from "prop-types";
import FormModal from '../../components/base/formModal';
import TabsProject from '../../components/tabsProject';
import FormEditModal from '../../components/base/formEditModal';
import FormDeleteModal from '../../components/base/formDeleteModal';
import uuid from 'uuid';

// import FormModal from '../base/formModal';

const localConstant = objectUtil.getlocalizeData();

class CreateProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: {},
      name: '',
      id: '',
      allOrganisations: {},
      allLocations: {},
      orgsList: [],
      selectedOrganisation: {
        id: ''
      },
      selectedLocation: {
        id: ''
      },
      preloader: true,
      fetched: false,
      applicationMode: '',
      addOrg: false,
      addLoc: false,
      deleteLoc: false,
      deleteOrg: false,
      editLoc: false,
      editOrg: false,
      modalOpen: false,
      validations: {
        name: false,
        organisation: false,
        location: false
      }
    }
  }
  componentDidMount() {
    this.props.actions.fetchUserInfo()

    // checking for the id of clicked card and fetching data
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.applicationMode === "VIEW" ) {
        this.props.actions.fetchSingleTenant(this.props.location.state.id).then(response => {
          if(response.status == 200)
          {
          this.setState({
            preloader: false,
            applicationMode: this.props.location.state.applicationMode
          })
          }
          else{
            alert('Fetching data error, try refreshing the page')
            this.setState({
              preloader: false,
            })
          }
        });
      } else {
        this.setState({
          preloader: false
        })
      }
      // checking for the data of the selected project
      if (this.props.projectList[this.props.location.state.id] != undefined) {
        let currentProject = this.props.projectList[this.props.location.state.id]
        this.setState({
          currentProject: currentProject,
          name: currentProject.name,
          id: currentProject.id,
          allOrganisations: currentProject.orgs,
          orgsList: currentProject.orgsList,
          applicationMode: this.props.location.state.applicationMode
        })
      }
    }
    // create mode if preivously selected card value is null
    else {
      // if the project had already data create mode and no id
      this.setState({
        applicationMode: "CREATE",
        id: uuid.v4(),
        preloader: false
      })
    }
  }
  _handleAppMode = (value) => {
    this.setState({
      applicationMode: value
    })
  }
  componentWillReceiveProps(props) {
    if (props.location.state !== undefined) {
      let currentProject = props.projectList[props.location.state.id];
      this.setState({
        currentProject: currentProject,
        name: currentProject !== undefined ? currentProject.name : '',
        id: currentProject !== undefined ? currentProject.id : '',
        allOrganisations: currentProject !== undefined ? currentProject.orgs : {},
        orgsList: currentProject !== undefined ? currentProject.orgsList : []
      })
    }
    else {
      let currentProject = props.projectList[this.state.id];
      this.setState({
        currentProject: currentProject,
        name: currentProject !== undefined ? currentProject.name : '',
        id: currentProject !== undefined ? currentProject.id : '',
        allOrganisations: currentProject !== undefined ? currentProject.orgs : {},
        orgsList: currentProject !== undefined ? currentProject.orgsList : []
      })
    }
  }
  
  _handleOrgDropdown = (e) => {
    e.preventDefault();
    let allLocations = {};
    let selectedOrganisation = {};
    let locList = [];
    this.state.currentProject.orgsList.map((data, index) => {
      if (data.ttoId == e.target.value) {
        allLocations = { ...allLocations, [data.id]: { ...data } }
      }
      if (data.id == e.target.value) {
        selectedOrganisation = data
      }
    })
    this.setState({
      selectedOrganisation,
      allLocations,
      selectedLocation: {
        id: ''
      }
    });
  }
  SaveStudyConfig = (data) => {
    this.setState(({
      selectedLocation: {
        ...this.state.selectedLocation,
        raConfig: [data]
      }
    }))
  }
  SaveStudyConfig = (data) => {
    // this.setState(({
    //   selectedLocation: {
    //     ...this.state.selectedLocation,
    //     raConfig : [data]
    //   }
    // }))
    let selectedLocation = this.state.selectedLocation;
    let rollIndex = '';
    this.state.selectedLocation.raConfig.map((item, i) => {
      if (data.id == item.id) {
        rollIndex = i;
      }
    })

    if (rollIndex !== '') {
      selectedLocation.raConfig[rollIndex] = data;
      this.setState({
        selectedLocation

      })
    } else {
      selectedLocation.raConfig = [...selectedLocation.raConfig, data];
      this.setState({
        selectedLocation
      })
    }
  }
  SaveEnrollment = (data) => {
    let selectedLocation = this.state.selectedLocation;
    let rollIndex = '';
    this.state.selectedLocation.enrollmentTargets.map((item, i) => {
      if (data.id == item.id) {
        rollIndex = i;
      }
    })

    if (rollIndex !== '') {
      selectedLocation.enrollmentTargets[rollIndex] = data;
      this.setState({
        selectedLocation

      })
    } else {
      selectedLocation.enrollmentTargets = [...selectedLocation.enrollmentTargets, data];
      this.setState({
        selectedLocation
      })
    }
  }
  SaveRoles = (data) => {
    let selectedLocation = this.state.selectedLocation;
    let selectedOrganisation = this.state.selectedOrganisation;
    let roleIndex = '';
    //store in loc
    if (data.orgId == this.state.selectedLocation.id) {
      this.state.selectedLocation.roles.map((item, i) => {
        if (data.id == item.id) {
          roleIndex = i;
        }
      })

      if (roleIndex !== '') {
        selectedLocation.roles[roleIndex] = data;
        this.setState({
          selectedLocation
        })
      } else {
        selectedLocation.roles = [...selectedLocation.roles, data];
        this.setState({
          selectedLocation
        })
      }
    }
    // store in org
    else if (data.orgId == this.state.selectedOrganisation.id) {
      this.state.selectedOrganisation.roles.map((item, i) => {
        if (data.id == item.id) {
          roleIndex = i;
        }
      })

      if (roleIndex !== '') {
        selectedOrganisation.roles[roleIndex] = data;
        this.setState({
          selectedOrganisation
        })
      } else {
        selectedOrganisation.roles = [...selectedOrganisation.roles, data];
        this.setState({
          selectedOrganisation
        })
      }
    }
  }
  SavePages = (data) => {
    let selectedLocation = this.state.selectedLocation;
    let pageIndex = '';
    this.state.selectedLocation.pages.map((item, i) => {
      if (data._id == item._id) {
        pageIndex = i;
      }
    })

    if (pageIndex !== '') {
      selectedLocation.pages[pageIndex] = data;
      this.setState({
        selectedLocation
      })
    } else {
      selectedLocation.pages = [...selectedLocation.pages, data];
      this.setState({
        selectedLocation
      })
    }

  }
  _handleLoc = (e) => {
    (Object.keys(this.state.allLocations)).map((item) => {
      if (item == e.target.value) {
        this.setState({
          [e.target.name]: this.state.allLocations[item]
        })
        this.state.currentProject.orgsList.map(parentName =>{
          if(parentName.id==this.state.allLocations[item].parentId){
            this.setState({
            locParentName : parentName.name
            })
          }
        }) 
      }
    })
  }
  // gets variable name and value from formModal and sets state
  _setValues = (e, data) => {
    this.setState({
      [e]: data,
    })
    this.forceUpdate();
  }
  _hanldetenatnInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  _handleModal = (e) => {
    if (this.state.name == "") {
      this.setState({
        validations: {
          name: true
        }
      })
    } else {
      this.setState({
        [e.currentTarget.name]: true,
        validations: {
          name: false
        }
      })
    }
  }
  
  saveTenant = (e) => {
    if (this.state.name !== '') {
      let data;
      if (this.state.applicationMode == "EDIT") {
        data = {
          id: this.state.id,
          name: this.state.name,
          statusFlag: "modified"
        }
      }
      if (this.state.applicationMode == "CREATE") {
        data = {
          id: this.state.id,
          name: this.state.name,
          orgs: this.state.allOrganisations,
          orgsList: this.state.orgsList,
          statusFlag: "new",
          
        }
      }
      this.props.actions.SaveTenant(this.state.id, data);
    } else {
      window.Materialize.toast('Please fill project name', 4000)
    }
  }
  _handleModalClose = (e) => {
    
    this.setState({
      [e]: false
    })
  }
  _discard = () => {
    if(this.state.applicationMode == "EDIT"){
     this.setState({
       preloader : true,
       name: this.state.currentProject.name,
       id: this.state.currentProject.id,
       allOrganisations: this.state.currentProject.orgs,
       orgsList: this.state.currentProject.orgsList,
       allLocations: [],
       selectedOrganisation: {
         id: ''
       },
       selectedLocation: {
         id: ''
       },
     });
     this.props.actions.fetchSingleTenant(this.state.id).then(response => {
      if(response.status === 200 )
      { 
        this.setState({
         preloader: false,
       })
      }else{

        alert('Fetching data failed, try refreshing the ')
        this.setState({
          preloader: false,
        })
      }
     });
   }
   else{
     this.props.actions.removeProject(this.state.id)
     this.props.history.push({
       pathname: '/dashboard',
   })
   }
   }
  finalPublish = () => {
    debugger
    this.setState({
      preloader: true
    })
    this.props.actions.publishProject(this.state.id).then(response => {
    
      if (response.status == 200) {
        this.props.actions.fetchSingleTenant(response.data.id).then(response => {
          this.setState({
            preloader: false,
            publishInfo: response.message
          })
          if (response.data.status == 200) {
            alert("Project is Successfully Published")
            this.props.history.push({
              pathname: '/dashboard',
            })
          } else {
            alert("Project is Successfully Published")
            this.props.history.push({
              pathname: '/dashboard',
            })
            this.setState({
              preloader: false

            })
          }
        })
      } 
      else {
        alert("Publish error. Please refer logs. ")
        this.setState({
          preloader: false,
        })
      }

    });
  }

  finalSave = () => {
    this.props.actions.saveProject(this.state.id).then(response => {
      this.setState({
        preloader: false,
      })

      this.props.history.push({
        pathname: '/dashboard',
        state: {
          id: response,
          flag: 'saved'
        }
      })
    })
  }

  render() {
    return (
      <Fragment>
        {/* {(this.state.fetched == true || this.state.applicationMode == "CREATE") ? */}
        <Row className="create-project-page">
          <Col s={12} className={this.state.preloader ? "valign-wrapper leftzero loader-overlay-view" : "hide"}>
            <Preloader className="spinner" size='big' active={this.state.preloader} />
          </Col>
          <Col className="z-depth-4 col-centered mt-2" s={12} m={12} l={12} xl={12}>
            <Row className="project-form">
              <Col s={12} m={12} l={12} xl={12} className='project_name mt-1'>
                <Input className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0 project_name' : 'mt-0'} s={12} m={4} l={4} xl={4} label="Project Name" name="name" onChange={this._hanldetenatnInput} value={this.state.name} disabled={this.state.applicationMode == "VIEW" ? true : false} onBlur={this.saveTenant} />
              </Col>

              <Col s={12} m={12} l={12} xl={12} className=' mt-2'>
                <Col s={12} m={6} l={6} xl={6} className="org-loc">
                  <label>Organization</label>
                  <div>
                    <select className="mt-1 ml-0 pl-0 col s8 Dropdown " name="organisation" onChange={this._handleOrgDropdown} value={this.state.selectedOrganisation.id} disabled={this.state.name != "" ? false : true} >
                      <option value="" disabled >Select an organization</option>
                      {
                        Object.keys(this.state.allOrganisations).map((id, i) => {
                          if (this.state.allOrganisations[id].statusFlag == "new" || this.state.allOrganisations[id].statusFlag == "modified" || this.state.allOrganisations[id].statusFlag == undefined) {
                            return <option id={i} value={this.state.allOrganisations[id].id}>{this.state.allOrganisations[id].name}</option>
                          } else if (this.state.allOrganisations[id].statusFlag == "delete" || this.state.allOrganisations[id].statusFlag == "ignore") {
                            return <option id={i} value={this.state.allOrganisations[id].id} className="hide">deleted Location</option>
                          }
                        })
                      }
                    </select >
                    {this.state.applicationMode == 'VIEW' ?
                      null : <Fragment>
                        <Button className='orgIcon col s12 m2 l2 xl2 mt-3' name="addOrg" onClick={this._handleModal}>
                          <i className="material-icons" title='Add'>
                            add_circle</i>
                        </Button>
                        <FormModal header={"Add Organization"} name="addOrg" open={this.state.addOrg}
                          setValues={this._setValues}
                          handleModalClose={this._handleModalClose}
                          allOrganisations={this.state.allOrganisations}
                          allLocations={this.state.allLocations}
                          orgsList={this.state.orgsList}
                          tenantId={this.state.id}
                          applicationMode={this.state.applicationMode}
                          userId={this.props.userId}

                        />
                         <FormDeleteModal header={"Delete Organization"} name="deleteOrg" open={this.state.deleteOrg}
                              setValues={this._setValues}
                              handleModalClose={this._handleModalClose}
                              allOrganisations={this.state.allOrganisations}
                              allLocations={this.state.allLocations}
                              orgsList={this.state.orgsList}
                              selectedOrganisation={this.state.selectedOrganisation}
                              tenantId={this.state.id}
                              applicationMode={this.state.applicationMode}
                              userId={this.props.userId} />
                        <FormEditModal header={"Edit Organization"} name="editOrg" open={this.state.editOrg}
                              setValues={this._setValues}
                              handleModalClose={this._handleModalClose}
                              allOrganisations={this.state.allOrganisations}
                              allLocations={this.state.allLocations}
                              orgsList={this.state.orgsList}
                              selectedOrganisation={this.state.selectedOrganisation}
                              tenantId={this.state.id}
                              applicationMode={this.state.applicationMode}
                              userId={this.props.userId} />


                        {this.state.selectedOrganisation.id != "" ?
                          <Fragment>
                            <Button className='orgIcon col s12 m2 l2 xl2 mt-3' name="deleteOrg" onClick={this._handleModal} >
                              <i className="material-icons" title='Delete'>delete</i>
                            </Button>
                            <Button className='orgIcon col s12 m2 l2 xl2 mt-3' name="editOrg" onClick={this._handleModal}  >
                              <i className="material-icons" title='Update'>edit</i>
                            </Button>
                          </Fragment>
                          : null
                        }
                      </Fragment>
                    }
                  </div>
                </Col>
                {this.state.selectedOrganisation.id != '' ?
                  <Col s={12} m={6} l={6} xl={6} className="org-loc">
                    <label>Location</label>
                    <div>
                      <select className="mt-1 ml-0 pl-0 col s8 Dropdown" name="selectedLocation" onChange={this._handleLoc} value={this.state.selectedLocation.id} disabled={this.state.allOrganisations.length != 0 ? false : true}>
                        <option value="" disabled >Select a location</option>
                        {
                          (Object.keys(this.state.allLocations)).map((iteratedValue, i) =>{
                            if (this.state.allLocations[iteratedValue].statusFlag == "new" || this.state.allLocations[iteratedValue].statusFlag == "modified" || this.state.allLocations[iteratedValue].statusFlag == undefined) {
                              return  <option id={i} value={this.state.allLocations[iteratedValue].id}>{this.state.allLocations[iteratedValue].name}</option>
                            } else if (this.state.allLocations[iteratedValue].statusFlag == "delete" || this.state.allLocations[iteratedValue].statusFlag == "ignore") {
                              return <option id={i} value={this.state.allLocations[iteratedValue].id} className="hide">deleted Organization</option>
                            }
                          }
                            // <option id={i} value={this.state.allLocations[iteratedValue].id}>{this.state.allLocations[iteratedValue].name}</option>
                          )
                         
                          
                          }
                      </select >
                      
                      {this.state.applicationMode == 'VIEW' ?
                        null :
                        <Fragment>
                          <Button className='col s12 m2 l2 xl2 orgIcon mt-3' disabled={this.state.allOrganisations.length != 0 ? false : true} name="addLoc" onClick={this._handleModal} >
                            <i className="material-icons" title='Add'>add_circle</i>
                          </Button>
                          <FormModal header={"Add Location"} name="addLoc" open={this.state.addLoc}
                            setValues={this._setValues}
                            handleModalClose={this._handleModalClose}
                            allOrganisations={this.state.allOrganisations}
                            allLocations={this.state.allLocations}
                            orgsList={this.state.orgsList}
                            tenantId={this.state.id}
                            applicationMode={this.state.applicationMode}
                            selectedOrganisation={this.state.selectedOrganisation}
                            userId={this.props.userId} />
                          
                          <FormDeleteModal header={"Delete Location"} name="deleteLoc" open={this.state.deleteLoc}
                                setValues={this._setValues}
                                handleModalClose={this._handleModalClose}
                                allOrganisations={this.state.allOrganisations}
                                allLocations={this.state.allLocations}
                                orgsList={this.state.orgsList}
                                selectedLocation={this.state.selectedLocation}
                                tenantId={this.state.id}
                                applicationMode={this.state.applicationMode}
                                userId={this.props.userId} />
                              
                              <FormEditModal header={"Edit Location"} name="editLoc" open={this.state.editLoc}
                                setValues={this._setValues}
                                handleModalClose={this._handleModalClose}
                                allOrganisations={this.state.allOrganisations}
                                allLocations={this.state.allLocations}
                                orgsList={this.state.orgsList}
                                selectedLocation={this.state.selectedLocation}
                                tenantId={this.state.id}
                                applicationMode={this.state.applicationMode}
                                userId={this.props.userId} />
                         
                          
                          {(this.state.selectedLocation.id !== "") ?
                            <Fragment>
                              <Button className='col s12 m2 l2 xl2 orgIcon mt-3' name="deleteLoc" onClick={this._handleModal}  >
                                <i className="material-icons" title='Delete'>
                                  delete</i>
                              </Button>
                              <Button className='col s12 m2 l2 xl2 orgIcon mt-3' name="editLoc" onClick={this._handleModal} >
                                <i className="material-icons" title='Update'>
                                  edit</i>
                              </Button>
                            </Fragment> : null
                          }
                        </Fragment>
                      }
                      {this.state.selectedLocation.id !== ""?
                        <div className="col s12 pl-0">
                          <p className="mb-0">Parent: {this.state.locParentName}</p>
                        </div>
                      : null}
                      
                    </div>
                  </Col> : null
                }
              </Col>
            </Row>
          </Col>
          {this.state.selectedOrganisation.id !== '' &&
            <Col className="z-depth-4 col-centered mb-3 p-0" s={12} m={12} l={12} xl={12}>
              <TabsProject currentProject={this.state.currentProject} selectedOrganisation={this.state.selectedOrganisation} selectedLocation={this.state.selectedLocation} applicationMode={this.state.applicationMode} upadateNew={this.upadateNew}
                SaveStudyConfig={this.SaveStudyConfig}
                SaveEnrollment={this.SaveEnrollment}
                SaveRoles={this.SaveRoles}
                SavePages={this.SavePages} />
            </Col>
          }
          <Col className="col-centered mb-3 p-0 form-footer" s={12} m={12} l={12} xl={12}>
            {/* Display Edit in view mode */}
            {this.state.applicationMode == "VIEW" &&
              <Button className="mt-1 CreateProjectPublish btn_primary" name="EDIT" onClick={(e) => this._handleAppMode('EDIT')}>Edit</Button>}

            {/* Display publish in create and edit mode */}
            {this.state.applicationMode !== 'VIEW' &&
              <Fragment>
                <Button className="mt-1 CreateProjectPublish btn_primary" onClick={this.finalPublish} disabled={(this.state.name !== '') ? false : true}>Publish</Button>
                {/* Display Discard in if project name is not empty */}
                {this.state.applicationMode  === "CREATE" && <Button className="mt-1 mr-1 CreateProjectPublish btn_primary" onClick={this.finalSave} disabled={(this.state.name !== '') ? false : true}>Save</Button>}
                <Button className="mt-1 mr-1 CreateProjectPublish btn_primary" onClick={this._discard}  >Discard</Button>
              </Fragment>
            }
          </Col>
        </Row>
        {/* } */}
      </Fragment>

    )
  }
}
export default CreateProject;