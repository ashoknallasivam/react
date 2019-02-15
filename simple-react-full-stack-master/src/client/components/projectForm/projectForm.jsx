import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AddOrganization from './create_organzation';
import AddLocation from './create_location';
import { Row,Input,Button,Modal } from 'react-materialize';

class ProjectForm extends Component {
    constructor(props){
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
            radio: 'VIEW'
        };
    }
    handleViewEditRadio = (value) => {
        console.log(value);
        this.setState({ radio: value});
        this.props.actions.ChangeMode(value);
    }
    handleorgLocBind = (e) => {
        this.setState({ orgLocBind: e.target.value });
    }
    UpdateTenant = () => {
        this.props.actions.UpdateTenant(this.state.tenantName);
    }
    handleTenantValidation = () => {
            if(this.state.tenantName !== ''){
                this.setState({ tenantNameError: false });
                $('#OrganizationModal').modal('open')
            }else{
                this.setState({ tenantNameError: true });
            }
    }
    handleTenantInput = (e) => {
        this.setState({ tenantNameError: false });
        this.setState({ tenantName: e.target.value });
    }
    handleOrgDropdown = (e) => {
        this.setState({ selectedDropdownOrg: e.target.value });
        if (this.props.ApplicationMode == 'VIEW') {
            this.props.actions.SelectedDropdownOrg(e.target.value);
            this.props.actions.FetchMenuRoleAccess();
            this.props.actions.FetchResourceRoleAccess();
        }else{
            this.props.actions.SelectedDropdownOrg(e.target.value);
        }
    }
    handleLocDropdown = (e) => {
        this.setState({ selectedDropdownLoc: e.target.value });
        if (this.props.ApplicationMode == 'VIEW') {
            this.props.actions.SelectedDropdownLoc(e.target.value);
            this.props.actions.FetchMenuRoleAccess();
            this.props.actions.FetchResourceRoleAccess();
            this.props.actions.FetchEnrollmentTarget();
        }else{
            this.props.actions.SelectedDropdownLoc(e.target.value);
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
        }
        else{//for create mode
            console.log('what');
            this.props.actions.clearOrg();
        }
    }
    updateOrganizations = () => {
        let newOrg = {};
        if(this.state.organizationName !==''){
            newOrg.id = this.state.newOrg;
            newOrg.level = 0;
            newOrg.name = this.state.organizationName;
            newOrg.tenantID = 0;
            newOrg.ttoId = null;
            newOrg.parentID = null;
            newOrg.flag = "createFlag";
            console.log(newOrg);
            // organizations = this.props.organizations;
            const isDuplicatte = this.props.organizations.map((iteratedValue)=>{
                if(iteratedValue.name === this.state.organizationName){
                    return true
                }
            });

            if(isDuplicatte.includes(true)){
                window.Materialize.toast('Already Exist', 5000)
                return false;
            }else{
                $('#OrganizationModal').modal('close')
            }
            this.props.actions.UpdateOrganization(newOrg);
        }
        this.setState({ organizationName: '',  newOrg: this.state.newOrg + 1 });
    }
    updateOrganizationName = (e) => {
        this.setState({ organizationName: e.target.value});
    }
    updateLocations = () => {
        let newOrg = {};
        if(this.state.locationName !==''){
            const parent = this.props.organizations.concat(this.props.locations);
            newOrg.id = this.state.newOrg;
            let selectedParentDetails = parent.filter(item => item.id == this.state.orgLocBind)[0];
            newOrg.level = selectedParentDetails.level + 1;
            newOrg.parentID = selectedParentDetails.id;
            newOrg.ttoId = selectedParentDetails.ttoId == null ?  selectedParentDetails.id: selectedParentDetails.ttoId;
            newOrg.name = this.state.locationName;
            newOrg.tenantID = selectedParentDetails.tenantID;
            newOrg.flag = "createFlag";
            const isDuplicatte = parent.map((iteratedValue)=>{
                if(iteratedValue.name === this.state.locationName){
                    return true
                }
            });

            if(isDuplicatte.includes(true)){
                window.Materialize.toast('Already Exist', 5000)
                return false;
            }else{
                $('#LocationModal').modal('close')
            }
            
            this.props.actions.UpdateLocation(newOrg);
        }
        this.setState({ locationName: '', newOrg: this.state.newOrg + 1 });
        
    }
    updateLocationName = (e) => {
        this.setState({ locationName : e.target.value });
}
    DeleteOrg = () => {
        this.props.actions.DeleteOrgDetails(this.state.selectedDropdownOrg)
        this.setState({
            selectedDropdownOrg:{},
            orgDefaultValue:''
        });

    }
    DeleteLoc = () => {
        debugger;
        this.props.actions.DeleteLocDetails(this.state.selectedDropdownLoc)
        this.setState({
            selectedDropdownLoc:{},
            locDefaultValue:''
        });

    }
    render() {
        const parent = this.props.organizations.concat(this.props.locations);
        console.log(parent);
        console.log(this.state.viewMode);
        return (
            <Row className="container project-form">
                <div className='col s12 m12 l12 xl12 mt-2'>
                    <Input className='mt-0's={12} m={8} l={8} xl={8} label="Project Name" onChange={this.handleTenantInput} onBlur={this.UpdateTenant} value={this.state.tenantName} readOnly={this.props.ApplicationMode == 'VIEW' ? true : false}/>
                    {this.props.ApplicationMode !== 'CREATE'?
                        <div className="view-and-edit-mode col s12 m4 l4 xl4">
                            <input type="radio" id="view_radio" value="VIEW" name="viewandedit" onChange={(e) => this.handleViewEditRadio('VIEW')} label="View" checked={this.state.radio == 'VIEW' ? true: false} />
                            <label for="view_radio">View</label>
                            <input type="radio" id="edit_radio" value="EDIT" name="viewandedit" onChange={(e) => this.handleViewEditRadio('EDIT')} label="Edit" checked={this.state.radio == 'EDIT' ? true: false} />
                            <label for="edit_radio">Edit</label>
                        </div>
                        :null
                    }
                </div>
                <p className={this.state.tenantNameError ? "show col s12 m12 l12 xl12 mt-2" : "hide"} >Tenant name is required</p>
                <div className='col s12 m6 l6 xl6 mt-2'>
                    <select check={this.state.selectedDropdownOrg} className="browser-default col input-field s12 m6 l6 x6" onChange={this.handleOrgDropdown} value={this.state.selectedDropdownOrg}>
                        <option selected={this.state.orgDefaultValue == ''?true:false} value=''>Select an Organization</option>
                        {
                            this.props.organizations.map((iteratedValue)=>{
                                return <option value={iteratedValue.id}>{iteratedValue.name}</option>
                            })
                        }
                    </select>
                    {this.props.ApplicationMode == 'VIEW' ?
                        null: <Fragment>
                                <Button className='Add_ordgaization btn_add col s12 m2 l2 xl2 btn_secondary' onClick={this.handleTenantValidation}>Add</Button>
                                <Button className='Add_ordgaization btn_add col s12 m2 l2 xl2 btn_secondary' onClick={this.DeleteOrg}>Delete</Button>
                              </Fragment> 
                    }
                    <Modal
                        header='Add Organization'
                        id='OrganizationModal'
                        // trigger={<Button className="Add_ordgaization btn_add col s12 m4 l4 xl4 btn_secondary">Add</Button>}
                    >
                        <Input s={12} m={12} l={12} xl={12} onChange={this.updateOrganizationName} value={this.state.organizationName} />
                        <Button className='btn_secondary' onClick={this.updateOrganizations} >Submit</Button>
                    </Modal>
                </div>
                {
                    
                    this.props.organizations.length > 0 ? 
                        <div className='col s12 m6 l6 xl6 mt-2'>
                            <select check={this.state.selectedDropdownLoc} className="browser-default col input-field s12 m6 l6 xl6" onChange={this.handleLocDropdown} value={this.state.selectedDropdownLoc}>
                                <option selected={this.state.locDefaultValue == ''? true:false} value="">Select a Location</option>
                                {
                                    this.props.locations.map((iteratedValue)=>{
                                        if(iteratedValue.ttoId == this.props.selectedCurrentTTO){
                                            return <option value={iteratedValue.id} selected={iteratedValue.name === this.state.locationName?true:false}>{iteratedValue.name}</option>
                                        }
                                    })
                                }
                            </select>
                            
                            {this.props.ApplicationMode == 'VIEW' ?
                                null: 
                                    <Fragment>
                                        <Button className='col s12 m2 l2 xl2 Add_Location btn_add btn_secondary' onClick={() => {
                                                $('#LocationModal').modal('open')
                                            }}>Add</Button>
                                        <Button className='Add_ordgaization btn_add col s12 m2 l2 xl2 btn_secondary' onClick={this.DeleteLoc}>Delete</Button>
                                    </Fragment>
                            }
                            <Modal
                                header='Add Location'
                                id='LocationModal'>
                                <Input label="Location" s={12} m={6} l={6} xl={6} onChange={this.updateLocationName} value={this.state.locationName} />
                                <select className="browser-default" onChange={this.handleorgLocBind} value={this.state.orgLocBind}>
                                    <option selected disabled value="">Select a parent</option>
                                    {
                                        parent.map((iteratedValue)=>{
                                            return <option value={iteratedValue.id}>{iteratedValue.name}</option>
                                        })
                                    }
                                </select>
                                <Button className="btn_secondary" onClick={this.updateLocations} > Submit </Button>
                            </Modal>
                        </div> : null
                }
            </Row>
        );
    }
}


export default (ProjectForm);
