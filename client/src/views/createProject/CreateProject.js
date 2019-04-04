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
      orgsList:[],
      selectedOrganisation: {
          id : ''
      },
      selectedLocation: {
        id:''
      },
      fetched:false,
      applicationMode:'',
      addOrg: false,
      addLoc: false,
      deleteLoc: false,
      deleteOrg: false,
      editLoc: false,
      editOrg: false,
      modalOpen:false,
      validations:{
        name:false,
        organisation:false,
        location:false
      }
    }
  }
  componentDidMount() {
    // checking for the id of clicked card and fetching data
    if (this.props.location.state !== undefined) {
      this.props.actions.fetchSingleTenant(this.props.location.state.id).then(response=>{ 
        this.setState({
            fetched : response,
            applicationMode: "VIEW"

        }) 
    });

    // checking for the data of the selected project
      if(this.props.projectList[this.props.location.state.id] != undefined ){
      let currentProject = this.props.projectList[this.props.location.state.id]
      this.setState({
        currentProject: currentProject,
        name: currentProject.name,
        id: currentProject.id,
        allOrganisations: currentProject.orgs,
        orgsList: currentProject.orgsList,
        applicationMode: "VIEW"
      })}
    }
    // create mode if preivously selected card value is null
    else {
      // if the project had already data create mode and no id
     
      this.setState({ applicationMode: "CREATE",
                       id: uuid.v4(),
     })
    }
  }
  _handleAppMode = (value) => {
    this.setState({
      applicationMode: value
    })
  }
  componentWillReceiveProps(props) {
    if (props.location.state !== undefined){
    let currentProject = props.projectList[props.location.state.id];
    this.setState({ currentProject: currentProject,
                      name:  currentProject.name,
                      id:  currentProject.id,
                      allOrganisations: currentProject.orgs,
                      orgsList :  currentProject.orgsList
                    })}

                    else{
                      // let id = props.projectList[this.state.id] ;
                      let currentProject =props.projectList[this.state.id];
                      this.setState({ 
                        currentProject: currentProject,
                        name: currentProject !== undefined ? currentProject.name : '',
                        id: currentProject !== undefined ? currentProject.id :'',
                        allOrganisations:  currentProject !== undefined ? currentProject.orgs : '',
                        orgsList :  currentProject !== undefined ? currentProject.orgsList :''
                      })
                    }
                    //                     
                     

  }
  _handleOrgDropdown = (e) => {
          e.preventDefault();
          let allLocations = {};
          let selectedOrganisation={};
          let locList =[];
            this.state.currentProject.orgsList.map((data,index)=>{
            if(data.ttoId ==  e.target.value ){
             allLocations = {...allLocations, [data.id] :  {...data}}
            }
            if(data.id == e.target.value){
              selectedOrganisation = data
            }
          }) 
          this.setState({
            selectedOrganisation,
            allLocations,
            selectedLocation:{
              id:''
            }
          });
  }

  
 SaveStudyConfig = ( data) =>  {
  this.setState(({
    selectedLocation: {
      ...this.state.selectedLocation,
      raConfig : [data]
    }
  }))
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
    let roleIndex = '';
    //store in loc
    if(data.id == this.state.selectedLocation.id){
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
  else if(data.id == this.state.selectedOrganisation.id){
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
    (Object.keys(this.state.allLocations)).map((item)=>{
      if(item ==  e.target.value){
        this.setState({
          [e.target.name]: this.state.allLocations[item]
        })
      }
    })
  }

  // gets variable name and value from formModal  and sets state
  _setValues =(e,data) =>{
    this.setState({
      [e]:data,
    })
     
  }
  
  _hanldetenatnInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  _handleModal = (e) => {
    if(this.state.name == ""){
      this.setState({
        validations:{
          name :true
        }
      })
     
    }else{
      this.setState({
        [e.currentTarget.name] : true,
        validations:{
          name :false
        }
      })
    }
  }
  _handleDelete =()=>{
    if(this.state.selectedOrganisation.id !== ""){
      confirm("Delete Organization?")
      delete this.state.allOrganisations[this.state.selectedOrganisation]
    }
    this.setState({
      selectedOrganisation: {
        id:''
      },
      allLocations:[]
    })
    
  }
  saveTenant = (e) =>{
    if(this.state.name !==''){
    let data ;
    if(this.state.applicationMode == "EDIT"){
       data ={
        id:this.state.id,
        name : this.state.name,
        statusFlag :"modified"
 }
}
    if(this.state.applicationMode == "CREATE"){
       data ={
        id:this.state.id,
        name : this.state.name,
        orgs:this.state.allOrganisations,
        orgsList:this.state.orgsList,
        statusFlag :"new"
  }
    }
  this.props.actions.SaveTenant(this.state.id, data);
  console.log(this.state.id, this.state.name)
}else{
  window.Materialize.toast('Please fill project name', 4000)
}
  }
  _handleModalClose =(e) =>{
    this.setState({
       [e] :  !this.state[e]
    })
    // if(e == 'deleteLoc'){
    //   this.setState({
    //     selectedLocation : {
    //       id:''
    //     }
    //   })
    // }
    // else if(e == 'deleteOrg'){
    //  this.setState({
    //    selectedOrganisation : {
    //      id:''
    //    }
    //  })

    // }
  }
  _discard = () => {
    this.setState({
      name: this.state.currentProject.name,
      id: this.state.currentProject.id,
      allOrganisations: this.state.currentProject.orgs,
      orgsList: this.state.currentProject.orgsList,
      allLocations: [],
      selectedOrganisation: {
        id:''
      },
      selectedLocation: {
        value:''
      },
    })
  }
finalPublish = () =>{
  this.props.actions.SaveProject(this.state.id);
}


upadateNew = () =>{
  this.forceUpdate();
  console.log('updated')
}
  render() {
    return (
      <Fragment>
         {( this.state.fetched == true || this.state.applicationMode == "CREATE") ? 
      <Row className="create-project-page">
        <Col className="z-depth-4 col-centered mt-2" s={12} m={12} l={12} xl={12}>
            <Row className="project-form">
              <Col s={12} m={12} l={12} xl={12} className=' mt-1'>
                <Input className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0' : 'mt-0'} s={12} m={4} l={4} xl={4} label="Project Name" name="name" onChange={this._hanldetenatnInput} value={this.state.name} disabled={this.state.applicationMode == "VIEW" ? true : false}  onBlur={this.saveTenant}/>
                {/* <p className={ this.state.validations.name ? "red-text darken-4" : "hide"  } > Please fill the Project name to add Organisation  </p> */}
                
              </Col>
             
              <Col s={12} m={12} l={12} xl={12} className=' mt-2'>
                 <Col  s={12} m={6} l={6} xl={6}>
                  <Input type='select' s={12} m={6} l={6} xl={6} className="mt-5 pl-0" name="organisation" label="Organization" onChange={this._handleOrgDropdown} value={this.state.selectedOrganisation.id} disabled={this.state.name !="" ?false : true } >
                    <option value="" disabled >Choose your option</option>
                    {
                      Object.keys(this.state.allOrganisations).map((id, i) =>
                        <option id={i} value={id}>{this.state.allOrganisations[id].name}</option>
                      )
                    }
                  </Input >
                  {this.state.applicationMode == 'VIEW' ?
                    null : <Fragment>
                      <Button className='orgIcon col s12 m2 l2 xl2 mt-8' name="addOrg" onClick={this._handleModal}>
                        <i className="material-icons" title='Add'>
                          add_circle</i>
                      </Button>
                      <FormModal header={"Add Organization"}  name="addOrg" open={this.state.addOrg} 
                      setValues={this._setValues}  
                      handleModalClose={this._handleModalClose} 
                      allOrganisations={this.state.allOrganisations} 
                      allLocations={this.state.allLocations} 
                      orgsList={this.state.orgsList}
                      tenantId={this.state.id}
                      applicationMode ={this.state.applicationMode}

                       />
                      {this.state.selectedOrganisation.id != "" ?
                        <Fragment>
                          <Button className='orgIcon col s12 m2 l2 xl2 mt-8' name="deleteOrg" onClick={this._handleModal} >
                            <i className="material-icons" title='Delete'>delete</i>
                          </Button>
                          <FormDeleteModal header={"Delete Organization"}  name="deleteOrg" open={this.state.deleteOrg} 
                              setValues={this._setValues}  
                              handleModalClose={this._handleModalClose} 
                              allOrganisations={this.state.allOrganisations} 
                              allLocations={this.state.allLocations} 
                              orgsList={this.state.orgsList}
                              selectedOrganisation = {this.state.selectedOrganisation}
                              tenantId={this.state.id}
                              applicationMode ={this.state.applicationMode} />


                          <Button className='orgIcon col s12 m2 l2 xl2 mt-8'  name="editOrg" onClick={this._handleModal}  >
                            <i className="material-icons" title='Update'>edit</i>
                          </Button>
                          <FormEditModal header={"Edit Organization"}  name="editOrg" open={this.state.editOrg} 
                              setValues={this._setValues}  
                              handleModalClose={this._handleModalClose} 
                              allOrganisations={this.state.allOrganisations} 
                              allLocations={this.state.allLocations} 
                              orgsList={this.state.orgsList}
                              selectedOrganisation = {this.state.selectedOrganisation}
                              tenantId={this.state.id}
                              applicationMode ={this.state.applicationMode} />
                        </Fragment> 
                         : null
                      } 
                    </Fragment>
                  }
                </Col>
                {this.state.selectedOrganisation.id != '' ?
                  <Col  s={12} m={6} l={6} xl={6}>
                    <Input type='select' s={12} m={6} l={6} xl={6} className="mt-5 pl-0" name="selectedLocation" label="location" onChange={this._handleLoc} value={this.state.selectedLocation.id} disabled={this.state.allOrganisations.length != 0 ? false : true}>
                      <option value="" disabled >Choose your option</option>
                      {
                        (Object.keys(this.state.allLocations)).map((iteratedValue, i) =>
                          <option id={i} value={this.state.allLocations[iteratedValue].id}>{this.state.allLocations[iteratedValue].name}</option>
                        )}
                    </Input >
                    {this.state.applicationMode == 'VIEW' ?
                      null :
                      <Fragment>
                        <Button className='col s12 m2 l2 xl2 orgIcon mt-8' disabled={this.state.allOrganisations.length != 0 ? false : true} name="addLoc" onClick={this._handleModal} >
                          <i className="material-icons" title='Add'>add_circle</i>
                        </Button>
                        <FormModal header={"Add Location"}  name="addLoc" open={this.state.addLoc} 
                      setValues={this._setValues}  
                      handleModalClose={this._handleModalClose} 
                      allOrganisations={this.state.allOrganisations} 
                      allLocations={this.state.allLocations} 
                      orgsList={this.state.orgsList} 
                      tenantId={this.state.id}
                      applicationMode ={this.state.applicationMode}
                      selectedOrganisation = {this.state.selectedOrganisation}/>
                        {(this.state.selectedLocation.id !== "") ?
                            <Fragment>
                              <Button className='col s12 m2 l2 xl2 orgIcon mt-8' name="deleteLoc" onClick={this._handleModal}  >
                                <i className="material-icons" title='Delete'>
                                  delete</i>
                              </Button>
                              <FormDeleteModal header={"Delete Location"}  name="deleteLoc" open={this.state.deleteLoc} 
                              setValues={this._setValues}  
                              handleModalClose={this._handleModalClose} 
                              allOrganisations={this.state.allOrganisations} 
                              allLocations={this.state.allLocations} 
                              orgsList={this.state.orgsList}
                              selectedLocation = {this.state.selectedLocation} 
                              tenantId={this.state.id}
                              applicationMode ={this.state.applicationMode}/>
                            


                              <Button className='col s12 m2 l2 xl2 orgIcon mt-8' name="editLoc" onClick={this._handleModal} >
                                <i className="material-icons" title='Update'>
                                  edit</i>
                              </Button>
                              <FormEditModal header={"Edit Location"}  name="editLoc" open={this.state.editLoc} 
                              setValues={this._setValues}  
                              handleModalClose={this._handleModalClose} 
                              allOrganisations={this.state.allOrganisations} 
                              allLocations={this.state.allLocations} 
                              orgsList={this.state.orgsList}
                              selectedLocation = {this.state.selectedLocation}
                              tenantId={this.state.id}
                              applicationMode ={this.state.applicationMode} />
                            </Fragment> : null
                        }
                      </Fragment>
                    }
                  </Col> : null
                }
             </Col> 
            </Row> 
        </Col>
        { this.state.selectedOrganisation.id !== ''  &&
          <Col className="z-depth-4 col-centered mb-3 p-0" s={12} m={12} l={12} xl={12}>
            <TabsProject currentProject = {this.state.currentProject} selectedOrganisation={this.state.selectedOrganisation} selectedLocation ={this.state.selectedLocation} applicationMode={this.state.applicationMode} upadateNew={this.upadateNew}
            SaveStudyConfig= {this.SaveStudyConfig}
            SaveEnrollment ={ this.SaveEnrollment}
            SaveRoles={this.SaveRoles}
            SavePages={this.SavePages}
            
            /> 
          </Col>
        }
        <Col className="col-centered mb-3 p-0 form-footer" s={12} m={12} l={12} xl={12}>
        {/* Display Edit in view mode */}
        {this.state.applicationMode == "VIEW" && 
           <Button className="mt-3 CreateProjectPublish btn_primary"  name="EDIT" onClick={(e) => this._handleAppMode('EDIT')}  waves='light'>Edit</Button>}

          {/* Display publish in create and edit mode */}
          {this.state.applicationMode !== 'VIEW' && 
          <Fragment>
              <Button className="mt-3 CreateProjectPublish btn_primary" onClick={this.finalPublish}  disabled= {(this.state.name !=='') ? false : true} waves='light'>Publish</Button>
            {/* Display Discard in if project name is not empty */}
             <Button className="mt-3 mr-1 CreateProjectPublish btn_primary" onClick={this._discard} disabled= {(this.state.name !=='') ? false : true} waves='light'>Save</Button>
             <Button className="mt-3 mr-1 CreateProjectPublish btn_primary" onClick={this._discard}  disabled= {(this.state.name !=='') ? false :  true } waves='light'>Discard</Button>
              </Fragment> 
            }
        </Col>
      </Row> :  
            <Col s={12} className="valign-wrapper loader-overlay">
            <Preloader className="spinner" size='big' />
         </Col>
          } 
      </Fragment>

    )
  }
}
export default CreateProject;
