
import React, { Fragment } from "react";
import ReactGrid from '../base/reactAgGrid';
import DatePicker from 'react-datepicker';
//import Picker from 'react-month-picker'
//import MonthPickerInput from 'react-month-picker-input';
//import MonthPickerInput from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input.css'
import "react-datepicker/dist/react-datepicker.css";
import { Col, Input, Button, Card } from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

export const EnrollmentTargetModal = (props) => {
    return (
        <Fragment>
            <div className='row' >
                <div >
                    <label className="col s3 pt-3 pr-5 pl-2" >Month</label>
                    <DatePicker
                        name="month"
                        autoComplete="off"
                        placeholderText="Click to select a date"
                        dateFormat="yyyy/MM/dd"
                        filterDate={props.isFirstday}
                        showYearDropdown
                        id="uniquenumber"
                        showMonthDropdown
                        selected={props.startDate}
                        onChange={props.enrollmentDateHandler}//Ask nasrin how she is handling change
                    />
                    {/* <Picker years={{min: 2010, max: 2018}}></Picker> */}
                    {/* <MonthPickerInput
                        month={1}
                        onChange={props.enrollmentDateHandler} */}

                </div>
            </div>
            <div className="row">

                <label className="col s3 pt-3 pl-2">Target</label>
                <div className="pl-0">
                    <Input type='number' min="0" name="target" onChange={props.inputHandlerChange} defaultValue={props.editedRowData.target} key={props.editedRowData.target}/>
                </div>
            </div>
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
                    <Card className="white lighten-4 black-text" 
                    // title={localConstant.Enrollment_Target.ENROLLMENT_TARGET_DETAILS}
                     >
                    <div className="right-align pr-2 tab-btn-alignment">
                            {props.ApplicationMode !== 'VIEW' ?
                                <div className="right mr-5">
                                <a  onClick={props.showEnrollmentTargetModal} href="">{localConstant.Enrollment_Target.ADD_ENROLLMENT}</a>
                                    {/* <Button className='orgIcon' onClick={props.showEnrollmentTargetModal}>
                                        <i className="material-icons" title='Add Enrollment'>add_circle</i>
                                    </Button> */}
                                    {/* <Button className='orgIcon' onClick={props.deleteEnrollmentTarget}>
                                        <i className="material-icons" title='Delete Enrollment'>delete</i>
                                    </Button> */}
                                </div>
                                // <Fragment>
                                //     <Button onClick={props.showEnrollmentTargetModal} className="btn_secondary">{localConstant.commonConstants.ADD}</Button>
                                //     <Button onClick={props.deleteEnrollmentTarget} className="btn_secondary ml-2">{localConstant.commonConstants.DELETE}</Button>
                                // </Fragment> 
                                : null}
                        </div>
                        <ReactGrid
                            gridColData={props.columnDefs}
                            gridRowData={props.enrollmentTargetData && props.enrollmentTargetData}
                            //gridRowData={props.enrollmentTargetData && props.enrollmentTargetData.filter(item => item.orgId == props.selectedLTO)}
                            onRef={props.onRef}
                            editGridRowData={props.editGridRowData}
                        />                        
                    </Card>
                </div>
            }
        </Fragment>
    );
};
