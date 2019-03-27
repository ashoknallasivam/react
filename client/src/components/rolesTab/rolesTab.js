import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import { TEST_MESSAGE } from '../../actions/types';


class RolesTab extends Component {
    constructor(props){
        super(props)
        this.state={
            roles:[],
            selectedLocation:'',
            selectedOrganisation:'',
            selectedDropdownRole:'',
            applicationMode:'',
            selectedRole:'',
            selectedMenu: [],
            selectedResource: [],
            roleStatus: false,
            isEditMode: false,
            menuList : '',
            resourceList :''
        };
        this.rolesData = {};
        this.changedRoles = true;
        this.menuData = {};
        this.resourceData = {};
           
    }
    roleBodyCreate = (description, id, isAssignable, isAutoAccess, isAutoAssignOnIntake, name) => {
        let roleBody = {};
        roleBody.description = description;
        roleBody.id = id;
        roleBody.isAssignable = isAssignable;
        roleBody.isAutoAccess = isAutoAccess;
        roleBody.isAutoAssignOnIntake = isAutoAssignOnIntake;
        roleBody.name = name;
        return roleBody;
    }//this is required because ds of the received role is different than ds of created role
    handleRoleDropdown = (e) => {
        this.setState({
            selectedDropdownRole: e.target.value,
            roleStatus: true,
            isEditMode: true,
        });
        const selectedValue = e.target.value;
        let filteredRoles = this.state.roles.filter((role) => role.id == selectedValue);
        let filteredRolesData = this.props.ApplicationMode == 'VIEW' ?
            this.roleBodyCreate(description, id, isAssignable, isAutoAccess, isAutoAssignOnIntake, name)
            : filteredRoles[0];
        this.setState({ selectedRole: filteredRolesData });// in view the ds of roles is different please take

        let filteredMenu= [] ;
         this.props.roles.map((item) => {if(item.id == selectedValue){  item.menus.map((data)=>{
            filteredMenu =[...filteredMenu,data.menuId] 
        })}});
        this.setState(prevState => ({
            selectedMenu: [prevState.selectedMenu, ...filteredMenu]
        }));


        
        let filteredResource= [] ;
         this.props.roles.map((item) => {if(item.id == selectedValue)
            {  item.resources.map((data)=>{
            filteredResource =[...filteredResource,data.resourceId] 
                })
            }}
        );
        this.setState(prevState => ({
            selectedResource: [prevState.selectedResource, ...filteredResource]
        }));
        //let filteredResource = this.props.resourceDetails.filter((resource) => resource.roleId == selectedValue);
       //this.props._roleParent(e.target.value);
    }
    handleRoleInput = (e) => {
        
        this.changedRoles = false;
        if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Attribute") {
            this.rolesData[e.target.name] = e.target.checked ? 1 : 0;
        } else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Resource") {
            this.resourceData[e.target.value] = e.target.checked ? 1 : 0;
        } else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Menu") {
            this.menuData[e.target.value] = e.target.checked ? 1 : 0;
        }
        else {
            this.rolesData[e.target.name] = e.target.value;
        }
       
    }
    UpdateRole = () => {

        const updatedRoles = this.props.roles.map((iteratedValue)=>{
            if(iteratedValue.id == this.state.selectedRole.id){
                const role = {
                    "id": this.state.selectedRole.id,
                    "name": this.rolesData.roleName?this.rolesData.roleName:iteratedValue.name,
                    "description": this.rolesData.roleDescription?this.rolesData.roleDescription:iteratedValue.description,
                    "orgId": iteratedValue.orgId,
                    "isAssignable": this.rolesData.isAssignable||this.rolesData.isAssignable==0?
                    this.rolesData.isAssignable:iteratedValue.isAssignable,
                    "isAutoAccess": this.rolesData.isAutoAccess||this.rolesData.isAutoAccess==0?
                    this.rolesData.isAutoAccess:iteratedValue.isAutoAccess,
                    "isAutoAssignOnIntake": this.rolesData.isAutoAssignOnIntake||this.rolesData.isAutoAssignOnIntake==0?
                    this.rolesData.isAutoAssignOnIntake:iteratedValue.isAutoAssignOnIntake,
                    "statusFlag": "modified"
                }
                return iteratedValue = role;
            }else{
                return iteratedValue;
            }
            
        });
        // const updatedMenuRoles = state.projectFormReducer.menuDetails.map((iteratedValue)=>{
        //     if(iteratedValue.roleId == dataroles.id){
        //         const MenuUpdated = {...iteratedValue.menuId, ...updatedNewMenuData};
        //         iteratedValue.menuId  = MenuUpdated;
        //         return  iteratedValue;  
        //     }else{
        //         return iteratedValue;
        //     }
            
        // });
        // const updatedResourceRoles = state.projectFormReducer.resourceDetails.map((iteratedValue)=>{
        //     if(iteratedValue.roleId == dataroles.id){
        //         const ResourceUpdated = {...iteratedValue.resourceId, ...updatedNewResourceData};
        //         iteratedValue.resourceId  = ResourceUpdated;
        //         return iteratedValue
        //     }else{
        //         return iteratedValue;
        //     }
            
        // });
        this.props.actions.AddRoleDetails(updatedRoles);
            // this.props.actions.AddMenuDetails(updatedMenuRoles);
            // this.props.actions.AddResourceDetails(updatedResourceRoles);
        this.setState({
            roleStatus: false,
        });
        this.rolesData = {};
    }
        componentDidMount(){
            let role=[];
            this.props.actions.fetchMenuList().then(response=>{ 
                this.setState({
                    menuList : response
                }) 
            });
            this.props.actions.fetchResourceList().then(response=>{ 
                this.setState({
                    resourceList : response
                }) 
            });
            this.props.selectedLocation.roles.map((item,i)=>{
                item ={
                        ...item,
                    isAssignable : item.isAssignable.data[0],
                    isAutoAccess : item.isAutoAccess.data[0],
                    isAutoAssignOnIntake : item.isAutoAssignOnIntake.data[0],

                } 
                role = [...role, item]
            })
            this.setState({
                roles : role,
                selectedLocation:this.props.selectedLocation,
                selectedOrganisation:this.props.selectedOrganisation,
                roles :role
            })
        }
        componentWillReceiveProps(props){
            let role=[];
            props.selectedLocation.roles.map((item,i)=>{
                item ={
                        ...item,
                    isAssignable : item.isAssignable.data[0],
                    isAutoAccess : item.isAutoAccess.data[0],
                    isAutoAssignOnIntake : item.isAutoAssignOnIntake.data[0],

                } 
                role = [...role, item]
            })
            this.setState({
                selectedLocation:props.selectedLocation,
                selectedOrganisation:props.selectedOrganisation,
                roles : role,
                applicationMode:props.applicationMode
            })
            
        }
        componentWillUnmount(){
          //  alert("unmouting ")
        }
        render(){
            
            return(
                <Row className='m-0'> { this.props.roles &&  this.props.roles.length &&
                <div>
                    <div className='col s12 m12 l12 xl12 mb-2'>
                    <Input type='select' s={12} m={3} l={3} xl={3} className="mt-1 pl-0" name="selectedRole" onChange={this.handleRoleDropdown} >
                      <option value="" disabled >Select Role</option>
                      { this.props.roles.map((iteratedValue ,i ) => {
                                    return <option id={i} value={iteratedValue.id}>{iteratedValue.name}</option>
                                    })
                                }
                    </Input >
                        {this.props.applicationMode == 'VIEW' ? null :
                            <div className='rolesButton col s12 m3 l3 xl3'>
                                <Col className=' col s12 m6 l6 xl6'>
                                    <Button className='orgIcon innerRolesButton' >
                                        <i className="material-icons" title='Add Role'>
                                            add_circle
                                        </i>
                                    </Button>
                                </Col>
                                <Col className='s12 col m6 l6 xl6' >
                                    <Button className='orgIcon innerRolesButton' >
                                        <i className="material-icons" title='Copy Role'>
                                            file_copy
                                        </i>
                                    </Button>
                                </Col>
                            </div>
                        }
                    </div>
                    { this.state.roleStatus && 
                    <div className=" RoledAddDiv row m-0" >
                        <form >
                            <div className='col s12 m12 l12 xl12 pl-0 '>
                                <Input s={4} autoComplete="off" label="Name" name="roleName" onChange={this.handleRoleInput} key={this.state.selectedRole.name} 
                                defaultValue={this.state.selectedRole.name} readOnly={this.props.applicationMode == 'VIEW' ? true : false}/>
                                <div className='col s4 ml-1'>
                                    <Input s={12} autoComplete="off" label="Description" name="roleDescription" onChange={this.handleRoleInput}  key={this.state.selectedRole.description}
                                    defaultValue={this.state.selectedRole.description} readOnly={this.props.applicationMode == 'VIEW' ? true : false}/>
                                </div>
                            </div>
                            <div className='mb-2 col s4'>
                                <h5>Menu Access</h5>
                                <table className="role-details">
                                    <tbody>
                                    {this.state.menuList.map(iteratedValue => {
                                    return <tr>
                                    {(iteratedValue.name) !== "" ?
                                        <td>
                                            <Input
                                                type='checkbox'
                                                roleType="Menu"
                                                name={iteratedValue.name}
                                                onChange={this.handleRoleInput}
                                                value={iteratedValue.id}
                                                label={iteratedValue.label}
                                                checked={this.state.selectedMenu.filter(item => item == iteratedValue.id).length > 0 ? true : false}
                                                disabled={this.props.applicationMode == 'VIEW' ? true : false}
                                            />
                                        </td> : null}
                                </tr>
                                })
                                }
                                    </tbody>
                                </table>
                            </div>
                            <div className='mb-2 col s4'>
                                <h5>Resource Access</h5>
                                <table className="role-details">
                                    <tbody>
                                    {this.state.resourceList.map(iteratedValue => {
                                    return <tr>
                                        <td>
                                            <Input
                                                type='checkbox'
                                                roleType="Resource"
                                                onChange={this.handleRoleInput}
                                                value={iteratedValue.id}
                                                name={iteratedValue.name}
                                                label={iteratedValue.name}
                                                checked={this.state.selectedResource.filter(item => item == iteratedValue.id).length > 0 ? true : false}
                                                disabled={this.props.applicationMode == 'VIEW' ? true : false}
                                            />
                                        </td>
                                    </tr>
                                    })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className='mb-2 col s4'>
                                <h5>Attributes</h5>
                                <table className="role-details">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Input type='checkbox' roleType="Attribute" name="isAssignable"  onChange={this.handleRoleInput} 
                                                label='Assignable' checked={this.state.selectedRole.isAssignable == 1 ? true : false} 
                                                disabled={this.props.applicationMode == 'VIEW' ? true : false} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Input type='checkbox' roleType="Attribute" name="isAutoAccess" onChange={this.handleRoleInput}
                                                label='AutoAccess' checked={this.state.selectedRole.isAutoAccess == 1 ? true : false} 
                                                disabled={this.props.applicationMode == 'VIEW' ? true : false}  />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Input type='checkbox' roleType="Attribute" name="isAutoAssignOnIntake" onChange={this.handleRoleInput}
                                                label='AutoAssignIntake'checked={this.state.selectedRole.isAutoAssignOnIntake == 1 ? true : false} 
                                                disabled={this.props.applicationMode == 'VIEW' ? true : false}  />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    
                            {this.props.applicationMode == 'VIEW' ? null :
                                <div className='mb-2 col s12'>
                                    {(!this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button  type="submit" 
                                    className="btn_secondary otherButtonAddDetUpt" >Save</Button>}
                                    {(this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button type='button' 
                                    disabled className= "show btn_secondary otherButtonAddDetUpt" onClick={this.UpdateRole}>Save</Button>}
                                    {(this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button type='button' 
                                    disabled = {this.changedRoles} className= "show btn_secondary otherButtonAddDetUpt ml-1" >Cancel</Button>}
                                    {(this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button type='button' 
                                    className= "show btn_secondary otherButtonAddDetUpt ml-1" >Delete</Button>}
                                </div>
                            }
                        </form>
                    </div>}
                    </div>}
                </Row>
            )
        }
    }
export default RolesTab;
