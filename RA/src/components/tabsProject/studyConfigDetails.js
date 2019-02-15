import React, { Component, Fragment } from "react";
import ReactGrid from '../base/reactAgGrid';
import { Col, Input, Button, Card } from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

export const StudyConfigModal = (props) => {
    return (
        <div className='row' >
            <Input label="Assignment" className="s6" type='text' name="assignment" onChange={props.inputHandlerChange} autoComplete='off' />
            <Input label="Description" className="s6" type='text' name="description" onChange={props.inputHandlerChange} autoComplete='off' />
            <Input label="Ratio" className="s6" type='number' step="0.1" name="ratio" onChange={props.inputHandlerChange} autoComplete='off' />
            <Input label="Sequence Limit" className="s6" type='number' name="sequenceLimit" onChange={props.inputHandlerChange} autoComplete='off' />
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
                <div>
                    {props.ApplicationMode == "VIEW" ? null :
                    <div className="right-align mt-2">
                        <a className="mb-3 mr-3" onClick={props.submitStudyConfig} href="">{localConstant.commonConstants.SAVE}</a>
                        <a className="mb-3 mr-3" onClick={props.deleteStudyConfig} href="">{localConstant.commonConstants.DELETE}</a>
                    </div>
                    }
                    <Card className="s6 white lighten-4 black-text">
                        <label className='pl-2' style={{ fontSize: '22px' }} >{localConstant.study_Config.RANDOM_ASSIGNMENT}</label>
                        <div className='row pl-2 pr-2 pt-1' >
                            <Input s={6} label="Description" name="description" onChange={props.studyConfigChangeHandler}
                                defaultValue={props.studyConfigList.description} autoComplete='off' readOnly={props.ApplicationMode == "VIEW" ? true : false} />
                            <Input label="Block Size" s={6} type="number" name="blockSize" onChange={props.studyConfigChangeHandler}
                                defaultValue={props.studyConfigList.blockSize} autoComplete='off' readOnly={props.ApplicationMode == "VIEW" ? true : false} />
                        </div>
                        <label className='pl-2' >{localConstant.study_Config.GROUPS}</label>
                        {props.ApplicationMode == "VIEW" ? null :
                            <div className="right mr-5">
                                <Button className='orgIcon' onClick={props.showStudyConfigModal}>
                                    <i class="material-icons" title='Add Group'>add_circle</i>
                                </Button>
                                {/* <Button className='orgIcon' onClick={props.deleteStudyConfigGroups}>
                                <i class="material-icons" title='Delete Group'>delete</i>
                            </Button> */}
                            </div>
                        }
                        <br />
                        <br />
                        <ReactGrid
                            gridColData={props.columnDefs}
                            gridRowData={objectUtil.isEmpty(props.studyConfigList.groups) ? [] : props.studyConfigList.groups}
                            onRef={props.onRef}
                            editGridRowData={props.editGridRowData} />
                    </Card>
                    {/* <Card className="s6 white lighten-4 black-text" title={localConstant.study_Config.GROUPS} >
                        <ReactGrid
                            gridColData={props.columnDefs}
                            gridRowData={objectUtil.isEmpty(props.studyConfigList.groups) ? [] : props.studyConfigList.groups}
                            onRef={props.onRef}
                            editGridRowData={props.editGridRowData} />
                        {props.ApplicationMode == "VIEW" ? null :
                            <div className="right-align mt-2 pr-2">
                                <Button onClick={props.showStudyConfigModal} className="btn_secondary" >{localConstant.commonConstants.ADD}</Button>
                                <Button onClick={props.deleteStudyConfigGroups} className="ml-1 btn_secondary">{localConstant.commonConstants.DELETE}</Button>
                            </div>
                        }
                    </Card>
                    {props.ApplicationMode == "VIEW" ? null :
                        <div className="right-align">                            
                            <Button className="mb-2 mr-1 btn_secondary" onClick={props.submitStudyConfig}
                            // disabled={objectUtil.isEmpty(props.studyConfigList) ? true : false} 
                            >{localConstant.commonConstants.SAVE}</Button>
                            <Button className="mb-2 mr-1 btn_secondary" onClick={props.deleteStudyConfig}
                            // disabled={objectUtil.isEmpty(props.finalStudyConfigData) ? true : false} 
                            >{localConstant.commonConstants.DELETE}</Button>
                        </div>
                    } */}
                </div>}
        </Fragment>
    );
};