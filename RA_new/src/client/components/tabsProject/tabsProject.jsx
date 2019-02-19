/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import axios from 'axios';
import { EnrollmentTargetModal, EnrollmentTarget } from './enrollmentDetails';
import { HeaderData } from './headerData.js';
import { Row, Col, Input, Table, Icon, Button, Card } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from '../../components/base/modal';
import objectUtil from '../../utils/objectUtil';
import { RolesDetails } from './rolesDetails';
import { StudyConfigModal, StudyConfig } from './studyConfigDetails';
import { Functions } from './functionDetails';
import Page from '../../views/page';
import CopyRole from './copyRole';
import MaterializeComponent from 'materialize-css';
const localConstant = objectUtil.getlocalizeData();

class TabsProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleStatus: false,//change this state to false when org is changed
            rolesTabSelected: false,
            openStudyConfigModal: false,
            openEnrollmentTargetModal: false,
            roleName: '',
            roleDescription: '',
            isEnrollmentEdit: false,
            isStudyGroupEdit: false,
            startDate: "",
            selecteRole: '',
            tenantCopyRoleId: '',
            orgCopyRoleId: '',
            locCopyRoleId: '',
            isEditMode: false,
            newRole: 1,
            selectedMenu: [],
            selectedResource: [],
            formatedData: {},
            CopyRoleModal: false,
            RoleNameAlreadyExist:false,
            disabledSelectRole:false,
            roleDefaultValue:true
        };
        objectUtil.bindAction(HeaderData.enrollmentTargetHeader, "EditColumn", this.editRowHandler);
        objectUtil.bindAction(HeaderData.enrollmentTargetHeader, "DeleteColumn", this.deleteEnrollmentTarget);
        objectUtil.bindAction(HeaderData.studyConfigHeader, "EditColumn", this.editStudyConfigHandler);
        objectUtil.bindAction(HeaderData.studyConfigHeader, "DeleteColumn", this.deleteStudyConfigGroups);
        this.updatedData = {};
        this.editedRowData = {};
        this.inputData = {};
        this.studyConfigTab = false;
        this.enrollmentTargetTab = false;
        this.rolesTab = false;
        this.previousId = 0;
        this.raConfigId = 0;
        this.month = "";
        this.formatedMonth = "";
        this.CopyRoleMenuList="";
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
        this.isBindToLto = false;
        this.checkedFunctionValues = {};
        this.menuValues = [];
        this.isEditStudyConfig = false;
        this.isLocationExist = false;
        this.dashboardMenu = [
            {
                name: "dashboard",
                label: "Dashboard",
                resources: [
                    {
                        name: "omb-control-widget"
                    },
                    {
                        name: "enrollment-chart-widget"
                    }
                ]
            }
        ];
    }
    handleRoleInput = (e) => {
        if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Attribute") {
            this.rolesData[e.target.name] = e.target.checked ? 1 : 0;
        } else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Resource") {
            this.resourceData[e.target.value] = e.target.checked ? 1 : 0;
        } else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Menu") {
            this.menuData[e.target.value] = e.target.checked ? 1 : 0;
        }
        else {
            this.rolesData[e.target.name] = e.target.value;
            this.setState({
                RoleNameAlreadyExist:false
            })
        }
    }
    handleRoleToLto = (e) => {
        this.isBindToLto = e.target.checked;
    }
    handleRoleDescription = (e) => {
        this.setState({ roleDescription: e.target.value });
    }
    componentDidMount = () => {
        if (this.props.ApplicationMode == "VIEW") {
            this.props.selectedOrg.roles.map(item => this.props.actions.AddRoleDetails(item));
        }
        else {//for create mode
            this.props.actions.FetchMenus();
            this.props.actions.getTenants();
            this.props.actions.FetchRoles();
            this.props.actions.FetchResource();
            this.props.actions.FetchEnrollmentTarget();
          //  this.props.actions.FetchFunctions();
        }
    }
    isFirstday = (date) => {
        const day = date.getDate()
        return day === 1
    }
    //Input Change Handler
    inputHandlerChange = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        this.updatedData[e.target.name] = value;        
        if (e.target.name === "ratio") {
            if (e.target.value <= 1 && e.target.value >= 0) {
                const expression = ("(\\d{0," + parseInt(1) + "})[^.]*((?:\\.\\d{0," + parseInt(2) + "})?)");
                const rg = new RegExp(expression, "g");
                const match = rg.exec(e.target.value);
                e.target.value = match[1] + match[2];
            }
            else {
                e.target.value = "";
                window.Materialize.toast(localConstant.warningMessages.RATIO_VALIDATION, 1000);
            }
        }
        if (e.target.name === "sequenceLimit") {
            if (e.target.value < 0) {
                window.Materialize.toast(localConstant.warningMessages.SEQUENCE_LIMIT_VALIDATION, 1000);
                e.target.value = "";
            }
        }
    }
    showAddRoles = () => {
        this.setState({
            selecteRole: '',
            selectedMenu: [],
            selectedResource: [],
            roleName:'',
            roleDescription:'',
            roleStatus: true,
            rolesTabSelected: true,
            isEditMode: false,
            CopyRoleModal: false,
            disabledSelectRole:false,
            roleDefaultValue:true
        });
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
        this.enrollmentTargetTab = false;
        this.studyConfigTab = false;
    }
    functionsChangeHandler = () => {
        this.menuValues = [];
        this.props.functionsList.map(data => {
            if (this.updatedData[data.path]) {
                data.menus.map(result => {
                    this.menuValues.push(result);
                })
            }
        });
        this.checkedFunctionValues = this.updatedData;
        this.setState({ roleStatus: false, rolesTabSelected: false });
    }
    //Study Config
    studyConfigTabHandler = () => {
        this.studyConfigTab = true;
        this.setState({ rolesTabSelected: true });
    }
    studyConfigChangeHandler = (e) => {
        this.inputData['ltoId'] = this.props.selectedCurrentLTO;
        this.inputData['groups'] = [];
        if (this.isEditStudyConfig && this.isLocationExist)
            this.inputData['flag'] = "updateFlag";
        else {
            this.raConfigId = 1 + this.raConfigId;
            this.inputData['_id'] = "c" + this.raConfigId;
            this.inputData['flag'] = "createFlag";
        }
        this.inputData[e.target.name] = e.target.value;
        if (e.target.name === "blockSize") {
            if (e.target.value < 0) {
                window.Materialize.toast(localConstant.warningMessages.BLOCKSIZE_VALIDATION, 1000);
                e.target.value = "";
            }
        }
    }
    addDescAndBlock = () => {
        this.props.actions.AddStudyConfig(this.inputData);
        this.inputData = {};
    }
    studyConfigValidation = (data) => {
        let sum = 0;
        let groups = [];
        this.props.studyConfigList.map(item => { if (item.ltoId == this.props.selectedCurrentLTO) groups = item.groups });
        groups && groups.map(res => {
            sum = sum + parseFloat(res.ratio);
        });
        if (parseFloat(data) + sum > 1) {
            window.Materialize.toast(localConstant.warningMessages.CUMULATIVE_RATIO_VALIDATION, 1000);
            return false;
        }
        return true;
    }
    submitStudyConfigGroups = (e) => {
        e.preventDefault();
        if (this.updatedData && !(objectUtil.isEmpty(this.updatedData))) {
            if (this.studyConfigValidation(this.updatedData.ratio)) {
                this.props.actions.AddStudyConfigGroups(this.updatedData);
                this.cancelStudyConfigModal();
            }
        }
        else
            window.Materialize.toast(localConstant.warningMessages.EMPTY_FIELD_VALIDATION, 1000);
    }
    showStudyConfigModal = (e) => {
        e.preventDefault();
        this.setState({ openStudyConfigModal: true, isStudyGroupEdit: false });
        this.inputData['ltoId'] = this.props.selectedCurrentLTO;
        this.inputData['groups'] = [];
        if (this.isEditStudyConfig && this.isLocationExist)
            this.inputData['flag'] = "updateFlag";
        else {
            this.raConfigId = 1 + this.raConfigId;
            this.inputData['_id'] = "c" + this.raConfigId;
            this.inputData['flag'] = "createFlag";
        }
        this.props.actions.AddStudyConfig(this.inputData);
        this.inputData = {};
        this.studyConfigTabHandler();
    }
    deleteStudyConfig = (e) => {
        e.preventDefault();
        this.studyConfigTabHandler();
        window.Materialize.toast(localConstant.warningMessages.DELETING_DATA, 1000);
        this.props.actions.DeleteStudyConfig(this.props.selectedCurrentLTO);
    }
    cancelStudyConfigModal = () => {
        this.updatedData = {};
        this.editedRowData = {};
        this.setState({ openStudyConfigModal: !this.state.openStudyConfigModal });
    }
    deleteStudyConfigGroups = () => {
        this.studyConfigTabHandler();
        const selectedData = this.gridChild.getSelectedRows();
        this.gridChild.removeSelectedRows(selectedData);
        const rowsToDisplay = this.gridChild.gridApi.clientSideRowModel.rowsToDisplay.map(row => row.data);
        this.props.actions.DeleteStudyConfigGroups(rowsToDisplay);
    }
    editStudyConfigHandler = (data) => {
        this.studyConfigTabHandler();
        this.setState((state) => {
            return {
                openStudyConfigModal: !state.openStudyConfigModal,
                isStudyGroupEdit: true,
            };
        });
        this.editedRowData = data;
    }
    editStudyConfig = () => {
        this.studyConfigTabHandler();
        // if (this.studyConfigValidation(combinedData.ratio)) {
        const combinedData = Object.assign(this.editedRowData, this.updatedData);
        this.props.actions.UpdateStudyConfig(combinedData);
        // }
        this.cancelStudyConfigModal();
    }
    //Enrollment Target
    enrollmentValidation = (data) => {
        if(objectUtil.isEmpty(data.month) || objectUtil.isEmpty(data.target)){
            window.Materialize.toast("Please enter both the fields",2000);
            return false;
        }
        return true;
    }
    updateEnrollmentTargetModal = () => {
        this.updatedData["flag"] = "updateFlag";
        const combinedData = Object.assign(this.editedRowData, this.updatedData);
        this.props.actions.UpdateEnrollmentTarget(combinedData);
        this.cancelEnrollmentTargetModal();
    }
    editRowHandler = (data) => {
        const d = new Date(data.month);
        d.setDate(d.getDate());
        this.enrollmentTargetTab = true;
        this.studyConfigTab = false;
        this.setState((state) => {
            return {
                openEnrollmentTargetModal: !state.openEnrollmentTargetModal,
                rolesTabSelected: true,
                isEnrollmentEdit: true,
            };
        });
        this.setState({
            startDate: d
        });
        this.editedRowData = data;
    }
    enrollmentDateHandler = (data) => {
        this.month = data
        this.formatedMonth = data
        this.setState({
            startDate: this.month
        });
        this.formatedMonth.setMinutes(30);
        this.formatedMonth.setHours(5);
        this.formatedMonth = this.formatedMonth.toISOString()
        this.updatedData["month"] = this.formatedMonth;
    }
    submitEnrollmentTargetModal = (e) => {
        e.preventDefault();
        this.previousId = this.previousId + 1;
        if (this.updatedData && !(objectUtil.isEmpty(this.updatedData))) {
            if(this.enrollmentValidation(this.updatedData)){
            this.updatedData["month"] = this.formatedMonth;
            this.updatedData["id"] = "c"+this.previousId;
            this.updatedData["orgId"] = this.props.selectedCurrentLTO;
            this.updatedData["flag"] = "createFlag";
            this.props.actions.AddEnrollmentTarget(this.updatedData);
            this.cancelEnrollmentTargetModal();
            }
        }
        else {
            window.Materialize.toast("Please enter the fields",2000);
        }
    }
    showEnrollmentTargetModal = (e) => {
        e.preventDefault();
        this.setState({ openEnrollmentTargetModal: true, startDate: '', isEnrollmentEdit: false });
        document.getElementById("uniquenumber").setAttribute("onkeyDown", "return false");
        this.enrollmentTargetTab = true;
        this.studyConfigTab = false;
        this.setState({ rolesTabSelected: true });
        this.updatedData = {};
        this.editedRowData = {};
    }
    cancelEnrollmentTargetModal = () => {
        this.updatedData = {};
        this.editedRowData = {};
        this.setState({ openEnrollmentTargetModal: !this.state.openEnrollmentTargetModal });
    }
    deleteEnrollmentTarget = () => {
        const selectedData = this.gridChildren.getSelectedRows();
        const deletedId = selectedData.map(data=>{return data.id})
        this.gridChildren.removeSelectedRows(selectedData);
        this.props.actions.DeleteEnrollmentTarget(selectedData,deletedId);
    }
    ////////////////
    roleBodyCreate = (description, id, isAssignable, isAutoAccess, isAutoAssignOnIntake, name) => {
        let roleBody = {};
        roleBody.description = description;
        roleBody.id = id;
        roleBody.isAssignable = isAssignable;
        roleBody.isAutoAccess = isAutoAccess;
        roleBody.isAutoAssignOnIntake = isAutoAssignOnIntake;
        roleBody.name = name;
        return roleBody;
    }//room for improvment, this is required because ds of the received role is different than ds of created role

    handleBounds = () => {
        this.props.actions.FetchMenuRoleAccess();//the callback for this should be handle role dropdown
    }
    handleRoleDropdown = (e) => {
        this.setState({
            selectedDropdownRole: e.target.value,
            roleStatus: true,
            isEditMode: true,
	        CopyRoleModal:false,
            rolesTabSelected:true,
            disabledSelectRole:true,
            roleDefaultValue:false
        });
        const selectedValue = e.target.value;
        let filteredRoles = this.props.roleDetails.filter((role) => role.id == selectedValue);
        let { description, id, isAssignable, isAutoAccess, isAutoAssignOnIntake, name, flag } = filteredRoles[0];
        let filteredRolesData = this.props.ApplicationMode == 'VIEW' ?
        this.roleBodyCreate(description, id, isAssignable.data[0], isAutoAccess.data[0], isAutoAssignOnIntake.data[0], name) :
        this.props.ApplicationMode == 'EDIT' && flag == 'createFlag' ?  filteredRoles[0] : this.props.ApplicationMode == 'EDIT' && flag == 'view' ? 
        this.roleBodyCreate(description, id, isAssignable.data[0], isAutoAccess.data[0], isAutoAssignOnIntake.data[0], name)
        : filteredRoles[0];
        let filteredMenu = this.props.menuDetails.filter((menu) => menu.roleId == selectedValue);
        let filteredResource = this.props.resourceDetails.filter((resource) => resource.roleId == selectedValue);
        this.setState({ selecteRole: filteredRolesData });// in view the ds of roles is different please take
        let filteredValueMenu = this.props.ApplicationMode == 'VIEW'?
                this.props.menuRoleAccessDetails.map(item => item.menuId)://for view/edit fetch files from menuRoleAccessDetails
                this.props.ApplicationMode == 'EDIT' && flag == 'createFlag' ? Object.keys(filteredMenu[0].menuId).filter(item => filteredMenu[0].menuId[item] == 1):
                this.props.ApplicationMode == 'EDIT' && flag == 'view' ? this.props.menuRoleAccessDetails.map(item => item.menuId):
                Object.keys(filteredMenu[0].menuId).filter(item => filteredMenu[0].menuId[item] == 1);
        this.setState(prevState => ({
            selectedMenu: [prevState.selectedMenu, ...filteredValueMenu]
        }));
        let filteredValueResource = this.props.ApplicationMode == 'VIEW'?
                this.props.resourceRoleAccessDetails.map(item => item.resourceId): //for view/edit fetch files from resourceRoleAccessDetails
                this.props.ApplicationMode == 'EDIT' && flag == 'createFlag' ? Object.keys(filteredResource[0].resourceId).filter(item => filteredResource[0].resourceId[item] == 1):
                this.props.ApplicationMode == 'EDIT' && flag == 'view' ? this.props.resourceRoleAccessDetails.map(item => item.resourceId):
                Object.keys(filteredResource[0].resourceId).filter(item => filteredResource[0].resourceId[item] == 1);
        this.setState(prevState => ({
            selectedResource: [prevState.selectedResource, ...filteredValueResource]
        }));
    }
    //Roles
    SelectedDropdownRoleDetails = (e) => {
        e.preventDefault();
        let newRole = {};
        const isDuplicatte = this.props.roleDetails.map((iteratedValue) => {
            if (iteratedValue.orgId == this.props.selectedCurrentTTO || iteratedValue.orgId == this.props.selectedCurrentLTO)
                 {
                    if(this.rolesData.roleName){
                        if(iteratedValue.name == this.rolesData.roleName){
                            //this.rolesData = {}
                            return true;
                        }
                    }
                    else if (iteratedValue.name === this.state.selecteRole.name){
                        return true;
                    }
                }
        });
        if (isDuplicatte.includes(true)) {
            this.setState({
                RoleNameAlreadyExist:true
            })
            return false;
        } else {
            this.setState({
                roleStatus: false,
                RoleNameAlreadyExist:false
            })
            this.rolesData.roleId = this.state.newRole;
            const role = {
                "id": "c" + this.state.newRole,
                "name": this.rolesData.roleName ? this.rolesData.roleName:this.state.selecteRole.name ? this.state.selecteRole.name  : '',
                "description": this.rolesData.roleDescription ? this.rolesData.roleDescription :this.state.selecteRole.description ? this.state.selecteRole.description : '',
                "orgId": this.isBindToLto ? this.props.selectedCurrentLTO : this.props.selectedCurrentTTO,
                "isAssignable": this.rolesData.isAssignable ? this.rolesData.isAssignable : this.state.selecteRole.isAssignable ? this.state.selecteRole.isAssignable : 0,
                "isAutoAccess": this.rolesData.isAutoAccess ? this.rolesData.isAutoAccess : this.state.selecteRole.isAutoAccess ? this.state.selecteRole.isAutoAccess : 0,
                "isAutoAssignOnIntake": this.rolesData.isAutoAssignOnIntake ? this.rolesData.isAutoAssignOnIntake : this.state.selecteRole.isAutoAssignOnIntake ? this.state.selecteRole.isAutoAssignOnIntake : 0,
                "flag": "createFlag"
            }
            function copyMenuRole(array){
            let CopyMenuItem = {};
                array.map(item => {
                    CopyMenuItem[item] = 1;
                })
            return CopyMenuItem;
            }
            const menu = {
                "roleId": "c" + this.state.newRole,
                "menuId": this.state.selectedMenu.length!=0 ? copyMenuRole(this.state.selectedMenu):this.menuData,
                "orgId": this.props.selectedCurrentTTO,
                "locId": this.props.selectedCurrentLTO,
                "flag": "createFlag"
            }
            function copyResourceRole(array){
                let CopyResourceItem = {};
                    array.map(item => {
                        CopyResourceItem[item] = 1;
                    })
                return CopyResourceItem;
                }
            const resource = {
                "roleId": "c" + this.state.newRole,
                "resourceId": this.state.selectedResource.length!=0 ?copyResourceRole(this.state.selectedResource):this.resourceData,
                "orgId": this.props.selectedCurrentTTO,
                "locId": this.props.selectedCurrentLTO
            }
            this.props.actions.AddRoleDetails(role);
            this.props.actions.AddMenuDetails(menu);
            this.props.actions.AddResourceDetails(resource);
            this.rolesData = {};
            this.menuData = {};
            this.resourceData = {};
            this.setState({selectedMenu :[],selectedResource:[]});
        }
        this.setState({
            newRole: this.state.newRole + 1 ,
            disabledSelectRole:false,
            roleDefaultValue:true,
            selecteRole: '',
            roleName:'',
            roleDescription:''
         });
    }
    DeleteRole = () => {
        this.props.actions.DeleteRoleDetails(this.state.selecteRole, this.rolesData, this.menuData, this.resourceData),
        $('#DeleteRoleModal').modal('close')
        this.setState({
            roleStatus: false,
            selecteRole: {},
            disabledSelectRole:false,
            roleDefaultValue:true,
            RoleNameAlreadyExist:false,
        });
        this.enrollmentTargetTab = false;
        this.studyConfigTab = false;

    }
    handleDeleteRoleModal=()=>{
        $('#DeleteRoleModal').modal('open')
    }

    UpdateRole = () => {
        this.props.actions.UpdateRoleDetails(
            this.state.selecteRole,
            this.rolesData,
            this.menuData,
            this.resourceData,
            this.props.selectedCurrentTTO,
            this.props.currentTtoFlag
            )
        this.setState({
            roleStatus: false,
            disabledSelectRole:false,
            roleDefaultValue:true,
            RoleNameAlreadyExist:false,
        });
        this.enrollmentTargetTab = false;
        this.studyConfigTab = false;

    }

    handleCopyRole = () => {
        const data = this.props.copyTenantData && this.props.copyTenantData.map((iteratedValue)=>{
            return {
                name:iteratedValue.name,
                tenantCopyRoleId:iteratedValue.id,
                children:iteratedValue.topLevelOrg && iteratedValue.topLevelOrg.map((TenantChildren)=>{
                    const TloRole  = TenantChildren.roles && TenantChildren.roles.map((TopOrgRole)=>{
                        return {
                            name:TopOrgRole.name,
                            id:TopOrgRole.id,
                            description:TopOrgRole.description,
                            isAssignable:TopOrgRole.isAssignable.data[0],
                            isAutoAccess:TopOrgRole.isAutoAccess.data[0],
                            isAutoAssignOnIntake:TopOrgRole.isAutoAssignOnIntake.data[0],
                            isLast:true
                        }

                    });
                    let Llo = iteratedValue.lowerLevelOrg && iteratedValue.lowerLevelOrg.map((LoweLevelOrgchildren)=>{
                        if (LoweLevelOrgchildren.parentId == TenantChildren.id){
                            const LloRole = LoweLevelOrgchildren.roles && LoweLevelOrgchildren.roles.map((LowerOrgRole)=>{
                                            return {
                                                name:LowerOrgRole.name,
                                                id:LowerOrgRole.id,
                                                description:LowerOrgRole.description,
                                                isAssignable:LowerOrgRole.isAssignable.data[0],
                                                isAutoAccess:LowerOrgRole.isAutoAccess.data[0],
                                                isAutoAssignOnIntake:LowerOrgRole.isAutoAssignOnIntake.data[0],
                                                isLast:true
                                            }
                                        })
                            return {
                                name:LoweLevelOrgchildren.name,
                                locCopyRoleId:LoweLevelOrgchildren.id,
                                tenantId:LoweLevelOrgchildren.tenantId,
                                parentId:LoweLevelOrgchildren.parentId,
                                isLoc:true,
                                children:LloRole
                            }


                        }
                        else if(LoweLevelOrgchildren.parentId != TenantChildren.id){
                            return {
                                name:''
                            };
                        }
                    })
                    Llo = Llo.filter((temp)=> {return temp.name !=''})
                    const TloChildren = TloRole.concat(Llo);

                    return {
                        name:TenantChildren.name,
                        orgCopyRoleId:TenantChildren.id,
                        tenantId:TenantChildren.tenantId,
                        isOrg:true,
                        children:TloChildren
                    }

                }),
            }

        })
        this.setState({
            formatedData:data,
            CopyRoleModal:true,
            rolesTabSelected:true,
            isEditMode:false,
            disabledSelectRole:false,
            roleDefaultValue:true
        });
        this.enrollmentTargetTab = false;
        this.studyConfigTab = false;
    }

    onToggle = (node, toggled) => {
        if (this.state.cursor) { this.state.cursor.active = false; }
        node.active = true;
        if (node.children) { node.toggled = toggled; }
        this.setState({ cursor: node });
        if(node.isOrg === true){
             this.props.actions.FetchCopyMenuRoleAccess(node.tenantId,node.orgCopyRoleId);
             this.props.actions.FetchCopyResourceRoleAccess(node.tenantId,node.orgCopyRoleId);
        }
        if(node.isLoc === true){
            this.props.actions.FetchCopyMenuRoleAccess(node.tenantId,node.parentId,node.locCopyRoleId);
            this.props.actions.FetchCopyResourceRoleAccess(node.tenantId,node.parentId,node.locCopyRoleId);
        }
        if(node.isLast === true){
            //let tempOk= {};
            let copyRoleId = node.id;
            let filteredCopyRoleMenu = this.props.fetchCopyMenuRoleAccess.filter((item) => item.roleId == copyRoleId)
            let finalFilteredCopyMenu = filteredCopyRoleMenu.map(item => item.menuId);
            this.setState({
                selectedMenu:[...finalFilteredCopyMenu],
            });


            let filteredCopyRoleResource = this.props.fetchCopyResourceRoleAccess.filter((item) => item.resourceId == copyRoleId)
            let finalFilteredCopyResource = filteredCopyRoleResource.map(item => item.resourceId);
            this.setState({
                selectedResource:[...finalFilteredCopyResource],
                CopyRoleModal:false,
                roleStatus:true,
                selecteRole:node
            });

    }

    }
	close = () => {
        this.setState({
            CopyRoleModal: false
        });
    }
    render(){
        //Buttons for study config
        this.studyConfigAddButtons = [
            {
                name: localConstant.commonConstants.OK,
                action: this.state.isStudyGroupEdit ? this.editStudyConfig : this.submitStudyConfigGroups,
                btnClass: 'btn_secondary mr-1',
                showbtn: true
            },
            {
                name: localConstant.commonConstants.CANCEL,
                action: this.cancelStudyConfigModal,
                btnClass: 'btn_secondary',
                showbtn: true
            }
        ];
        //Buttons for enrollment target
        this.enrollmentButtons = [
            {
                name: localConstant.commonConstants.OK,
                action: this.state.isEnrollmentEdit ? this.updateEnrollmentTargetModal : this.submitEnrollmentTargetModal,
                btnClass: 'btn_secondary mr-1',
                showbtn: true
            },
            {
                name: localConstant.commonConstants.CANCEL,
                action: this.cancelEnrollmentTargetModal,
                btnClass: 'btn_secondary',
                showbtn: true
            },
        ];
        const { functionsList, studyConfigList, finalStudyConfigData, enrollmentTargetData, locations, enrollmentTargetList } = this.props;
        //For Study Config - Groups
        let raConfigDefault = {};
        studyConfigList.map(item => { if (item.ltoId == this.props.selectedCurrentLTO) raConfigDefault = item });
        //For Roles - Menus
        let finalMenuList = this.dashboardMenu.concat(this.menuValues);
        //For Roles - Resources
        let resourceValues = [];
        finalMenuList.map(output => output.resources.map(res => resourceValues.push(res)));
        //For new locations
        locations.map(item => {
            if (item.id == this.props.selectedCurrentLTO) {
                if (item.hasOwnProperty('flag')) {
                    this.isEditStudyConfig = false;
                    this.isLocationExist = false;
                }
                else {
                    this.isEditStudyConfig = true;
                    finalStudyConfigData.map(item => { if (item.ltoId == this.props.selectedCurrentLTO) this.isLocationExist = true });
                }
            }
        })

        return (
            <div className='tabs-project' id="tabsProject">
                {this.props.selectedCurrentTTO != "" ?
                    <Tabs>
                        <TabList className="tabs customTabs z-depth-1 tabs-fixed-width">
                                <Tab className="tab" >{localConstant.functions.FUNCTIONS}</Tab>
                                <Tab className="tab" >{localConstant.study_Config.STUDY_CONFIG}</Tab>
                                <Tab className="tab" >Enrollment Target</Tab>
                                <Tab className="tab" >Pages</Tab>
                                <Tab className="tab" >{localConstant.role.ROLE}</Tab>
                        </TabList>
                        <TabPanel>
                            {/* <Functions
                                functionsList={functionsList}
                                inputHandlerChange={this.inputHandlerChange}
                                functionsChangeHandler={this.functionsChangeHandler}
                                checkedFunctionValues={this.checkedFunctionValues}
                                ApplicationMode={this.props.ApplicationMode} /> */}
                        </TabPanel>
                        <TabPanel>
                            <Modal title={localConstant.study_Config.ADD_STUDY_CONFIG}
                                buttons={this.studyConfigAddButtons}
                                isShowModal={this.state.openStudyConfigModal} >
                                <StudyConfigModal
                                    inputHandlerChange={this.inputHandlerChange}
                                    editedRowData={this.editedRowData} />
                            </Modal>
                            <StudyConfig
                                studyConfigList={raConfigDefault}
                                selectedLTO={this.props.selectedCurrentLTO}
                                columnDefs={HeaderData.studyConfigHeader}
                                showStudyConfigModal={this.showStudyConfigModal}
                                studyConfigChangeHandler={this.studyConfigChangeHandler}
                                deleteStudyConfigGroups={this.deleteStudyConfigGroups}
                                submitStudyConfig={this.submitStudyConfig}
                                onRef={ref => { this.gridChild = ref; }}
                                deleteStudyConfig={this.deleteStudyConfig}
                                ApplicationMode={this.props.ApplicationMode}
                                addDescAndBlock={this.addDescAndBlock} />
                        </TabPanel>
                        <TabPanel>
                            <Modal title={"Enrollment Target"}
                                buttons={this.enrollmentButtons}
                                isShowModal={this.state.openEnrollmentTargetModal}>
                                <EnrollmentTargetModal
                                    inputHandlerChange={this.inputHandlerChange}
                                    editedRowData={this.editedRowData}
                                    startDate={this.state.startDate}
                                    enrollmentDateHandler={this.enrollmentDateHandler}
                                    isFirstday={this.isFirstday}
                                />
							</Modal>
                            <EnrollmentTarget
                                //enrollmentTargetData={enrollmentTargetData}
                                enrollmentTargetData={this.props.ApplicationMode == "CREATE" ? enrollmentTargetData : (enrollmentTargetData.concat(enrollmentTargetList.filter(item => item.orgId == this.props.selectedCurrentLTO)))}
                                selectedLTO={this.props.selectedCurrentLTO}
                                columnDefs={HeaderData.enrollmentTargetHeader}
                                showEnrollmentTargetModal={this.showEnrollmentTargetModal}
                                deleteEnrollmentTarget={this.deleteEnrollmentTarget}
                                ApplicationMode={this.props.ApplicationMode}
                                onRef={ref => { this.gridChildren = ref; }}
                            />
                        </TabPanel>
                         <TabPanel>
                                <Row className="m-0 mt-3 pl-2 CreateProjectTabContent">
                                    <Col s={12}><Page /></Col>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <Row className="m-0 mt-3 pl-2 CreateProjectTabContent">
                                    <div className='col s12 m12 l12 xl12 mb-2'>
                                    {
                                        this.props.roleDetails.length > 0 ?
                                        <select className="browser-default col input-field s12 m3 l3 x3 mt-1 role_select_box pl-0"
                                        onChange={this.handleRoleDropdown} key={this.state.roleDefaultValue} 
                                        defaultValue={this.state.roleDefaultValue}>
                                            <option disabled={this.state.disabledSelectRole} >Select Role</option>
                                            {
                                                this.props.roleDetails.map((iteratedValue) => {
                                                    if (this.props.selectedCurrentLTO == '' && iteratedValue.orgId == this.props.selectedCurrentTTO) {
                                                        return <option value={iteratedValue.id}>{iteratedValue.name}</option>
                                                    } else if (this.props.selectedCurrentLTO !== '' && (iteratedValue.orgId == this.props.selectedCurrentTTO || iteratedValue.orgId == this.props.selectedCurrentLTO)) {
                                                        return <option value={iteratedValue.id}>{iteratedValue.name}</option>
                                                    }
                                                })// RFI - for view we can fetch the roledetails from menuRoleAccessDetails
                                            }
                                        </select>
                                        :null
                                        }
                                        {this.props.ApplicationMode !== 'VIEW' ?

                                            <div className='rolesButton col s12 m3 l3 xl3'>
                                                <Col className=' col s12 m6 l6 xl6'>
                                                    <Button className='orgIcon innerRolesButton' onClick={this.showAddRoles}>
                                                        <i className="material-icons" title='Add Role'>
                                                            add_circle
                                                        </i>
                                                    </Button>
                                                </Col>
                                                <Col className='s12 col m6 l6 xl6' >
                                                    <Button className='orgIcon innerRolesButton' onClick={this.handleCopyRole}>
                                                    <i className="material-icons" title='Copy Role'>
                                                        file_copy
                                                        </i>
                                                    </Button>

                                                    <div className={this.state.CopyRoleModal?"popupCopyRole":"hide"}>
                                                        <div id="CopyRoleModal" className="modal customModal">
                                                            <div className="modal-content">
                                                            <h4>Copy Role</h4>
                                                            <CopyRole
                                                                data = { this.state.formatedData }
                                                                onToggle ={ this.onToggle }
                                                                />
                                                            </div>
                                                            <div className="modal-footer">
                                                            <button className="btn btn_secondary otherButtonAddDetUpt" onClick={this.close}>Close</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Col>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    <p className={this.state.RoleNameAlreadyExist ? "show errorMessage col s12 m12 l12 xl12 m-0 pl-1" : "hide"} >
                                    This role name is already exist</p>
                                    <RolesDetails
                                        roleStatus={this.state.roleStatus} //check why LTO is always empty
                                        handleRoleInput={this.handleRoleInput}
                                        handleRoleList={this.handleRoleList}
                                        SelectedDropdownRoleDetails={this.SelectedDropdownRoleDetails}
                                        DeleteRole={this.DeleteRole}
                                        UpdateRole={this.UpdateRole}
                                        roleName={this.state.roleName}
                                        roleDescription={this.state.roleDescription}
                                        menuList={this.props.menuList}
                                        resourceList={this.props.resourceList}
                                        selectedRole={this.state.selecteRole}
                                        selectedMenu={this.state.selectedMenu}
                                        selectedResource={this.state.selectedResource}
                                        isEditMode={this.state.isEditMode}
                                        ApplicationMode={this.props.ApplicationMode}
                                        menuValues={finalMenuList}
                                        resourceValues={resourceValues}
                                        handleRoleToLto ={this.handleRoleToLto}
                                        isBindToLto={this.isBindToLto}
                                        selectedCurrentLTO={this.props.selectedCurrentLTO}
                                        selectedCurrentLTO={this.props.selectedCurrentLTO}
                                        handleDeleteRoleModal={this.handleDeleteRoleModal}
                                    />
                                </Row>
                            </TabPanel>
                        </Tabs> : null
                }

            </div>
        );
    }
}
export default (TabsProject);
