/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import axios from 'axios';
import { StudyConfigModal, EnrollmentTargetModal, Functions, StudyConfig, EnrollmentTarget } from './tabs';
import { HeaderData } from './headerData.js';
import { Row, Tab, Tabs, Col, Input, Table, Icon, Button, Card } from 'react-materialize';
import Modal from '../../components/base/modal';
import objectUtil from '../../utils/objectUtil';
import { RolesDetails } from './rolesDetails';
import Page from '../../views/page';
const localConstant = objectUtil.getlocalizeData();

class TabsProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleStatus: false,//change this state to false when org is changed
            rolesTabSelected: false,
            openStudyConfigModal: false,
            openEnrollmentTargetModal: false,
            key: 1,
            roleName: '',
            roleDescription: '',
            isEnrollmentEdit: false,
            startDate: "",
            selecteRole: '',
            isEditMode: false,
            newRole: 1,
            selectedMenu: [],
            selectedResource: [],
        };
        this.updatedData = {};
        this.editedRowData = {};
        this.inputData = {};
        this.rolesData = {};
        this.menuData = {};
        this.resourceData = {};
        this.studyConfigTab = false;
        this.enrollmentTargetTab = false;
        this.rolesTab = false;
        this.previousId = 0;
        this.month = "";
        this.formatedMonth = "";
        this.isBindToLto = false;
	 this.studyConfigAddButtons = [
            {
                name: 'Cancel',
                action: this.cancelStudyConfigModal,
                btnClass: 'btn_secondary mr-1',
                showbtn: true
            },
            {
                name: 'Submit',
                action: this.submitStudyConfigGroups,
                btnClass: 'btn_secondary',
                showbtn: true
            }
        ];
    }
    updateEnrollmentTargetModal = () => {
        const combinedData = Object.assign(this.editedRowData, this.updatedData);
        this.props.actions.UpdateEnrollmentTarget(combinedData);
        this.cancelEnrollmentTargetModal();
    }
    editRowHandler = (data) => {
        const d = new Date(data.month);
        d.setDate(d.getDate())
        this.setState((state) => {
            return {
                openEnrollmentTargetModal: !state.openEnrollmentTargetModal,
                isEnrollmentEdit: true,
            };
        });
        this.setState({
            startDate: d
        });
        this.editedRowData = data;
    }

    handleRoleInput = (e) => {
        if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Attribute") {
            this.rolesData[e.target.name] = e.target.checked ? 1 : 0;
            console.log(this.rolesData);
        } else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Resource") {
            this.resourceData[e.target.value] = e.target.checked ? 1 : 0;
            // this.resourceData.id = e.target.value;
            console.log(this.resourceData)
        } else if (e.target.type === "checkbox" && e.target.getAttribute("roleType") === "Menu") {
            // this.menuData[e.target.name + "id"] = e.target.value;
            this.menuData[e.target.value] = e.target.checked ? 1 : 0;
            console.log(this.menuData)
        }
        else {
            this.rolesData[e.target.name] = e.target.value;
        }

    }
    handleRoleTOLto = (e) => {
        this.isBindToLto = e.target.checked;
    }
    handleRoleDescription = (e) => {
        this.setState({ roleDescription: e.target.value });
    }
    componentDidMount = () => {
        if (this.props.ApplicationMode == 'VIEW') {
            this.props.selectedOrg.roles.map(item => this.props.actions.AddRoleDetails(item));
            //this.props.selectedOrg.roles.map(item => this.props.actions.AddMenuDetails(item));
        }
        else {//for create mode
            this.props.actions.FetchMenus();
            this.props.actions.FetchResource();
            this.props.actions.FetchEnrollmentTarget();
            objectUtil.bindAction(HeaderData.enrollmentTargetHeader, "EditColumn", this.editRowHandler);
        }
    }
    isFirstday = (date) => {
        const day = date.getDate()
        return day === 1
    }
    //formatDate(inputFormat, separator) {
    //function pad(s) { return (s < 10) ? '0' + s : s; }
    // const d = new Date(inputFormat).toISOString();
    //}

    submitEnrollmentTargetModal = (e) => {
        e.preventDefault();
        if (this.updatedData && !(this.isEmpty(this.updatedData))) {
            this.props.actions.AddEnrollmentTarget(this.updatedData);
            this.updatedData = {};
            this.setState({
                openEnrollmentTargetModal: !this.state.openEnrollmentTargetModal,
            });
        }
    }
    cancelEnrollmentTargetModal = () => {
        this.setState({ openEnrollmentTargetModal: !this.state.openEnrollmentTargetModal });
    }

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
                window.Materialize.toast('Ratio should not be more than 1', 1000);
            }
        }
        if (e.target.name === "sequenceLimit") {
            if (e.target.value < 0) {
                window.Materialize.toast('Sequence Limit should not be less than 0', 1000);
                e.target.value = "";
            }
        }
    }
    showAddRoles = () => {
        this.setState({
            roleStatus: true,
            rolesTabSelected: true,
            isEditMode: false,
            selecteRole: {},
            selectedMenu: [],
            selectedResource: []

        });
    }

    enrollmentDateHandler = (data) => {
        this.month = data
        this.formatedMonth = data
        this.setState({
            // startDate:  this.month.setDate(this.month.getDate())
            startDate: this.month
        });
        //this.formatedMonth.setDate(this.formatedMonth.getDate() )
        this.formatedMonth.setMinutes(30);
        this.formatedMonth.setHours(5);
        this.formatedMonth = this.formatedMonth.toISOString()
        this.updatedData["month"] = this.formatedMonth;
    }

    //Study Config
    studyConfigTabHandler = () => {
        this.studyConfigTab = true;
        this.setState({ rolesTabSelected: true });
    }
    studyConfigChangeHandler = (e) => {
        this.inputData[e.target.name] = e.target.value;
        this.inputData['ltoId'] = this.props.selectedCurrentLTO;
    }
    studyConfigValidation = (data) => {
        let sum = 0;
        let groups = [];
        this.props.studyConfigList.map(item => { if (item.ltoId === this.props.selectedCurrentLTO) groups = item.groups });
        groups && groups.map(res => {
            sum = sum + parseFloat(res.ratio);
        });
        if (parseFloat(data) + sum > 1) {
            window.Materialize.toast('Cumulative Ratio should not be more than 1', 1000);
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
            window.Materialize.toast('Please fill the details', 1000);
    }
    showStudyConfigModal = (e) => {
        e.preventDefault();
        this.setState({ openStudyConfigModal: true });
        if (!objectUtil.isEmpty(this.inputData)) {
            this.inputData['groups'] = [];
            this.props.actions.AddStudyConfig(this.inputData);
        }
        this.inputData = {};
        this.studyConfigTabHandler();
    }
    submitStudyConfig = (e) => {    
        this.studyConfigTabHandler();
        let sum = 0;
        this.props.studyConfigList.map(item => { if (item.ltoId === this.props.selectedCurrentLTO){
            item.groups.map(res => {
                sum = sum + parseFloat(res.ratio);
            })
        }
        });
        if (sum > 1)
            window.Materialize.toast('Cumulative Ratio should not be more than 1', 1000);
        else {
            if (!objectUtil.isEmpty(this.inputData))
                this.props.actions.AddFinalStudyConfig(this.inputData);
        }
    }
    cancelStudyConfigModal = () => {
        this.updatedData = {};
        this.setState({ openStudyConfigModal: !this.state.openStudyConfigModal });
    }
    studyConfigChangeHandler = (e) => {
        this.inputData[e.target.name] = e.target.value;
        this.inputData['ltoId'] = this.props.selectedCurrentLTO;
    }
    deleteStudyConfig = () => {
        this.studyConfigTabHandler();
        const selectedData = this.gridChild.getSelectedRows();
        if (!(objectUtil.isEmpty(selectedData))) {
            this.gridChild.removeSelectedRows(selectedData);
            const rowsToDisplay = this.gridChild.gridApi.clientSideRowModel.rowsToDisplay.map(row => row.data);
            this.props.actions.DeleteStudyConfig(rowsToDisplay);
        }
        else
            window.Materialize.toast('Please Select a row to delete', 1000);
    }
    editStudyConfig = (params) => {
        this.studyConfigTabHandler();
        const rowsToDisplay = params.api.clientSideRowModel.rowsToDisplay.map(row => row.data);
        let sum = 0;
        rowsToDisplay.map(res => {
            sum = sum + parseFloat(res.ratio);
        });
        if (sum > 1)
            window.Materialize.toast('Cumulative Ratio should not be more than 1', 1000);
        else
            this.props.actions.UpdateStudyConfig(rowsToDisplay);
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
    }//room for improvment, this is required because ds of the received role is different than ds of created role
    //this function will give the desired ds
    handleRoleDropdown = (e) => {
        this.setState({
            selectedDropdownRole: e.target.value,
            roleStatus: true,
            isEditMode: true
        });
        const selectedValue = e.target.value;
        let filteredRoles = this.props.roleDetails.filter((role) => role.id == selectedValue);
        let { description, id, isAssignable, isAutoAccess, isAutoAssignOnIntake, name } = filteredRoles[0];
        let filteredRolesData = this.props.ApplicationMode !== 'CREATE' ?
            this.roleBodyCreate(description, id, isAssignable.data[0], isAutoAccess.data[0], isAutoAssignOnIntake.data[0], name)
            : filteredRoles[0];
        let filteredMenu = this.props.menuDetails.filter((menu) => menu.roleId == selectedValue);
        let filteredResource = this.props.resourceDetails.filter((resource) => resource.roleId == selectedValue);
        this.setState({ selecteRole: filteredRolesData });// in view the ds of roles is different please take
        let filteredValueMenu = this.props.ApplicationMode !== 'CREATE'?
                this.props.menuRoleAccessDetails.map(item => item.menuId)://for view/edit fetch files from menuRoleAccessDetails
                Object.keys(filteredMenu[0].menuId).filter(item => filteredMenu[0].menuId[item] == 1);
        console.log(filteredValueMenu);
        this.setState(prevState => ({
            selectedMenu: [prevState.selectedMenu, ...filteredValueMenu]
        }));

        let filteredValueResource = this.props.ApplicationMode !== 'CREATE'?
                this.props.resourceRoleAccessDetails.map(item => item.resourceId): //for view/edit fetch files from resourceRoleAccessDetails
                Object.keys(filteredResource[0].resourceId).filter(item => filteredResource[0].resourceId[item] == 1);
        this.setState(prevState => ({
            selectedResource: [prevState.selectedResource, ...filteredValueResource]
        }));
    }
    editStudyConfig = (params) => {
        this.studyConfigTabHandler();
        const rowsToDisplay = params.api.clientSideRowModel.rowsToDisplay.map(row => row.data);
        this.props.actions.UpdateStudyConfig(rowsToDisplay);
    }
    SelectedDropdownRoleDetails = (e) => {
        e.preventDefault();
        let newRole = {};
        const isDuplicatte = this.props.roleDetails.map((iteratedValue) => {
            if (iteratedValue.roleName === this.rolesData.roleName) {
                return true
            }
        });
        if (isDuplicatte.includes(true)) {
            window.Materialize.toast('Already Exist', 5000)
            return false;
        } else {
            this.setState({
                roleStatus: false
            })
            this.rolesData.roleId = this.state.newRole;
            const role = {
                "id": this.state.newRole,
                "name": this.rolesData.roleName ? this.rolesData.roleName : '',
                "description": this.rolesData.roleDescription ? this.rolesData.roleDescription : '',
                "orgId": this.isBindToLto ? this.props.selectedCurrentLTO : this.props.selectedCurrentTTO,
                "isAssignable": this.rolesData.isAssignable ? this.rolesData.isAssignable : 0,
                "isAutoAccess": this.rolesData.isAutoAccess ? this.rolesData.isAutoAccess : 0,
                "isAutoAssignOnIntake": this.rolesData.isAutoAssignOnIntake ? this.rolesData.isAutoAssignOnIntake : 0,
                "flag": "createFlag"
            }
            const menu = {
                "roleId": this.state.newRole,
                "menuId": this.menuData,
                "orgId": this.props.selectedCurrentTTO,
                "locId": this.props.selectedCurrentLTO
            }
            const resource = {
                "roleId": this.state.newRole,
                "resourceId": this.resourceData,
                "orgId": this.props.selectedCurrentTTO,
                "locId": this.props.selectedCurrentLTO
            }
            this.props.actions.AddRoleDetails(role);
            this.props.actions.AddMenuDetails(menu);
            this.props.actions.AddResourceDetails(resource);
            this.rolesData = {};
            this.menuData = {};
            this.resourceData = {};
        }
        this.setState({ newRole: this.state.newRole + 1 });
    }

    DeleteRole = () => {
        this.props.actions.DeleteRoleDetails(this.state.selecteRole, this.rolesData, this.menuData, this.resourceData)
        this.setState({
            roleStatus: false,
            selecteRole: {}
        });

    }
    UpdateRole = () => {
        this.props.actions.UpdateRoleDetails(this.state.selecteRole, this.rolesData, this.menuData, this.resourceData, this.props.selectedCurrentTTO)
        this.setState({
            roleStatus: false,
            //selecteRole:{}
        });

    }
    formatDate(inputFormat, separator) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        const d = new Date(inputFormat).toISOString();
        return d;
    }

    //Enrollment Target
    showEnrollmentTargetModal = (e) => {
        e.preventDefault();
        this.setState({ openEnrollmentTargetModal: true, startDate: '', isEnrollmentEdit: false });
        this.enrollmentTargetTab = true;
        this.studyConfigTab = false;
        this.setState({ rolesTabSelected: true });
        this.updatedData = {};
    }
    submitEnrollmentTargetModal = (e) => {
        e.preventDefault();
        this.previousId = this.previousId + 1;
        if (this.updatedData && !(objectUtil.isEmpty(this.updatedData))) {
            // this.updatedData["id"] = Math.floor(Math.random() * (Math.pow(10, 2)));
            this.updatedData["id"] = this.previousId;
            this.updatedData["month"] = this.formatedMonth;
            this.updatedData["orgId"] = this.props.selectedCurrentLTO;
            this.props.actions.AddEnrollmentTarget(this.updatedData);
            this.cancelEnrollmentTargetModal();
        } else {
            window.Materialize.toast("Please enter the fields");
        }
    }

    cancelEnrollmentTargetModal = () => {
        this.updatedData = {};
        this.setState({ openEnrollmentTargetModal: !this.state.openEnrollmentTargetModal });
    }
    deleteEnrollmentTarget = () => {
        const selectedData = this.gridChildren.getSelectedRows();
        this.gridChildren.removeSelectedRows(selectedData);
        this.props.actions.DeleteEnrollmentTarget(selectedData);
    }
    editEnrollmentTarget = (data) => {
        const res = data.data;
        this.props.actions.UpdateEnrollmentTarget(res);
    }

    render() {
        console.log(this.state.openEnrollmentTargetModal)
        this.enrollmentButtons = [
            {
                name: 'Cancel',
                action: this.cancelEnrollmentTargetModal,
                btnClass: 'btn_secondary mr-1',
                showbtn: true
            },
            {
                name: 'Submit',
                action: this.state.isEnrollmentEdit ? this.updateEnrollmentTargetModal : this.submitEnrollmentTargetModal,
                btnClass: 'btn_secondary',
                showbtn: true
            }
        ];
        const { studyConfigList, enrollmentTargetData } = this.props;
        let raConfigDefault = {};
        studyConfigList.map(item => { if (item.ltoId === this.props.selectedCurrentLTO) raConfigDefault=item });
        return (
            <div className='tabs-project' id="tabsProject">
                {
                    this.props.selectedCurrentTTO != "" ?
                        <Tabs className='tab-demo z-depth-1 p-0 tabs-fixed-width'>
                            <Tab title={localConstant.functions.FUNCTIONS} value={1} active={!this.state.rolesTabSelected} >
                                <Functions
                                    inputHandlerChange={this.inputHandlerChange} />
                            </Tab>
                            <Tab title={localConstant.study_Config.STUDY_CONFIG} active={this.studyConfigTab}>
                                <Modal title={localConstant.study_Config.ADD_STUDY_CONFIG}
                                    buttons={this.studyConfigAddButtons}
                                    isShowModal={this.state.openStudyConfigModal} >
                                    <StudyConfigModal
                                        inputHandlerChange={this.inputHandlerChange} />
                                </Modal>
                                <StudyConfig
                                    studyConfigList={raConfigDefault}
                                    selectedLTO={this.props.selectedCurrentLTO}
                                    columnDefs={HeaderData.studyConfigHeader}
                                    showStudyConfigModal={this.showStudyConfigModal}
                                    studyConfigChangeHandler={this.studyConfigChangeHandler}
                                    deleteStudyConfig={this.deleteStudyConfig}
                                    editGridRowData={this.editStudyConfig}
				    submitStudyConfig={this.submitStudyConfig}
                                    onRef={ref => { this.gridChild = ref; }} />
                            </Tab>
                            <Tab title="Enrollment Target" active={this.enrollmentTargetTab} >
                                <Modal title={"Enrollment Target"}
                                    buttons={this.enrollmentButtons}
                                    isShowModal={this.state.openEnrollmentTargetModal}>
                                    <EnrollmentTargetModal
                                        inputHandlerChange={this.inputHandlerChange}
                                        editedRowData={this.editedRowData}
                                        startDate={this.state.startDate}
                                        //month={this.month}
                                        enrollmentDateHandler={this.enrollmentDateHandler}
                                        isFirstday={this.isFirstday}
                                    />
                                </Modal>
                                <EnrollmentTarget
                                    enrollmentTargetData={enrollmentTargetData}
                                    selectedLTO={this.props.selectedCurrentLTO}
                                    columnDefs={HeaderData.enrollmentTargetHeader}
                                    showEnrollmentTargetModal={this.showEnrollmentTargetModal}
                                    deleteEnrollmentTarget={this.deleteEnrollmentTarget}
                                    ApplicationMode={this.props.ApplicationMode}
                                    onRef={ref => { this.gridChildren = ref; }}
                                />
                            </Tab>
                            <Tab title="Pages">
                                <Row className="m-0 mt-3 pl-1 CreateProjectTabContent">
                                    <Col s={12}><Page /></Col>
                                </Row>
                            </Tab>
                            <Tab title="Roles" active={this.state.rolesTabSelected}>
                                <Row className="m-0 mt-3 pl-1 CreateProjectTabContent">
                                    {this.props.ApplicationMode == 'VIEW' ?
                                        null :
                                        <Fragment>
                                            <Col className='mb-2' s={6}>Roles</Col>
                                            <Col className='mb-2' s={3}><Button className="btn_secondary" onClick={this.showAddRoles}>Add Role</Button></Col>
                                            <Col className='mb-2' s={3}><Button className="btn_secondary">Copy Role</Button></Col>
                                        </Fragment>
                                    }
                                    <div className='col s12 m12 l12 xl12 role-body'>
                                        <select className="browser-default col input-field s12 m4 l4 x4 mt-0 mb-3" onChange={this.handleRoleDropdown}>
                                            <option disabled selected value=''>Select an Role</option>
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
                                        {this.props.ApplicationMode !== 'VIEW' ?
                                            <Input name='roleToLocation' type='checkbox' onChange={this.handleRoleTOLto} checked={this.isBindToLto} disabled={this.props.selectedCurrentLTO == '' ? true : false} value='red' label={this.props.selectedCurrentLTO == '' ? 'The role will bind to Organization' : 'Check this to bind the role to Location'} />
                                            : null
                                        }
                                    </div>

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
                                    />
                                </Row>
                            </Tab>
                        </Tabs> : null
                }
            </div>
        );
    }
}


export default (TabsProject);
