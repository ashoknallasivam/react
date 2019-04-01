import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import ReactGrid from '../base/reactAgGrid';
import { HeaderData } from './headerData.js';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();
import uuid from 'uuid';

class StudyConfigTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            description: '',
            blockSize: '',
            groups: [],
            groupStatus: "",
            deleteModal: false,
            deleteStatus: ""
        }
        this.updatedData = {};
        this.editedRowData = {};
        this.isExistStudyConfig = "";
        objectUtil.bindAction(HeaderData.Headerdata, "EditColumn", this.editStudyConfigModal);
        objectUtil.bindAction(HeaderData.Headerdata, "DeleteColumn", this.deleteGroupsModal);
    }
    componentDidMount() {
        if (this.props.StudyConfig != undefined) {
            if (this.props.StudyConfig.length > 0) {
                this.setState({
                    StudyConfig: this.props.StudyConfig,
                    groups: this.props.StudyConfig[0].groups,
                    description: this.props.StudyConfig[0].description,
                    blockSize: this.props.StudyConfig[0].blockSize
                });
            }
        }
    }
    componentWillReceiveProps(props) {
        if (props.applicationMode == "CREATE"){
        if (this.props.StudyConfig != undefined) {
            if (this.props.StudyConfig.length > 0) {
                this.setState({
                    StudyConfig: this.props.StudyConfig,
                    groups: this.props.StudyConfig[0].groups,
                    description: this.props.StudyConfig[0].description,
                    blockSize: this.props.StudyConfig[0].blockSize
                });
            }
        }
    }
    else {
        this.setState({
            StudyConfig: props.StudyConfig
        });
    }
        if (props.StudyConfig != undefined) {
            if (props.StudyConfig.length > 0) {
                this.setState({
                    groups: props.StudyConfig[0].groups,
                    description: props.StudyConfig[0].description,
                    blockSize: props.StudyConfig[0].blockSize
                });
            }
            else {
                this.setState({
                    groups: [],
                    description: "",
                    blockSize: ""
                });
            }
        }
    }
    // Input handler for Description and Blocksize
    studyConfigChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    // Input handler for Groups
    inputHandlerChange = (e) => {
        this.updatedData[e.target.name] = e.target.value;
    }
    // Input handler for Ratio - Groups
    ratioInputHandler = (e) => {
        if (parseFloat(e.target.value) <= 1.00 && parseFloat(e.target.value) >= 0.00) {
            const expression = ("(\\d{0," + parseInt(1) + "})[^.]*((?:\\.\\d{0," + parseInt(2) + "})?)");
            const rg = new RegExp(expression, "g");
            const match = rg.exec(e.target.value);
            e.target.value = match[1] + match[2];
        }
        else {
            if (isNaN(e.target.value) || e.target.value == "")
                e.target.value = "";
            else {
                e.target.value = "";
                window.Materialize.toast(localConstant.warningMessages.RATIO_VALIDATION, 1000);
            }
        }
        this.updatedData.ratio = e.target.value;
    }
    // Add Groups - Modal open
    addStudyConfigModal = () => {
        this.editedRowData.assignment = "";
        this.editedRowData.description = "";
        this.editedRowData.ratio = "";
        this.editedRowData.sequenceLimit = "";
        this.setState({ openModal: true, groupStatus: "add" });
    }
    // Edit Groups - Modal open
    editStudyConfigModal = (data) => {
        this.setState({ openModal: true, groupStatus: "" });
        this.editedRowData = data;
    }
    // Delete StudyConfig - Modal open
    deleteStudyConfigModal = () => {
        this.setState({ deleteModal: true, deleteStatus: "raConfig" });
    }
    // Delete group - Modal open
    deleteGroupsModal = () => {
        this.setState({ deleteModal: true, deleteStatus: "" });
    }
    // Add Groups - Ok Button
    submitStudyConfigGroups = () => {

        if (!objectUtil.isEmpty(this.updatedData.assignment) && !objectUtil.isEmpty(this.updatedData.description) &&
            !objectUtil.isEmpty(this.updatedData.ratio) && !objectUtil.isEmpty(this.updatedData.sequenceLimit)) {
            this.setState({
                groups: [...this.state.groups, this.updatedData]
            });
            this.cancelStudyConfigModal();
        }
        else window.Materialize.toast(localConstant.warningMessages.MANDATORY_VALIDATION, 1000);
    }
    // Edit Groups - Ok Button
    editStudyConfigGroups = () => {
        debugger
        const combinedData = Object.assign(this.editedRowData, this.updatedData);
        if (!objectUtil.isEmpty(combinedData.assignment) && !objectUtil.isEmpty(combinedData.description) &&
            combinedData.ratio != "" && combinedData.sequenceLimit != "") {
            this.gridChild.refreshCells(true);
            this.cancelStudyConfigModal();
            this.editedRowData.assignment = "";
            this.editedRowData.description = "";
            this.editedRowData.ratio = "";
            this.editedRowData.sequenceLimit = "";
        }
        else window.Materialize.toast(localConstant.warningMessages.MANDATORY_VALIDATION, 1000);
    }
    // Modal close
    cancelStudyConfigModal = () => {
        this.setState({ openModal: false, deleteModal: false });
        this.editedRowData = {};
        this.updatedData = {};
    }
    // Groups - Delete
    deleteStudyConfigGroups = () => {
        const selectedData = this.gridChild.getSelectedRows();
        this.gridChild.removeSelectedRows(selectedData);
        const rowsToDisplay = this.gridChild.gridApi.clientSideRowModel.rowsToDisplay.map(row => row.data);
        this.setState({ groups: rowsToDisplay, deleteModal: false });
    }
    // StudyConfig Save
    studyConfigSaveHandler = () => {
        if (!objectUtil.isEmpty(this.state.description) && !objectUtil.isEmpty(this.state.blockSize) && !objectUtil.isEmpty(this.state.groups)) {
            let sum = 0;
            this.state.groups.map(item => {
                if (item.ratio)
                    sum = sum + parseFloat(item.ratio);
            });
            if (sum === 1) {
                let _id = 0;
                let stratum = [];
                let statusFlag = "";
                if (this.isExistStudyConfig == "yes") {
                    _id = this.state.StudyConfig[0]._id;
                    stratum = this.state.StudyConfig[0].stratum;
                    statusFlag = "modified";
                }
                else {
                    _id = uuid.v4();
                    let stratumData = {};
                    stratumData.value = this.props.selectedLocation.id;
                    stratumData.variable = "ltoId";
                    stratum.push(stratumData);
                    statusFlag = "new";
                }
                let StudyConfig = {};
                StudyConfig._id = _id;
                StudyConfig.description = this.state.description;
                StudyConfig.blockSize = this.state.blockSize;
                StudyConfig.groups = this.state.groups;
                StudyConfig.stratum = stratum;
                StudyConfig.statusFlag = statusFlag;
                this.props.actions.SaveStudyConfig(this.props.selectedLocation.tenantId, StudyConfig);
                window.Materialize.toast(localConstant.warningMessages.SAVING_DATA, 1000);
            }
            else window.Materialize.toast(localConstant.warningMessages.CUMULATIVE_RATIO_VALIDATION, 1000);
        }
        else window.Materialize.toast(localConstant.warningMessages.MANDATORY_VALIDATION, 1000);
    }
    // StudyConfig Cancel
    studyConfigCancelHandler = () => {
        if (this.isExistStudyConfig == "yes") {
            this.setState({
                description: this.props.StudyConfig[0].description,
                blockSize: this.props.StudyConfig[0].blockSize,
                groups: this.props.StudyConfig[0].groups
            });
        }
        else {
            this.setState({
                description: "",
                blockSize: "",
                groups: []
            });
        }
    }
    // StudyConfig Delete
    studyConfigDeleteHandler = () => {
        let StudyConfig = {};
        this.state.StudyConfig.map(item => StudyConfig = item);
        StudyConfig.statusFlag = "delete";
        this.props.actions.SaveStudyConfig(this.props.selectedLocation.tenantId, StudyConfig);
        this.cancelStudyConfigModal();
        this.setState({
            description: "",
            blockSize: "",
            groups: []
        });
    }
    render() {
        if (this.props.StudyConfig != undefined) {
            if (this.props.StudyConfig.length > 0 && this.props.StudyConfig[0].hasOwnProperty('_id')) {
                this.isExistStudyConfig = "yes";
            }
            else this.isExistStudyConfig = "";
        }
        else this.isExistStudyConfig = "";
        return (
            <Fragment>
                {this.state.StudyConfig ?
                    <div>
                        {(this.props.applicationMode == "VIEW" && this.state.StudyConfig.length == 0) ?
                            <p className="pl-2">{localConstant.commonConstants.NO_DATA}</p> :
                            <div>
                                <Modal open={this.state.deleteModal}
                                    actions={
                                        <div>
                                            <Button onClick={this.state.deleteStatus == "raConfig" ? this.studyConfigDeleteHandler
                                                : this.deleteStudyConfigGroups} className="btn_secondary otherButtonAddDetUpt">
                                                {localConstant.commonConstants.YES}</Button>
                                            <Button onClick={this.cancelStudyConfigModal} className="btn_secondary otherButtonAddDetUpt ml-2" >
                                                {localConstant.commonConstants.NO}</Button>
                                        </div>
                                    }
                                    header={localConstant.warningMessages.DELETE_CONFIRMATION} >
                                </Modal>
                                <Modal open={this.state.openModal}
                                    actions={
                                        <div>
                                            <Button onClick={this.state.groupStatus == "add" ? this.submitStudyConfigGroups : this.editStudyConfigGroups}
                                                className="btn_secondary otherButtonAddDetUpt" >{localConstant.commonConstants.OK}</Button>
                                            <Button onClick={this.cancelStudyConfigModal} className="btn_secondary otherButtonAddDetUpt ml-2" >
                                                {localConstant.commonConstants.CANCEL}</Button>
                                        </div>
                                    }
                                    header={localConstant.study_Config.STUDY_CONFIG} >
                                    <div className='row pr-2' >
                                        <label className="danger-txt left mt-4">*</label>
                                        <Col s={6} className="pl-0"><Input label={localConstant.study_Config.ASSIGNMENT} type='text' name="assignment"
                                            onChange={this.inputHandlerChange} autoComplete='off' defaultValue={this.editedRowData.assignment} s={12}
                                            key={this.editedRowData.assignment} /></Col>
                                        <label className="danger-txt left mt-4">*</label>
                                        <Col s={6} className="pl-0"><Input label={localConstant.study_Config.DESCRIPTION} type='text' name="description"
                                            onChange={this.inputHandlerChange} autoComplete='off' defaultValue={this.editedRowData.description} s={12}
                                            key={this.editedRowData.description} /></Col>
                                        <label className="danger-txt left mt-4">*</label>
                                        <Col s={6} className="pl-0"><Input label={localConstant.study_Config.RATIO} type='text' name="ratio"
                                            onChange={this.ratioInputHandler} autoComplete='off' defaultValue={this.editedRowData.ratio} s={12}
                                            key={this.editedRowData.ratio} /></Col>
                                        <label className="danger-txt left mt-4">*</label>
                                        <Col s={6} className="pl-0"><Input label={localConstant.study_Config.SEQUENCE_LIMIT} type='number' min="0"
                                            name="sequenceLimit" onChange={this.inputHandlerChange} autoComplete='off' s={12}
                                            defaultValue={this.editedRowData.sequenceLimit} key={this.editedRowData.sequenceLimit} /></Col>
                                    </div>
                                </Modal>
                                <div className='row pl-2 pr-2 pt-1' >
                                    <label className="danger-txt left ml-2 mt-3">*</label>
                                    <Col className="pl-0" s={5} ><Input className="pt-1" s={5} label={localConstant.study_Config.DESCRIPTION} s={12}
                                        name="description" onBlur={this.studyConfigChangeHandler} key={this.state.description}
                                        defaultValue={this.state.description} autoComplete='off'
                                        readOnly={this.props.applicationMode == "VIEW" ? true : false} /></Col>
                                    <label className="danger-txt left ml-5 mt-3">*</label>
                                    <Col className="pl-0" s={5} ><Input className="pt-1" label={localConstant.study_Config.BLOCK_SIZE} s={12}
                                        name="blockSize" onBlur={this.studyConfigChangeHandler} key={this.state.blockSize} type="number"
                                        defaultValue={this.state.blockSize} autoComplete='off' min="0"
                                        readOnly={this.props.applicationMode == "VIEW" ? true : false} /></Col>
                                </div>
                                <div>
                                    <label className="danger-txt left ml-3">*</label>
                                    <label className='ml-1 mb-0' style={{ fontSize: '18px' }} >{localConstant.study_Config.GROUPS}</label>
                                    {this.props.applicationMode == "VIEW" ? null :
                                        <a className="right mr-9" onClick={this.addStudyConfigModal} >{localConstant.study_Config.ADD_GROUPS}</a>}
                                </div>
                                <ReactGrid
                                    gridColData={this.props.applicationMode == "VIEW" ? HeaderData.Headerdata_View : HeaderData.Headerdata}
                                    gridRowData={this.state.groups}
                                    onRef={ref => { this.gridChild = ref }}/>
                                {this.props.applicationMode != "VIEW" ?
                                    <div>
                                        <Button onClick={this.studyConfigSaveHandler} className="btn_secondary otherButtonAddDetUpt ml-2 mb-1">
                                            {localConstant.commonConstants.SAVE}</Button>
                                        <Button onClick={this.studyConfigCancelHandler} className="btn_secondary otherButtonAddDetUpt ml-2 mb-1">
                                            {localConstant.commonConstants.CANCEL}</Button>
                                        {this.isExistStudyConfig == "yes" ? <Button onClick={this.deleteStudyConfigModal}
                                            className="btn_secondary otherButtonAddDetUpt ml-2 mb-1">{localConstant.commonConstants.DELETE}</Button> : null}
                                    </div>
                                    : null}
                            </div>}
                    </div>
                    : <p className="pl-2">{localConstant.commonConstants.SELECT_AN_LTO}</p>}
            </Fragment>
        )
    }
}
export default StudyConfigTab;