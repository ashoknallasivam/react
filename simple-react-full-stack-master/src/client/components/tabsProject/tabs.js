
import React, { Component, Fragment } from "react";
import ReactGrid from '../base/reactAgGrid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Row, Tab, Tabs, Col, Input, Table, Icon, Button, Card, Modal } from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

export const StudyConfigModal = (props) => {
    return (
        <div className='row' >
            <Col s={6} >Assignment</Col>
            <Input className="s6" type='text' name="assignment" onChange={props.inputHandlerChange} autoComplete='off' />
            <Col s={6} >Description</Col>
            <Input className="s6" type='text' name="description" onChange={props.inputHandlerChange} autoComplete='off' />
            <Col s={6} >Ratio</Col>
            <Input className="s6" type='number' step="0.1" name="ratio" onChange={props.inputHandlerChange} autoComplete='off' />
            <Col s={6} >Sequence Limit</Col>
            <Input className="s6" type='number' name="sequenceLimit" onChange={props.inputHandlerChange} autoComplete='off' />
        </div>
    );
};

export const EnrollmentTargetModal = (props) => {
    return (
        <div className='row' >
            <Col s={6} >Month</Col>
            <DatePicker
                name="month"
                autoComplete="off"
                placeholderText="Click to select a date"
                dateFormat="YYYY/MM/dd"
                filterDate={props.isFirstday}
                showYearDropdown
                showMonthDropdown
                selected={props.startDate}
                onChange={props.enrollmentDateHandler}//Ask nasrin how she is handling change
            />
            <Col s={6} >Target</Col>
            <Input className="s6" type='number' min="0" name="target" onChange={props.inputHandlerChange} defaultValue={props.editedRowData.target} />
        </div>
    );
};

export const Functions = (props) => {
    return (
        <Row className="m-0 mt-3 pl-1 CreateProjectTabContent">
            <Col className="mb-3" s={6}>{localConstant.functions.RAPTER_FUNCTIONALITY}</Col>
            <Col className="mb-3" s={3}><a href="#">{localConstant.functions.COPY_CONFIG}</a></Col>
            <Col className="mb-3" s={3}><a href="#">{localConstant.functions.CREATE_CONFIG}</a></Col>
            <div className="switch">
                <Col s={6} >{localConstant.functions.INTAKE}</Col>
                <label> Off <input type="checkbox" name="intake" onChange={props.inputHandlerChange} /> <span class="lever" /> On </label>
            </div>
            <div className="mt-1 switch">
                <Col s={6} >{localConstant.functions.CASE_MANAGEMENT}</Col>
                <label> Off <input type="checkbox" name="caseManagement" onChange={props.inputHandlerChange} /> <span class="lever" /> On </label>
            </div>
            <div className="mt-1 switch">
                <Col s={6} >{localConstant.functions.SERVICE_TRACKING}</Col>
                <label> Off <input type="checkbox" name="serviceTracking" onChange={props.inputHandlerChange} /> <span class="lever" /> On </label>
            </div>
            <div className="mt-1 switch">
                <Col s={6} >{localConstant.functions.CASE_ASSIGNMENT}</Col>
                <label> Off <input type="checkbox" name="caseAssignment" onChange={props.inputHandlerChange} /> <span class="lever" /> On </label>
            </div>
            <div className="mt-1 switch">
                <Col s={6} >{localConstant.functions.USER_MANAGEMENT}</Col>
                <label> Off <input type="checkbox" name="userManagement" onChange={props.inputHandlerChange} /> <span class="lever" /> On </label>
            </div>
        </Row>
    );
}

export const StudyConfig = (props) => {
    return (
        <Fragment>
            {props.selectedLTO == '' ?
                <div className="center-align tab-lto-dependent">
                    <p>{localConstant.commonConstants.SELECT_AN_LTO}</p>
                </div> :
                <div>
                    <label className='pl-2' >{localConstant.study_Config.RANDOM_ASSIGNMENT}</label>
                    <div className='row pl-2 pr-2 pt-1' >
                        <Input s={6} label="Description" name="description" onChange={props.studyConfigChangeHandler}
                            defaultValue={props.studyConfigList.description} autoComplete='off' />
                        <Input label="Block Size" s={6} type="number" name="blockSize" onChange={props.studyConfigChangeHandler}
                            defaultValue={props.studyConfigList.blockSize} autoComplete='off' />
                    </div>
                    <Card className="s6 white lighten-4 black-text" title={localConstant.study_Config.GROUPS} >
                        <ReactGrid
                            gridColData={props.columnDefs}
                            gridRowData={props.studyConfigList && props.studyConfigList.groups}
                            onRef={props.onRef}
                            editGridRowData={props.editGridRowData} />
                        <div className="right-align mt-2 pr-2">
                            <Button onClick={props.showStudyConfigModal} >{localConstant.commonConstants.ADD}</Button>
                            <Button onClick={props.deleteStudyConfig} className="ml-2">{localConstant.commonConstants.DELETE}</Button>                            
                        </div>
                    </Card>
                    <Button className="right mb-2 mr-2 btn_secondary" onClick={props.submitStudyConfig}>{localConstant.study_Config.ADD_STUDY_CONFIG}</Button>
                </div>
            }
        </Fragment>
    );
};

export const EnrollmentTarget = (props) => {
    return (
        <Fragment>
            {props.selectedLTO == '' ?
                <div className="center-align tab-lto-dependent">
                    <p>{localConstant.commonConstants.SELECT_AN_LTO}</p>
                </div> :
                <div>
                    <Card className="white lighten-4 black-text" title={localConstant.Enrollment_Target.ENROLLMENT_TARGET_DETAILS} >
                        <ReactGrid
                            gridColData={props.columnDefs}
                            gridRowData={props.enrollmentTargetData.filter(item => item.orgId == props.selectedLTO)}
                            onRef={props.onRef} 
                          //editGridRowData={props.editGridRowData} 
                        />
                        <div className="right-align pr-2 tab-btn-alignment">
                        {props.ApplicationMode !== 'VIEW' ?
                        <Fragment>
                            <Button onClick={props.showEnrollmentTargetModal} className="btn_secondary">{localConstant.commonConstants.ADD}</Button>
                            <Button onClick={props.deleteEnrollmentTarget} className="btn_secondary ml-2">{localConstant.commonConstants.DELETE}</Button>
                        </Fragment>:null}
                        </div> 
                    </Card>
                </div>
            }
        </Fragment>
    );
};
