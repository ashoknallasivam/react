import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import ReactGrid from '../base/reactAgGrid';
import { HeaderData } from './headerData.js';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

class StudyConfigTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            StudyConfig: [],
            description: '',
            blockSize: '',
            openModal: false,
            groups: []
        }
        this.updatedData = {};
        this.editedRowData = {};
        objectUtil.bindAction(HeaderData.Headerdata, "EditColumn", this.editStudyConfigHandler);
        // objectUtil.bindAction(HeaderData, "DeleteColumn", );
    }
    componentDidMount() {
        if(this.props.StudyConfig != undefined ){
        this.setState({
            StudyConfig: this.props.StudyConfig
        });
        this.setState({
            groups: this.props.StudyConfig[0] && this.props.StudyConfig[0].groups
        });}
    }
    componentWillReceiveProps(props) {
        if(props.StudyConfig != undefined){
        let StudyConfig = props.StudyConfig;
        let groups = props.StudyConfig[0].groups;
        this.setState({
            StudyConfig,
            groups
        });
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
    // Add Groups - Ok Button
    submitStudyConfig = () => { }
    // Edit Groups - Ok Button
    editStudyConfig = () => {
        const combinedData = Object.assign(this.editedRowData, this.updatedData);
        this.gridChild.refreshCells(true);
        // this.editStudyConfigValidation();
        this.cancelStudyConfigModal();
    }
    //Edit - Modal open
    editStudyConfigHandler = (data) => {
        this.setState({ openModal: true });
        this.editedRowData = data;
    }
    //Modal close
    cancelStudyConfigModal = () => {
        this.setState({ openModal: false });
        this.editedRowData = {};
        this.updatedData = {};
    }
    //Save
    StudyConfigSaveHandler = () => {
        const _id = this.state.StudyConfig[0]._id;
        let StudyConfig = {};
        StudyConfig._id = _id;
        StudyConfig.description = this.state.description;
        StudyConfig.blockSize = this.state.blockSize;
        StudyConfig.groups = this.state.groups;
        StudyConfig.statusFlag = "modified";
        this.setState({ StudyConfig });
    }
    render() {
        return (
            <Fragment>
                {this.state.StudyConfig && this.state.StudyConfig.length > 0 ? 
                    <div>
                        <Modal open={this.state.openModal}
                            actions={
                                <div>
                                    <Button onClick={this.editStudyConfig} className="btn_secondary otherButtonAddDetUpt" >
                                        {localConstant.commonConstants.OK}</Button>
                                    <Button onClick={this.cancelStudyConfigModal} className="btn_secondary otherButtonAddDetUpt ml-2" >
                                        {localConstant.commonConstants.CANCEL}</Button>
                                </div>
                            }
                            header={localConstant.study_Config.STUDY_CONFIG} >
                            <div className='row pr-2' >
                                <Input label={localConstant.study_Config.ASSIGNMENT} s={6} type='text' name="assignment" onChange={this.inputHandlerChange}
                                    autoComplete='off' defaultValue={this.editedRowData.assignment} key={this.editedRowData.assignment} />
                                <Input label={localConstant.study_Config.DESCRIPTION} s={6} type='text' name="description" onChange={this.inputHandlerChange}
                                    autoComplete='off' defaultValue={this.editedRowData.description} key={this.editedRowData.description} />
                                <Input label={localConstant.study_Config.RATIO} s={6} type='text' name="ratio" onChange={this.inputHandlerChange}
                                    autoComplete='off' defaultValue={this.editedRowData.ratio} key={this.editedRowData.ratio} />
                                <Input label={localConstant.study_Config.SEQUENCE_LIMIT} s={6} type='number' min="0" name="sequenceLimit" onChange={this.inputHandlerChange}
                                    autoComplete='off' defaultValue={this.editedRowData.sequenceLimit} key={this.editedRowData.sequenceLimit} />
                            </div>
                        </Modal>
                        <div className='row pl-2 pr-2 pt-1' >
                            {/* <label className="danger-txt left mt-3">*</label> */}
                            <Input className="pt-1" s={6} label={localConstant.study_Config.DESCRIPTION} name="description"
                                onChange={this.studyConfigChangeHandler} key={this.state.StudyConfig[0].description}
                                defaultValue={this.state.StudyConfig[0].description} autoComplete='off'
                                readOnly={this.props.applicationMode == "VIEW" ? true : false} />
                            {/* <label className="danger-txt left ml-5 mt-3">*</label> */}
                            <Input className="pt-1" label={localConstant.study_Config.BLOCK_SIZE} s={6} type="number" name="blockSize"
                                onChange={this.studyConfigChangeHandler} key={this.state.StudyConfig[0].blockSize}
                                defaultValue={this.state.StudyConfig[0].blockSize} autoComplete='off'
                                readOnly={this.props.applicationMode == "VIEW" ? true : false} />
                        </div>
                        <label className='pl-2 mb-0' style={{ fontSize: '18px' }} >{localConstant.study_Config.GROUPS}</label>
                        {/* {props.ApplicationMode == "VIEW" ? null :
                         <div className="right mr-10">
                             <a onClick={props.showStudyConfigModal} href="">{localConstant.study_Config.ADD_GROUPS}</a>
                         </div>}
                     <br /><br /> 
                        <div key={this.state.StudyConfig[0].groups} > */}
                        <ReactGrid
                            gridColData={this.props.applicationMode == "VIEW" ? HeaderData.Headerdata_View : HeaderData.Headerdata}
                            gridRowData={this.state.StudyConfig[0].groups}
                            onRef={ref => { this.gridChild = ref }}
                        />
                        {this.props.applicationMode != "VIEW" ?
                            <div>
                                <Button onClick={this.StudyConfigSaveHandler} className="btn_secondary otherButtonAddDetUpt ml-2 mb-1" >
                                    {localConstant.commonConstants.SAVE}</Button>
                                <Button onClick={this.StudyConfigSaveHandler} className="btn_secondary otherButtonAddDetUpt ml-2 mb-1" >
                                    {localConstant.commonConstants.CANCEL}</Button>
                            </div>
                            : null}
                    </div> 
                
            : <div>select location...</div> }
            </Fragment>
        )
    }
}
export default StudyConfigTab;