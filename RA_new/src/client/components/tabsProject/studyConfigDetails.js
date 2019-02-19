import React, { Component, Fragment } from "react";
import ReactGrid from '../base/reactAgGrid';
import { Col, Input, Button, Card } from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

export const StudyConfigModal = (props) => {
    return (
        <div className='row' >
            <Input label="Assignment" className="s6" type='text' name="assignment" onChange={props.inputHandlerChange}
                autoComplete='off' defaultValue={props.editedRowData.assignment} key={props.editedRowData.assignment} />
            <Input label="Description" className="s6" type='text' name="description" onChange={props.inputHandlerChange}
                autoComplete='off' defaultValue={props.editedRowData.description} key={props.editedRowData.description} />
            <Input label="Ratio" className="s6" type='number' step="0.1" name="ratio" onChange={props.inputHandlerChange}
                autoComplete='off' defaultValue={props.editedRowData.ratio} key={props.editedRowData.ratio} />
            <Input label="Sequence Limit" className="s6" type='number' name="sequenceLimit" onChange={props.inputHandlerChange}
                autoComplete='off' defaultValue={props.editedRowData.sequenceLimit} key={props.editedRowData.sequenceLimit} />
        </div>
    );
};

export const StudyConfig = (props) => {
    return (
        <Fragment>
            {props.selectedLTO == '' ?
                <div className="center-align tab-lto-dependent">
                    <p>{localConstant.commonConstants.SELECT_AN_LTO}</p>
                </div> :
                <div className='row col s12 raconfig'>
                    {props.ApplicationMode == "VIEW" ? null :
                        <div className="right-align mt-1 mr-2">
                            {/* <Button className='orgIcon' onClick={props.deleteStudyConfig}>
                                <i className="material-icons" title='Delete Study Config'>delete</i>
                            </Button> 
                            <a className="mb-3 mr-3" onClick={props.submitStudyConfig} href="">{localConstant.commonConstants.SAVE}</a> */}
                            <a className="mb-3 mr-3" onClick={props.deleteStudyConfig} href="">{localConstant.commonConstants.DELETE}</a>
                        </div>
                    }
                    <div className='raConfigAddDiv row m-0' >
                        {/* <h4 className='pl-2' style={{ fontSize: '22px' }} >{localConstant.study_Config.RANDOM_ASSIGNMENT}</h4> */}
                        <div className='row pl-2 pr-2 pt-1' >
                            <Input s={6} label="Description" name="description" onChange={props.studyConfigChangeHandler} key={props.studyConfigList.description}
                                defaultValue={props.studyConfigList.description} autoComplete='off' readOnly={props.ApplicationMode == "VIEW" ? true : false}
                                onBlur={props.addDescAndBlock} />
                            <Input label="Block Size" s={6} type="number" name="blockSize" onChange={props.studyConfigChangeHandler} key={props.studyConfigList.blockSize}
                                defaultValue={props.studyConfigList.blockSize} autoComplete='off' readOnly={props.ApplicationMode == "VIEW" ? true : false}
                                onBlur={props.addDescAndBlock} />
                        </div>
                        <label className='pl-2 mb-0' style={{ fontSize: '18px' }} >{localConstant.study_Config.GROUPS}</label>
                        {props.ApplicationMode == "VIEW" ? null :
                            <div className="right mr-10">
                                <a className="mb-3 mr-0" onClick={props.showStudyConfigModal} href="">{localConstant.study_Config.ADD_GROUPS}</a>
                            </div>}
                        <br />
                        <div key={props.studyConfigList.groups} >
                            <ReactGrid
                                gridColData={props.columnDefs}
                                gridRowData={objectUtil.isEmpty(props.studyConfigList.groups) ? [] : props.studyConfigList.groups}
                                onRef={props.onRef} />
                        </div>
                    </div>
                </div>}
        </Fragment>
    );
};