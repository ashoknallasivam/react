import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Preloader, Col } from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
import PropTypes from "prop-types";
import FormModal from '../../components/base/formModal';
import TabsProject from '../../components/tabsProject'
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
          value : ''
      },
      selectedLocation: {
        value:''
      },
      applicationMode:'',
      addOrg: false,
      addLoc: false,
      delLoc: false,
      delOrg: false,
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
    if (this.props.location.state !== undefined) {
      this.props.actions.fetchSingleTenant(this.props.location.state.id);
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
    else {
      this.setState({ applicationMode: "CREATE" })
    }
  }
  _handleAppMode = (value) => {
    this.setState({
      applicationMode: value
    })
  }
  componentWillReceiveProps(props) {
    let currentProject = props.projectList[props.location.state.id];
    this.setState({ currentProject: currentProject,
                      name:  currentProject.name,
                      id:  currentProject.id,
                      allOrganisations: currentProject.orgs,
                      orgsList :  currentProject.orgsList
                    })
  }
  _handleOrgDropdown = (e) => {
          e.preventDefault();
          let allLocations = {};
            this.state.orgsList.map((data,index)=>{
            if(data.parentId ==  e.target.value ){
             allLocations = {...allLocations, [data.id] :  {...data}}
            }
          }) 
          this.setState({
            selectedOrganisation: e.target.value,
            allLocations,
            selectedLocation:{
              id:''
            }
          });
        
  }
_populateLocation = (data) =>{
  let location ;
        data.map((item =>  { 
          if(Object.key(data.children).length > 0){
            _populateLocation(data.children) 
          }else{
            location = [...location,data]
          }
        })) 
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
      [e]:data
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
    if(this.state.selectedOrganisation !== ""){
      confirm("Delete Organization?")
      delete this.state.allOrganisations[this.state.selectedOrganisation]
    }

    this.setState({
      selectedOrganisation: {
        value:''
      },
      allLocations:[]
    })
    
  }
  _handleModalClose =(e) =>{
    this.setState({
       [e] :  !this.state[e]
    })
  }
  _discard = () => {
    this.setState({
      name: this.state.currentProject.name,
      id: this.state.currentProject.id,
      allOrganisations: this.state.currentProject.orgs,
      orgsList: this.state.currentProject.orgsList,
      allLocations: [],
      selectedOrganisation: {
        value:''
      },
      selectedLocation: {
        value:''
      },
      

    })
  }
  render() {
    return (
      <Fragment>
         {(Object.keys( this.state.currentProject).length > 2 || this.state.applicationMode == "CREATE") ? 
      <Row className="create-project-page">
        <Col className="z-depth-4 col-centered mt-2" s={12} m={12} l={12} xl={12}>
            <Row className="project-form">
              <Col s={12} m={12} l={12} xl={12} className=' mt-1'>
                <Input className={this.state.applicationMode == 'VIEW' ? 'labelText mt-0' : this.state.applicationMode == 'EDIT' ? 'labelText mt-0' : 'mt-0'} s={12} m={4} l={4} xl={4} label="Project Name" name="name" onChange={this._hanldetenatnInput} value={this.state.name} disabled={this.state.applicationMode == "VIEW" ? true : false} />
                {/* <p className={ this.state.validations.name ? "red-text darken-4" : "hide"  } > Please fill the Project name to add Organisation  </p> */}
                {(this.state.applicationMode == 'CREATE' && this.state.name !== '') || this.state.applicationMode == 'EDIT' ?
                  <Button className="btn waves-effect waves-light right" onClick={this._discard} >Discard</Button>
                  : null}
                {(this.state.applicationMode === 'VIEW') ?
                  <Button className="btn waves-effect waves-light right " name="EDIT" onClick={(e) => this._handleAppMode('EDIT')}> EDIT </Button> : null}
              </Col>
             
              <Col s={12} m={12} l={12} xl={12} className=' mt-2'>
                 <Col  s={12} m={6} l={6} xl={6}>
                  <Input type='select' s={12} m={6} l={6} xl={6} className="mt-5 pl-0" name="organisation" label="Organization" onChange={this._handleOrgDropdown} value={this.state.selectedOrganisation.value} disabled={this.state.name !="" ?false : true } >
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
                       />
                      {this.state.selectedOrganisation.value != "" ?
                        <Fragment>
                          <Button className='orgIcon col s12 m2 l2 xl2 mt-8' onClick={this._handleDelete} >
                            <i className="material-icons" title='Delete'>delete</i>
                          </Button>


                          <Button className='orgIcon col s12 m2 l2 xl2 mt-8' >
                            <i className="material-icons" title='Update'>edit</i>
                          </Button>
                          <FormModal header={"Edit Organization"}  name="editOrg" open={this.state.editOrg} 
                              setValues={this._setValues}  
                              handleModalClose={this._handleModalClose} 
                              allOrganisations={this.state.allOrganisations} 
                              allLocations={this.state.allLocations} 
                              orgsList={this.state.orgsList}
                              selectedOrganisation = {this.state.selectedOrganisation} />
                        </Fragment> 
                         : null
                      } 
                    </Fragment>
                  }
                </Col>
                {this.state.selectedOrganisation.value != '' ?
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
                      orgsList={this.state.orgsList} />
                        {
                          (this.state.selectedLocation.value !== "") ?
                            <Fragment>
                              <Button className='col s12 m2 l2 xl2 orgIcon mt-8' >
                                <i className="material-icons" title='Delete'>
                                  delete
                                                </i>
                              </Button>
                              <Button className='col s12 m2 l2 xl2 orgIcon mt-8' >
                                <i className="material-icons" title='Update'>
                                  edit</i>
                              </Button>
                              <FormModal header={"Edit Location"}  name="editLoc" open={this.state.editLoc} 
                              setValues={this._setValues}  
                              handleModalClose={this._handleModalClose} 
                              allOrganisations={this.state.allOrganisations} 
                              allLocations={this.state.allLocations} 
                              orgsList={this.state.orgsList}
                              selectedLocation = {this.state.selectedLocation} />


                            </Fragment> : null
                        }
                      </Fragment>
                    }
                  </Col> : null
                }
             </Col> 
            </Row> 
        </Col>
        { this.state.selectedOrganisation.value !== ''  &&
          <Col className="z-depth-4 col-centered mb-3 p-0" s={12} m={12} l={12} xl={12}>
            <TabsProject currentProject = {this.state.currentProject} selectedOrganisation={this.state.selectedOrganisation} selectedLocation ={this.state.selectedLocation} applicationMode={this.state.applicationMode}/> 
          </Col>
        }
        <Col className="col-centered mb-3 p-0 form-footer" s={12} m={12} l={12} xl={12}>
          {this.state.applicationMode !== 'CREATE' ? null :
            <Button className="mb-5  mr-2 CreateProjectSave btn_primary" waves='light'>Save </Button>
          }
          {this.state.applicationMode == 'EDIT' ?
            <Button className="mb-5 CreateProjectPublish btn_primary" onClick={this.finalUpdate} waves='light'>Update</Button>
            : this.state.applicationMode == 'CREATE' || this.state.applicationMode == 'CLONE' ?
              <Button className="mb-5 CreateProjectPublish btn_primary" onClick={this.finalPublish} waves='light'>Publish</Button>
              : null
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
