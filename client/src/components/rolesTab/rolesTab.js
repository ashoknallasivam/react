import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import { TEST_MESSAGE } from '../../actions/types';
import uuid from 'uuid';


class RolesTab extends Component {
    constructor(props){
        super(props)
        this.state={
            roles:[],
            selectedLocation:'',
            selectedOrganisation:'',
            orgRoles:'',
            selectedDropdownRole:'',
            applicationMode:'',
            selectedRole:[],
            selectedMenu: [],
            selectedResource: [],
            roleStatus: false,
            isEditMode: false,
            menuList : [],
            resourceList :[],
            RoleNameAlreadyExist :'',
            newRole: 1,
            DeleteModal : false,
            roleDefaultValue: {
                id:'',
            },
            disabledSelectRole : false
        };
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
           
    }
    showAddRoles = () => {
        this.setState({
            selectedRole: [],
            selectedMenu: [],
            selectedResource: [],
            roleName: '',
            roleDescription: '',
            roleStatus: true,
            isEditMode: false,
            roleDefaultValue: true,
            disabledSelectRole : false
        });
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
    }
    confirmationModal = () => {
        this.setState({
            DeleteModal : true
        })
    }
    CancelconfirmationModal = () => {
        this.setState({
            DeleteModal : false
        })
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
            RoleNameAlreadyExist: false,
            roleDefaultValue: false,
            disabledSelectRole : true
        });
        const selectedValue = e.target.value;
        if(this.props.selectedLocation.id != "") {
        let filteredRoles = this.state.roles.filter((role) => role.id == selectedValue);
        let filteredRolesData =  filteredRoles[0];
          
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
            }else{
                let filteredRoles = this.props.orgRoles.roles.filter((role) => role.id == selectedValue);
                let filteredRolesData =  filteredRoles[0];
                
                this.setState({ selectedRole: filteredRolesData });// in view the ds of roles is different please take

                let filteredMenu= [] ;
                this.props.orgRoles.roles.map((item) => {if(item.id == selectedValue){  item.menus.map((data)=>{
                    filteredMenu =[...filteredMenu,data.menuId] 
                })}});
                
                this.setState(prevState => ({
                    selectedMenu: [prevState.selectedMenu, ...filteredMenu]
                }));


                
                let filteredResource= [] ;
                this.props.orgRoles.roles.map((item) => {if(item.id == selectedValue)
                    {  item.resources.map((data)=>{
                    filteredResource =[...filteredResource,data.resourceId] 
                        })
                    }}
                );
                this.setState(prevState => ({
                    selectedResource: [prevState.selectedResource, ...filteredResource]
                }));
            }
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
    //Roles
    AddRole = (e) => {
        e.preventDefault();
        let newRole = {};
        const isDuplicatte = (this.props.selectedLocation.id ? this.props.roles :this.props.orgRoles.roles).map((iteratedValue) => {
                if (this.rolesData.roleName) {
                    if (iteratedValue.name == this.rolesData.roleName) {
                        //this.rolesData = {}
                        return true;
                    }
                else if (iteratedValue.name === this.state.selectedRole.name) {
                    return true;
                }
            }
        });
        if (isDuplicatte.includes(true)) {
            this.setState({
                RoleNameAlreadyExist: true
            })
            return false;
        } else {
            this.setState({
                roleStatus: false,
                RoleNameAlreadyExist: false
            })
            
            //this.rolesData.roleId = this.state.newRole;
            const role = {
                "id": uuid.v4(),
                "name": this.rolesData.roleName ? this.rolesData.roleName : this.state.selectedRole.name ? this.state.selectedRole.name : '',
                "description": this.rolesData.roleDescription ? this.rolesData.roleDescription : this.state.selectedRole.description ? this.state.selectedRole.description : '',
                "orgId": this.props.selectedLocation.id? this.props.selectedLocation.id : this.props.orgRoles.id,
                "isAssignable": this.rolesData.isAssignable ? this.rolesData.isAssignable : this.state.selectedRole.isAssignable && !this.rolesData.hasOwnProperty("isAssignable") ? this.state.selectedRole.isAssignable : this.state.selectedRole.isAssignable && this.rolesData.hasOwnProperty("isAssignable") ? this.rolesData.isAssignable : 0,
                "isAutoAccess": this.rolesData.isAutoAccess ? this.rolesData.isAutoAccess : this.state.selectedRole.isAutoAccess && !this.rolesData.hasOwnProperty("isAutoAccess") ? this.state.selectedRole.isAutoAccess : this.state.selectedRole.isAutoAccess && this.rolesData.hasOwnProperty("isAutoAccess") ? this.rolesData.isAutoAccess : 0,
                "isAutoAssignOnIntake": this.rolesData.isAutoAssignOnIntake ? this.rolesData.isAutoAssignOnIntake : this.state.selectedRole.isAutoAssignOnIntake && !this.rolesData.hasOwnProperty("isAutoAssignOnIntake") ? this.state.selectedRole.isAutoAssignOnIntake : this.state.selectedRole.isAutoAssignOnIntake && this.rolesData.hasOwnProperty("isAutoAssignOnIntake") ? this.rolesData.isAutoAssignOnIntake : 0,
                menus: [],
                resources: [],
                "statusFlag": "new",
            }
            Object.keys(this.menuData).map(r => {
                if(this.menuData[r] == 1){
                    let finalMenu = {};
                    finalMenu.menuId = parseInt(r);
                    finalMenu.roleId = role.id;
                    finalMenu.statusFlag = "new"
                    role.menus.push(finalMenu);
                }
            })
            Object.keys(this.resourceData).map(r => {
                if(this.resourceData[r] == 1){
                    let finalResource = {};
                    finalResource.resourceId = parseInt(r);
                    finalResource.roleId = role.id;
                    finalResource.statusFlag = "new"
                    role.resources.push(finalResource);
                }
            })
            this.props.SaveRoles(role)
            this.props.actions.SaveRoles(this.props.orgRoles.tenantId,role)
            
            this.rolesData = {};
            this.menuData = {};
            this.resourceData = {};
            this.setState({ selectedMenu: [], selectedResource: [] });
        }
        this.setState({
            selectedRole: '',
            roleName: '',
            roleDescription: '',
            roleDefaultValue: false,
            disabledSelectRole : true
        });
		window.Materialize.toast("Save successful", 2000);
    }
    UpdateRole = () => {
        const isDuplicatte = (this.props.selectedLocation.id ? this.props.roles :this.props.orgRoles.roles).map((iteratedValue) => {
                if (this.rolesData.roleName) {
                    if (iteratedValue.name == this.rolesData.roleName && iteratedValue.id != this.state.selectedDropdownRole) {
                        //this.rolesData = {}
                        return true;
                    }
                }
            
        });
        if (isDuplicatte.includes(true)) {
            this.setState({
                RoleNameAlreadyExist: true,
            })
            return false;
            
        }
        else {
            this.setState({
                RoleNameAlreadyExist: false
            })
            let filteredMenu= [] ;
         this.state.roles.map((item) => {if(item.id == this.state.selectedDropdownRole){  item.menus.map((data)=>{
            filteredMenu =[...filteredMenu,data.menuId] 
        })}});

        let filteredResource= [] ;
         this.state.roles.map((item) => {if(item.id == this.state.selectedDropdownRole)
            {  item.resources.map((data)=>{
            filteredResource =[...filteredResource,data.resourceId] 
                })
            }}
        );
        let role = {};
        const updatedRoles = (this.props.selectedLocation.id ? this.props.roles :this.props.orgRoles.roles).map((iteratedValue)=>{
            if(iteratedValue.id == this.state.selectedRole.id){
                role = {
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
                    menus: [],
                    resources: [],
                    "statusFlag": (iteratedValue.statusFlag ==  "modified" || iteratedValue.statusFlag == undefined)? "modified" : "new"  
                }
                let finalMenu = {}//need to create an object that has only manipulated value i.e
                Object.keys(this.menuData).map(r => {
                    if(filteredMenu.indexOf(parseInt(r)) >=0 && this.menuData[r] == 0){
                        let finalMenu = {};
                        finalMenu.menuId = parseInt(r);
                        finalMenu.roleId = this.state.selectedRole.id;
                        finalMenu.statusFlag = "delete"
                        role.menus.push(finalMenu);
                    }else if(filteredMenu.indexOf(parseInt(r)) <= 0 && this.menuData[r] == 1){
                        let finalMenu = {};
                        finalMenu.menuId = parseInt(r);
                        finalMenu.roleId = this.state.selectedRole.id;
                        finalMenu.statusFlag = "new"
                        role.menus.push(finalMenu);
                    }
                })
                this.menuData = {};
                let menuTest = role.menus.map(item => item.menuId);
                filteredMenu.map(item => {//item has previous values
                    if(menuTest.indexOf(parseInt(item)) <0){
                        let test = {};
                        test.menuId = item;
                        test.roleId = this.state.selectedRole.id;
                        role.menus.push(test);
                    }
                })

                let finalResource = {}//need to create an object that has only manipulated value i.e 
                Object.keys(this.resourceData).map(r => {
                    if(filteredResource.indexOf(parseInt(r)) >=0 && this.resourceData[r] == 0){
                        let finalResource = {};
                        finalResource.resourceId = parseInt(r);
                        finalResource.roleId = this.state.selectedRole.id;
                        finalResource.statusFlag = "delete"
                        role.resources.push(finalResource);
                    }else if(filteredResource.indexOf(parseInt(r)) <= 0 && this.resourceData[r] == 1){
                        let finalResource = {};
                        finalResource.resourceId = parseInt(r);
                        finalResource.roleId = this.state.selectedRole.id;
                        finalResource.statusFlag = "new"
                        role.resources.push(finalResource);
                    }
                })
                this.resourceData = {};

                let resourceTest = role.resources.map(item => item.resourceId);
                filteredResource.map(item => {//item has previous values
                    if(resourceTest.indexOf(parseInt(item)) <0){
                        let test = {};
                        test.resourceId = item;
                        test.roleId = this.state.selectedRole.id;
                        role.resources.push(test);
                    }
                })
                

                return iteratedValue = role;
            }else{
                return iteratedValue;
            }
            
        });
        
        let viewMenu = []

         role.menus.map((data)=>{
             if(data.statusFlag == "new" || data.statusFlag == undefined){
                    viewMenu =[...viewMenu,data.menuId] }
                })

        let viewResource = []
            role.resources.map((data)=>{
                if(data.statusFlag == "new" || data.statusFlag == undefined){
                 viewResource =[...viewResource,data.resourceId] }
            })
        this.setState({
            selectedRole : role,
            selectedMenu : viewMenu,
            selectedResource : viewResource,
            roleDefaultValue: false,
            disabledSelectRole : true
        })
        this.props.SaveRoles(role)
        this.props.actions.SaveRoles(this.props.orgRoles.tenantId,role)
        window.Materialize.toast("Save successful", 2000);
    }
        
    }
    CancelRole= () =>{
        this.setState({
            roleStatus:false,
            selectedRole: [],
            selectedMenu: [],
            selectedResource: [],
            roleName: '',
            roleDescription: '',
            roleDefaultValue: true,
            disabledSelectRole : false
        })
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
        
    }
    DeleteRole = () => {
        let restListRole = this.props.selectedLocation.id ? this.state.roles.filter((role) => role.id != this.state.selectedRole.id)
        : this.state.orgRoles.filter((role) => role.id != this.state.selectedRole.id);

        let filteredRoles = this.props.selectedLocation.id ? this.state.roles.filter((role) => role.id == this.state.selectedRole.id)
        :this.state.orgRoles.filter((role) => role.id == this.state.selectedRole.id) ;

        let filteredRolesData =  filteredRoles[0];
        filteredRolesData.statusFlag = (filteredRolesData.statusFlag == "modified" || filteredRolesData.statusFlag == undefined)? "delete" : "ignore";
        this.props.SaveRoles(filteredRolesData)
        this.props.actions.SaveRoles(this.props.orgRoles.tenantId,filteredRolesData)
      
        this.setState({
            roleStatus:false,
            selectedRole: [],
            selectedMenu: [],
            selectedResource: [],
            roleName: '', 
            roleDescription: '',
            DeleteModal : false,
            roles : restListRole,
            orgRoles : restListRole,
            roleDefaultValue: true,
            disabledSelectRole : false
        })
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
    }
        componentDidMount(){
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
            if (this.props.orgRoles.roles != undefined || this.props.roles != undefined) {
            if((this.props.selectedLocation.id == "" && this.props.orgRoles.roles && this.props.orgRoles.roles.length > 0) || 
                (this.props.selectedLocation.id != "" && this.props.roles && this.props.roles.length > 0)){
            let role=[];
            this.props.selectedLocation.id == "" ? this.props.orgRoles.roles : this.props.selectedLocation.roles.map((item,i)=>{
                item ={
                        ...item,
                    isAssignable : item.isAssignable.data !== undefined ? item.isAssignable.data[0] : item.isAssignable ,
                    isAutoAccess : item.isAutoAccess.data !== undefined? item.isAutoAccess.data[0] : item.isAutoAccess,
                    isAutoAssignOnIntake : item.isAutoAssignOnIntake.data !== undefined ? item.isAutoAssignOnIntake.data[0]:item.isAutoAssignOnIntake,

                } 
                role = [...role, item]
            })
                
                    this.setState({
                        roles : role,
                        selectedLocation:this.props.selectedLocation,
                        selectedOrganisation:this.props.orgRoles,
                        orgRoles:this.props.orgRoles.roles,
                    })
                
            

           
        }}
        }
        componentWillReceiveProps(props){
            this.setState({
                roleStatus : false
            })
            let role=[];
            if((props.selectedLocation.id == "" && props.orgRoles.roles && props.orgRoles.roles.length > 0) || 
                (props.selectedLocation.id != "" && props.roles && props.roles.length > 0)){
                props.selectedLocation.id == "" ? props.orgRoles.roles :props.selectedLocation.roles.map((item,i)=>{
                item ={
                        ...item,
                    isAssignable : item.isAssignable.data !== undefined ? item.isAssignable.data[0] : item.isAssignable ,
                    isAutoAccess : item.isAutoAccess.data !== undefined ? item.isAutoAccess.data[0] : item.isAutoAccess,
                    isAutoAssignOnIntake : item.isAutoAssignOnIntake.data !== undefined ?item.isAutoAssignOnIntake.data[0]:item.isAutoAssignOnIntake,


                } 
                role = [...role, item]
            })
                if(props.orgRoles.roles != undefined || props.roles != undefined ) {
                    this.setState({
                        selectedLocation:props.selectedLocation,
                        selectedOrganisation:props.orgRoles,
                        orgRoles:props.orgRoles.roles,
                        roles : role,
                        applicationMode:props.applicationMode,
                        roleStatus : false
                    })
                }  
                
            }
        }
        componentWillUnmount(){
          //  alert("unmouting ")
        }
        render(){
            
            return( 
                <Row className='m-0'>
                <div>
                    <div className='col s12 m12 l12 xl12 mb-2'>
                {(this.props.orgRoles.roles || this.props.roles) ?
                <Fragment>
                    {(this.props.selectedLocation.id == "" && this.props.orgRoles.roles.length>0 )||(this.props.selectedLocation.id != "" && this.props.roles.length>0 )? 
                    <Input type='select' s={12} m={3} l={3} xl={3} className="pl-0" name="selectedRole" onChange={this.handleRoleDropdown} 
                    value={this.state.roleDefaultValue.id} className="roleDropdown">
                      <option value="" disabled>Select Role</option>
                      { this.props.selectedLocation.id != "" ? 
                                this.state.roles.map((iteratedValue ,i ) => 
                                {
                                    if(iteratedValue.statusFlag == "new" || iteratedValue.statusFlag == "modified" || iteratedValue.statusFlag == undefined){

                                        return <option id={i} value={iteratedValue.id}>{iteratedValue.name}</option>
                                    } else if(iteratedValue.statusFlag == "delete" || iteratedValue.statusFlag == "ignore"){
                                         return  <option id={i} value={iteratedValue.id} disabled>deleted Role</option>
                                    }
                                }
                                )
                                
                                :this.state.orgRoles? this.state.orgRoles.map((iteratedValue ,i ) => 
                                
                                {if(iteratedValue.statusFlag == "new" || iteratedValue.statusFlag == "modified" || iteratedValue.statusFlag == undefined){
                                    return <option id={i} value={iteratedValue.id}>{iteratedValue.name}</option>
                                }
                                else if(iteratedValue.statusFlag == "delete" || iteratedValue.statusFlag == "ignore"){
                                    return <option id={i} value={iteratedValue.id} disabled>deleted Role</option>
                                }}
                                )
                                     : this.props.orgRoles.roles.map((iteratedValue ,i ) => 
                                     {if(iteratedValue.statusFlag == "new" || iteratedValue.statusFlag == "modified" || iteratedValue.statusFlag == undefined){
                                        return <option id={i} value={iteratedValue.id}>{iteratedValue.name}</option>
                                     }
                                     else if(iteratedValue.statusFlag == "delete" || iteratedValue.statusFlag == "ignore"){
                                        return <option id={i} value={iteratedValue.id} disabled>deleted Role</option>
                                    }}
                                    )
                                    
                        }
                    </Input >
                    : <p className='col s3 mt-2 pl-2'>No role to display</p>}
                    </Fragment>
                    :<p className='col s3 mt-2 pl-2'>No role to display </p> }
                        {this.props.applicationMode == 'VIEW' ? null :
                            <div className='col s12 m3 l3 xl3 mt-2'>
                                <Col className=' col s12 m6 l6 xl6'>
                                    <Button className='orgIcon innerRolesButton' onClick={this.showAddRoles} >
                                        <i className="material-icons" title='Add Role'>
                                            add_circle
                                        </i>
                                    </Button>
                                </Col>
                                <Col className='s12 col m6 l6 xl6' >
                                    <Button className='orgIcon innerRolesButton pl-0' style={{float:'left'}} >
                                        <i className="material-icons" title='Copy Role'>
                                            file_copy
                                        </i>
                                    </Button>
                                </Col>
                            </div>
                        }
                    </div>
                    { this.state.roleStatus && 
                    <div className=" RoledAddDiv row m-0 ml-1" >
                        <p className={this.state.RoleNameAlreadyExist ? "show errorMessage col s12 m12 l12 xl12 m-0 pl-1" : "hide"} >
                                    This role name is already exist
                        </p>
                        <form onSubmit={this.AddRole}>
                            <div className='col s12 m12 l12 xl12 pl-0 '>
                                <Input s={4} autoComplete="off" label="Name" name="roleName" onChange={this.handleRoleInput} 
                                key={this.state.selectedRole.name} defaultValue={this.state.selectedRole.name} required = {true} 
                                readOnly={this.props.applicationMode == 'VIEW' ? true : false}/>
                                <div className='col s4 ml-1'>
                                    <Input s={12} autoComplete="off" label="Description" name="roleDescription" onChange={this.handleRoleInput}  key={this.state.selectedRole.description}
                                    defaultValue={this.state.selectedRole.description} readOnly={this.props.applicationMode == 'VIEW' ? true : false}/>
                                </div>
                            </div>
                            <div className='mb-2 col s4 menu'>
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
                                                className='filled-in'
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
                            <div className='mb-2 col s4 resource'>
                                <h5>Resource Access</h5>
                                <table className="role-details">
                                    <tbody>
                                    {this.state.resourceList.map(iteratedValue => {
                                    return <tr>
                                        <td>
                                            <Input
                                                type='checkbox'
                                                roleType="Resource"
                                                className='filled-in'
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
                                                <Input type='checkbox' className='filled-in' roleType="Attribute" name="isAssignable"  onChange={this.handleRoleInput} 
                                                label='Assignable' checked={this.state.selectedRole.isAssignable == 1 ? true : false} 
                                                disabled={this.props.applicationMode == 'VIEW' ? true : false} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Input type='checkbox' className='filled-in' roleType="Attribute" name="isAutoAccess" onChange={this.handleRoleInput}
                                                label='AutoAccess' checked={this.state.selectedRole.isAutoAccess == 1 ? true : false} 
                                                disabled={this.props.applicationMode == 'VIEW' ? true : false}  />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Input type='checkbox' className='filled-in' roleType="Attribute" name="isAutoAssignOnIntake" onChange={this.handleRoleInput}
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
                                    className= "show btn_secondary otherButtonAddDetUpt" onClick={this.UpdateRole}>Save</Button>}
                                    {(this.props.applicationMode !== 'VIEW') && <Button type='button' 
                                    className= "show btn_secondary otherButtonAddDetUpt ml-1" onClick={this.CancelRole}>Cancel</Button>}
                                    {(this.state.isEditMode && this.props.applicationMode !== 'VIEW') && <Button type='button' 
                                    className= "show btn_secondary otherButtonAddDetUpt ml-1" onClick={this.confirmationModal}>Delete</Button>}
                                </div>
                            }
                        </form>
                    </div>}
                    </div>
                    <Modal
                        header='Please Confirm '
                        id='DeleteRoleModal'
                        modalOptions={{dismissible:false}}
                        open = {this.state.DeleteModal}
                    >
                        <p>Are you sure you want to delete it?</p>

                            <div className="col s12 m12 l12 xl12">
                                <button className="btn btn_secondary otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this.CancelconfirmationModal}>Cancel</button>
                                <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={this.DeleteRole} >Delete</Button>
                            </div>
                    </Modal>  
                </Row>
            )
        }
    }
export default RolesTab;
