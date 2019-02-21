import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AddOrganization from './create_organzation';
import AddLocation from './create_location';
import { Row, Input, Button, Modal } from 'react-materialize';
//import {$} from 'jquery';

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: false,
            tenantName: '',
            organizationName: '',
            locationName: '',
            selectedDropdownOrg: '',
            selectedDropdownLoc: '',
            newOrg: 1,
            disabled: 'disabled',
            tenantNameError: false,
            orgLocBind: '',
	        orgDefaultValue:'',
            locDefaultValue:'',
	        selectedTlOrg:'',
            selectedLlOrg:'',
            radio: 'VIEW',
            disabledSelectOrg: false,
            disabledSelectLoc: false
        };
    }
    handleViewEditRadio = (value) => {
        this.setState({ radio: value});
        this.props.actions.ChangeMode(value);
    }
    handleDiscardDetails = () => {
        if (this.props.ApplicationMode == 'CREATE') {
                this.setState({
                    tenantName:'',
                    disabledSelectOrg: false,
                })
                this.props.actions.clearOrg();
        }else{
            this.setState({
                tenantName:'',
            })
            this.props.actions.clearOrg();
            this.props.actions.selectedOrg(this.props.projectInfo.id);
            this.setState({ tenantName: this.props.selectedOrg.name });
            this.props.actions.UpdateTenant(this.props.selectedOrg.name);
            this.props.selectedOrg.topLevelOrg.map(org => this.props.actions.UpdateOrganization(org));
            this.props.selectedOrg.lowerLevelOrg.map(lorg => this.props.actions.UpdateLocation(lorg));
            this.props.selectedOrg.roles.map(role => this.props.actions.AddRoleDetails(role));
            this.props.actions.FetchRaConfig(this.props.selectedOrg.id);
        }
    }
    handleorgLocBind = (e) => {
        this.setState({ orgLocBind: e.target.value });
    }
    UpdateTenant = () => {
        this.props.actions.UpdateTenant(this.state.tenantName);
    }
    handleTenantValidation = () => {
        if (this.state.tenantName !== '') {
            this.setState({ tenantNameError: false });
            $('#OrganizationModal').modal('open')
        } else {
            this.setState({ tenantNameError: true });
        }
    }
    handleUpdateTLOrg =() => {
        $('#UpdateOrganizationModal').modal('open')
    }
    handleUpdateLLOrg =() => {
        $('#UpdateLocationModal').modal('open')
    }
    handleTenantInput = (e) => {
        this.setState({ tenantNameError: false });
        this.setState({ tenantName: e.target.value });
    }
    handleOrgDropdown = (e) => {
        this.setState({ selectedDropdownOrg: e.target.value,
            disabledSelectOrg:true,
            disabledSelectLoc: false
        });
        if (this.props.ApplicationMode !== 'CREATE') {
            var index = e.target.selectedIndex;
            var optionElement = e.target.childNodes[index]
            var option =  optionElement.getAttribute('flag');
            this.props.actions.SelectedDropdownOrg(e.target.value, option);
            this.props.actions.FetchMenuRoleAccess();
            this.props.actions.FetchResourceRoleAccess();

            const selectedValue = e.target.value;
            let filteredTlOrg = this.props.organizations.filter((tloOrg)=> tloOrg.id == selectedValue);
            this.setState({ 
                selectedTlOrg: filteredTlOrg[0]
            });
        }else{
            var index = e.target.selectedIndex;
            var optionElement = e.target.childNodes[index]
            var option =  optionElement.getAttribute('flag');
            this.props.actions.SelectedDropdownOrg(e.target.value, option);
            const selectedValue = e.target.value;
            let filteredTlOrg = this.props.organizations.filter((tloOrg)=> tloOrg.id == selectedValue);
            this.setState({ 
                selectedTlOrg: filteredTlOrg[0]
            });
        }
    }
    handleLocDropdown = (e) => {
        this.setState({ selectedDropdownLoc: e.target.value,disabledSelectLoc:true  });
        if (this.props.ApplicationMode == 'VIEW') {
            var index = e.target.selectedIndex;
            var optionElement = e.target.childNodes[index]
            var option =  optionElement.getAttribute('flag');
            this.props.actions.SelectedDropdownLoc(e.target.value, option);
            this.props.actions.FetchMenuRoleAccess();
            this.props.actions.FetchResourceRoleAccess();
            this.props.actions.FetchEnrollmentTarget();
			this.props.actions.FetchRaConfig(this.props.selectedOrg.id);
            const selectedValue = e.target.value;
            let filteredLlOrg = this.props.locations.filter((lloOrg)=> lloOrg.id == selectedValue);
            this.setState({ 
                selectedLlOrg: filteredLlOrg[0]
            });
        }
        else{
            var index = e.target.selectedIndex;
            var optionElement = e.target.childNodes[index]
            var option =  optionElement.getAttribute('flag');
            this.props.actions.SelectedDropdownLoc(e.target.value, option);
            this.props.actions.FetchEnrollmentTarget();
	   const selectedValue = e.target.value;
        let filteredLlOrg = this.props.locations.filter((lloOrg)=> lloOrg.id == selectedValue);
        this.setState({ 
            selectedLlOrg: filteredLlOrg[0]
        });
        }
    }
    componentDidMount() {
        //user clear org data here 
        if (this.props.ApplicationMode == 'VIEW') {
            this.setState({ viewMode: true });
            this.setState({ tenantName: this.props.selectedOrg.name });
            this.props.actions.UpdateTenant(this.props.selectedOrg.name);
            this.props.selectedOrg.topLevelOrg.map(org => this.props.actions.UpdateOrganization(org));
            this.props.selectedOrg.lowerLevelOrg.map(lorg => this.props.actions.UpdateLocation(lorg));
            this.props.actions.FetchEnrollmentTarget();
            this.props.actions.FetchRaConfig(this.props.selectedOrg.id);
        }
        else if (this.props.ApplicationMode == 'CLONE') {
            this.setState({ viewMode: true });
            //this.setState({ tenantName: this.props.selectedOrg.name });
            this.props.selectedOrg.topLevelOrg.map(org => this.props.actions.UpdateOrganization(org));
            this.props.selectedOrg.lowerLevelOrg.map(lorg => this.props.actions.UpdateLocation(lorg));
        }
        else {//for create mode
            this.props.actions.clearOrg();
        }
    }
    updateOrganizations = () => {
        let newOrg = {};

        if(this.state.organizationName !==''){
            newOrg.id = "c" + this.state.newOrg;
            newOrg.level = 0;
            newOrg.name = this.state.organizationName;
            newOrg.tenantID = 0;
            newOrg.ttoId = null;
            newOrg.parentID = null;
            newOrg.flag = "createFlag";
            // organizations = this.props.organizations;
            const isDuplicatte = this.props.organizations.map((iteratedValue) => {
                if (iteratedValue.name === this.state.organizationName) {
                    return true
                }
            });

            if (isDuplicatte.includes(true)) {
                window.Materialize.toast('Already Exist', 5000)
                return false;
            } else {
                $('#OrganizationModal').modal('close')
            }
            this.props.actions.UpdateOrganization(newOrg);
        }
        this.setState({ organizationName: '', newOrg: this.state.newOrg + 1 , orgDefaultValue:'' });
    }
    updateOrganizationName = (e) => {
            this.setState({ 
                organizationName: e.target.value,
                selectedTlOrg:{
                    name:e.target.value
                }
            });
    }
    updateLocations = () => {
        let newOrg = {};
        if (this.state.locationName !== '') {
            const parent = this.props.organizations.concat(this.props.locations);
            newOrg.id = "c" + this.state.newOrg;
            let selectedParentDetails = parent.filter(item => item.id == this.state.orgLocBind)[0];
            newOrg.level = selectedParentDetails.level + 1;
            newOrg.parentID = selectedParentDetails.id;
            newOrg.ttoId = selectedParentDetails.ttoId == null ? selectedParentDetails.id : selectedParentDetails.ttoId;
            newOrg.name = this.state.locationName;
            newOrg.tenantID = selectedParentDetails.tenantID;
            newOrg.flag = "createFlag";
            const isDuplicatte = parent.map((iteratedValue)=>{
                if(iteratedValue.name === this.state.locationName){
                    return true
                }
            });

            if (isDuplicatte.includes(true)) {
                window.Materialize.toast('Already Exist', 5000)
                return false;
            } else {
                $('#LocationModal').modal('close')
            }

            this.props.actions.UpdateLocation(newOrg);
        }
        this.setState({ locationName: '', newOrg: this.state.newOrg + 1 });

    }
    updateLocationName = (e) => {
            this.setState({ 
                locationName : e.target.value,
                selectedLlOrg:{
                    name:e.target.value
                }
             });
    }
    UpdateTlOrg = () => {
        this.props.actions.UpdateTlOrg(this.state.selectedDropdownOrg,this.state.organizationName),
        $('#UpdateOrganizationModal').modal('close'),
        this.setState({
            disabledSelectOrg:false
        })
    }
    UpdateLlOrg = () => {
        this.props.actions.UpdateLlOrg(this.state.selectedDropdownLoc,this.state.locationName),
        $('#UpdateLocationModal').modal('close'),
        this.setState({
            disabledSelectLoc:false
        })
    }
    DeleteOrg = () => {
        this.props.actions.DeleteOrgDetails(this.state.selectedDropdownOrg),
        $('#DeleteOrganizationModal').modal('close')
        this.setState({
            selectedDropdownOrg:{},
            orgDefaultValue:'',
            disabledSelectOrg:false
        });

    }
    DeleteLoc = () => {
        this.props.actions.DeleteLocDetails(this.state.selectedDropdownLoc),
        $('#DeleteLocationModal').modal('close')
        this.setState({
            selectedDropdownLoc:{},
            locDefaultValue:'',
            disabledSelectLoc:false
        });

    }
    render() {
        const parent = this.props.organizations.concat(this.props.locations);
        return (
            <Row className="project-form">
                <div className='col s12 m12 l12 xl12 mt-1'>
                    <Input className={this.props.ApplicationMode == 'VIEW'? 'labelText mt-0':this.props.ApplicationMode == 'EDIT'? 'labelText mt-0' : 'mt-0'} s={12} m={4} l={4} xl={4} label="Project Name" onChange={this.handleTenantInput} onBlur={this.UpdateTenant} value={this.state.tenantName} readOnly={this.props.ApplicationMode == 'VIEW' ? true : false}/>
                    {this.props.ApplicationMode !== 'CREATE'?
                        <div className="view-and-edit-mode col s12 m4 l4 xl4">
                            <input type="radio" id="view_radio" value="VIEW" name="viewandedit" onChange={(e) => this.handleViewEditRadio('VIEW')} label="View" checked={this.state.radio == 'VIEW' ? true: false} />
                            <label for="view_radio">View</label>
                            <input type="radio" id="edit_radio" value="EDIT" name="viewandedit" onChange={(e) => this.handleViewEditRadio('EDIT')} label="Edit" checked={this.state.radio == 'EDIT' ? true: false} />
                            <label for="edit_radio">Edit</label>
                        </div>
                        : null
                    }
                    {(this.props.ApplicationMode == 'CREATE' && this.state.tenantName !== '')|| this.props.ApplicationMode == 'EDIT' ?
                        
                        <div className="col s12 m4 l4 xl4 pr-0 discardDetails">
                            <button className="btn waves-effect waves-light pr-0" onClick={this.handleDiscardDetails}>Discard</button>
                        </div>
                        :null
                    }
                    
                </div>
                <p className={this.state.tenantNameError ? "show errorMessage col s12 m12 l12 xl12 m-0 pl-2" : "hide"} >Tenant name is required</p>
                <div className='col s12 m12 l12 xl12 mt-2'>
			        <div className='col s12 m6 l6 xl6'>
                        <label className="orgLabel" >Organization</label>
                            <select check={this.state.selectedDropdownOrg} className="browser-default col input-field s12 m6 l6 x6 mt-5 pl-0" onChange={this.handleOrgDropdown} value={this.state.selectedDropdownOrg} disabled={ this.props.organizations == ''? true:false}>
                                <option defaultValue={this.state.orgDefaultValue == ''?true:false}  key={this.state.orgDefaultValue == ''?true:false}
                                disabled={ this.state.disabledSelectOrg }>Select Organization</option>
                                    {
                                        this.props.organizations.map((iteratedValue,i)=>{
                                            return <option key={i} value={iteratedValue.id} 
                                            flag={iteratedValue.flag ? iteratedValue.flag: "viewFlag"}>{iteratedValue.name}</option>
                                        })
                                    }
                            </select>
                        {this.props.ApplicationMode == 'VIEW'?
                        null: <Fragment>
                                <Button className='orgIcon col s12 m2 l2 xl2 mt-8' onClick={this.handleTenantValidation}>
                                    <i className="material-icons" title='Add'>
                                        add_circle
                                    </i>
                                </Button>
		                {
                         this.props.selectedCurrentTTO != "" ?
                            <Fragment> 
                                <Button className='orgIcon col s12 m2 l2 xl2 mt-8' onClick={() => {$('#DeleteOrganizationModal').modal('open')}}>
                                    <i className="material-icons" title='Delete'>
                                        delete
                                    </i>
                                </Button>
                                <Button className='orgIcon col s12 m2 l2 xl2 mt-8' onClick={this.handleUpdateTLOrg}>
                                    <i className="material-icons" title='Update'>
                                        edit
                                    </i>
                                </Button>
				            </Fragment>:null
                        }
                              </Fragment> 
                    }
                        <Modal
                            header='Add Organization'
                            id='OrganizationModal'
                        >
                        <Input label='Add Organization' 
                        className={this.props.ApplicationMode == 'VIEW'? 'labelText mt-0':this.props.ApplicationMode == 'EDIT'? 'labelText mt-0' : 'mt-0 pl-2'} 
                        s={12} m={12} l={12} xl={12} onChange={this.updateOrganizationName} value={this.state.organizationName} />
                        <div className="col s12 m12 l12 xl12">
                                    <button className="btn btn_secondary modal-close otherButtonAddDetUpt modalButton mb-2 ml-1">Cancel</button>
                                    <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this.updateOrganizations} >Add</Button>
                                </div>
                        </Modal>
			            <Modal
                            header='Update Organization'
                            id='UpdateOrganizationModal'
                        >
                            <Input className={this.props.ApplicationMode == 'VIEW'? 'labelText mt-0':this.props.ApplicationMode == 'EDIT'? 'labelText mt-0' : 'mt-0 pl-2'}
                            label='Update Organization' s={12} m={12} l={12} xl={12} onChange={this.updateOrganizationName} name="orgName" 
                            value={this.state.selectedTlOrg.name} />
                            <div className="col s12 m12 l12 xl12">
                                <button className="btn btn_secondary modal-close otherButtonAddDetUpt modalButton mb-2 ml-1">Cancel</button>
                                <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this.UpdateTlOrg} >Update</Button>
                            </div>
                        </Modal>
                        <Modal
                            header='Please Confirm '
                            id='DeleteOrganizationModal'
                        >
                            <p>Are you sure you want to delete it?</p>
                            <div className="col s12 m12 l12 xl12">
                                <button className="btn btn_secondary modal-close otherButtonAddDetUpt modalButton mb-2 ml-1">Cancel</button>
                                <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this.DeleteOrg} >Delete</Button>
                            </div>
                        </Modal>
                </div>
                {
     
                    this.props.organizations.length > 0 ? 
                        <div className='col s12 m6 l6 xl6'>
                                <label className="locLabel" >Location</label>
                                <select check={this.state.selectedDropdownLoc} className="browser-default col input-field s12 m6 l6 xl6 mt-5 pl-0" onChange={this.handleLocDropdown} value={this.state.selectedDropdownLoc} disabled={ this.props.locations == ''? true:false}>
                                    <option key={this.state.locDefaultValue == ''? true:false} defaultValue={this.state.locDefaultValue == ''? true:false} 
                                    disabled={ this.state.disabledSelectLoc }>Select a Location</option>
                                    {
                                        this.props.locations.map((iteratedValue)=>{
                                            if(iteratedValue.ttoId == this.props.selectedCurrentTTO){
                                                return <option value={iteratedValue.id} 
                                                defaultSelected={iteratedValue.name === this.state.locationName?true:false}>{iteratedValue.name}</option>
                                            }
                                        })
                                    }
                                </select>

                            {this.props.ApplicationMode == 'VIEW' ?
                                null: 
                                    <Fragment>
                                        <Button className='col s12 m2 l2 xl2 orgIcon mt-8' onClick={() => {
                                        $('#LocationModal').modal('open')
                                        }}>
                                            <i className="material-icons" title='Add'>
                                                add_circle
                                            </i>
                                        </Button>
			                    {
                                    this.props.selectedCurrentLTO != "" ?
                                        <Fragment> 
                                            <Button className='col s12 m2 l2 xl2 orgIcon mt-8' onClick={() => {$('#DeleteLocationModal').modal('open')}}>
                                                <i className="material-icons" title='Delete'>
                                                    delete
                                                </i>
                                            </Button>
                                            <Button className='col s12 m2 l2 xl2 orgIcon mt-8' onClick={this.handleUpdateLLOrg}>
                                                <i className="material-icons" title='Update'>
                                                    edit
                                                </i>
                                            </Button>
                                        </Fragment>: null
                                }
                                    </Fragment>
                            }
                            <Modal
                                header='Add Location'
                                id='LocationModal'>
                                <Input className={this.props.ApplicationMode == 'VIEW'? 'labelText mt-0':this.props.ApplicationMode == 'EDIT'? 'labelText mt-0' : 'mt-0 pl-2'}
                                label='Add Location' s={12} m={6} l={6} xl={6} onChange={this.updateLocationName} value={this.state.locationName} />
                                <select className="browser-default" onChange={this.handleorgLocBind} value={this.state.orgLocBind}>
                                    <option defaultValue disabled value="">Select a parent</option>
                                    {
                                        parent.map((iteratedValue) => {
                                            return <option value={iteratedValue.id}>{iteratedValue.name}</option>
                                        })
                                    }
                                </select>
                                <div className="col s12 m12 l12 xl12">
                                        <button className="btn btn_secondary modal-close otherButtonAddDetUpt modalButton mb-2 ml-1">Cancel</button>
                                        <Button className="btn_secondary modalButton otherButtonAddDetUpt mb-2" onClick={this.updateLocations} > Add </Button>
                                    </div>
                            </Modal>
				            <Modal
                                header='Update Location'
                                id='UpdateLocationModal'>
                                <Input className={this.props.ApplicationMode == 'VIEW'? 'labelText mt-0':this.props.ApplicationMode == 'EDIT'? 'labelText mt-0' : 'mt-0 pl-2' }
                                label='Update Location' s={12} m={6} l={6} xl={6} onChange={this.updateLocationName} 
                                value={this.state.selectedLlOrg.name} />
                                
                                    <div className="col s12 m12 l12 xl12">
                                        <button className="btn btn_secondary modal-close otherButtonAddDetUpt modalButton mb-2 ml-1">Cancel</button>
                                        <Button className="btn_secondary modalButton otherButtonAddDetUpt mb-2" onClick={this.UpdateLlOrg} > Update </Button>
                                    </div>
                            </Modal>
				            <Modal
                                    header='Please Confirm'
                                    id='DeleteLocationModal'>
                                    <p>Are you sure you want to delete it?</p>
                                    <div className="col s12 m12 l12 xl12">
                                        <button className="btn btn_secondary modal-close otherButtonAddDetUpt modalButton mb-2 ml-1">Cancel</button>
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this.DeleteLoc} >Delete</Button>
                                    </div>
                                </Modal>
                        </div> : null
                }
                </div>
            </Row>
        );
    }
}


export default (ProjectForm);
