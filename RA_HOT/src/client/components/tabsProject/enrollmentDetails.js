import React, { Fragment } from "react";
import ReactGrid from '../base/reactAgGrid';
import DatePicker from 'react-datepicker';
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
                    <label className="col s3 pt-3 pr-5 pl-2" >Month<label className="danger-txt">*</label></label>
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
                </div>
            </div>
            <div className="row">
                <label className="col s3 pt-3 pl-2">Target<label className="danger-txt">*</label></label>
                <div className="pl-0">
                    <Input type='number' min="0" name="target" onChange={props.inputHandlerChange} defaultValue={props.editedRowData.target} key={props.editedRowData.target} />
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
                    <Card className="white lighten-4 black-text" >
                        {props.ApplicationMode !== 'VIEW' ?
                            <div className="right pr-2 mr-10">
                                <a onClick={props.showEnrollmentTargetModal} href="">{localConstant.Enrollment_Target.ADD_ENROLLMENT}</a>
                            </div> : null}
                        <br /><br />
                        <ReactGrid
                            gridColData={props.columnDefs}
                            gridRowData={props.enrollmentTargetData && props.enrollmentTargetData}
                            onRef={props.onRef}
                        />
                    </Card>
                </div> }
        </Fragment>
    );
};
