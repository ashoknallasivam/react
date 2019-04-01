import React, { Component, Fragment } from 'react';
import { Row, Card, Modal, Button, Input } from 'react-materialize';
import ReactGrid from '../base/reactAgGrid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HeaderData } from '../enrollmentTab/headerData'
import objectUtil from '../../utils/objectUtil';
import uuid from 'uuid';
const localConstant = objectUtil.getlocalizeData();
class EnrollmentTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enrollemntTargets: [],
            openModal: false,
            deleteModal: false,
            startDate: null,
            isModal: '',
        }
        this.editedRowData = {};
        this.updatedData = {};
        this.previousId = 0;
        objectUtil.bindAction(HeaderData.enrollmentTargetHeaderCreate, "EditColumn", this._editRowHandler);
        objectUtil.bindAction(HeaderData.enrollmentTargetHeaderCreate, "DeleteColumn", this._deleteRowHandler);
    }
    componentDidMount() {
        // this.props.actions.fetchRoles(this.props.currentProjectId);
        // if (this.props.enrollemntTargets && this.props.enrollemntTargets.length > 0) {
        if (this.props.enrollemntTargets != undefined) {
            this.setState({
                enrollemntTargets: this.props.enrollemntTargets
            });
        }
    }
    componentWillReceiveProps(props) {
        // if (props.enrollemntTargets != undefined) {
        //     if (props.enrollemntTargets && props.enrollemntTargets.length > 0) {
        let enrollemntTargets = props.enrollemntTargets;
        this.setState({
            enrollemntTargets,
        })
        //     }
        // }
    }

    _editRowHandler = (data) => {
        const d = new Date(data.month);
        d.setDate(d.getDate());
        this.setState({
            startDate: d
        });
        this.setState({ openModal: true, isModal: "" });
        this.editedRowData = data;
    }
    _deleteRowHandler = () => {
        this.setState({ deleteModal: !this.state.deleteModal })
    }
    _isFirstday = (date) => {
        const day = date.getDate()
        return day === 1
    }
    _enrollmentDateHandler = (data) => {
        //if(this.isValidDate(data)){
        this.month = data // for showing in UI
        this.formatedMonth = data //for sending in backend
        this.setState({
            startDate: new Date(this.month)
        });
        this.formatedMonth.setMinutes(30);
        this.formatedMonth.setHours(5);
        this.formatedMonth = this.formatedMonth.toISOString()
        this.updatedData["month"] = this.formatedMonth;
        // }
        // else{
        //     window.Materialize.toast("Please enter valid Date", 2000);
        //     this.setState({startDate:null})
        // }  
    }
    _inputHandlerChange = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        this.updatedData[e.target.name] = value;
    }
    _cancelEnrollmentTarget = () => {
        this.setState({ openModal: false });
        this.setState({ deleteModal: false });
        this.updatedData = {};
        this.editedRowData = {};
    }
    _showEnrollment = () => {
        this.setState({ startDate: null })
        this.editedRowData.target = "";
        this.setState({ openModal: true, isModal: "Add" });
    }
    _addEnrollmentTarget = (e) => {
        e.preventDefault();
        //this.previousId = this.previousId + 1;
        this.previousId = uuid.v4();
        if (this.updatedData && !(objectUtil.isEmpty(this.updatedData))) {
            if (this.enrollmentValidation(this.updatedData)) {
                this.updatedData["month"] = this.formatedMonth;
                this.updatedData["id"] = this.previousId;
                this.updatedData["orgId"] = this.props.selectedLocation.id;
                this.updatedData["statusFlag"] = "new";
                this.setState({ enrollemntTargets: [...this.state.enrollemntTargets, this.updatedData] })
                this.props.actions.SaveEnrollment(this.props.selectedLocation.tenantId, this.updatedData);
                this._cancelEnrollmentTarget();
            }
        }
        else {
            window.Materialize.toast("Please enter the fields", 2000);
        }
    }
    _updateEnrollmentTarget = () => {
        // if (("" + this.editedRowData.id).includes("-"))
        //     this.updatedData["statusFlag"] = "new";
        // else
        //     this.updatedData["statusFlag"] = "modified";
        if (this.editedRowData.hasOwnProperty("statusFlag") && this.editedRowData["statusFlag"] == "new") {
            this.updatedData["statusFlag"] = "new";
        }
        else
            this.updatedData["statusFlag"] = "modified";
        this.updatedData["orgId"] = this.props.selectedLocation.id;
        const combinedData = Object.assign(this.editedRowData, this.updatedData);
        this.props.actions.SaveEnrollment(this.props.selectedLocation.tenantId, combinedData);
        this.gridChildren.refreshCells(true);
        this._cancelEnrollmentTarget();
        this.setState({ startDate: null })
        this.editedRowData.target = "";
    }
    _deleteEnrollmentTarget = () => {
        let selectedData = this.gridChildren.getSelectedRows();
        this.gridChildren.removeSelectedRows(selectedData);
        const rowsToDisplay = this.gridChildren.gridApi.clientSideRowModel.rowsToDisplay.map(row => row.data);
        this.setState({ enrollemntTargets: rowsToDisplay, deleteModal: false });
        selectedData.map(data => {
            selectedData = data
        });
        selectedData.statusFlag = "delete";
        this.props.actions.SaveEnrollment(this.props.selectedLocation.tenantId, selectedData);
    }
    // isValidDate(date) {
    //    // const datePattern = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    //    const datePattern = /(^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$)/;
    //    if (datePattern.test(date)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    enrollmentValidation = (data) => {
        if (objectUtil.isEmpty(data.month) || objectUtil.isEmpty(data.target)) {
            window.Materialize.toast("Please enter both the fields", 2000);
            return false;
        }
        if (data.target < 0) {
            window.Materialize.toast("Minimum target should be 0", 2000);
            return false;
        }
        return true;
    }
    render() {
        return (
            <Fragment>
                {this.state.enrollemntTargets ?
                    <div>
                        {(this.props.applicationMode == "VIEW" && this.state.enrollemntTargets.length == 0) ?
                            <p className="pl-2">{localConstant.commonConstants.NO_DATA}</p> :
                            <div>
                                <Modal open={this.state.deleteModal}
                                    actions={
                                        <div>
                                            <Button onClick={this._deleteEnrollmentTarget} className="btn_secondary otherButtonAddDetUpt" >{"YES"}</Button>
                                            <Button onClick={this._cancelEnrollmentTarget} className="btn_secondary otherButtonAddDetUpt ml-2" >{"NO"}</Button>
                                        </div>
                                    }
                                    header={localConstant.Enrollment_Target.DELETE_ENROLLMENT_TARGET} >
                                </Modal>
                                <Modal open={this.state.openModal}
                                    actions={
                                        <div>
                                            <Button onClick={this.state.isModal == "Add" ? this._addEnrollmentTarget : this._updateEnrollmentTarget} className="btn_secondary otherButtonAddDetUpt mr-2" >{localConstant.commonConstants.OK}</Button>
                                            <Button onClick={this._cancelEnrollmentTarget} className="btn_secondary otherButtonAddDetUpt" >{localConstant.commonConstants.CANCEL}</Button>
                                        </div>
                                    }
                                    header={localConstant.Enrollment_Target.ENROLLMENT_TARGET} >
                                    <div className='row' >
                                        <div >
                                            <label className="col s3 pt-3 mr-1 pl-2" >Month<label className="danger-txt">*</label></label>
                                            <DatePicker
                                                name="month"
                                                autoComplete="off"
                                                placeholderText="Click to select a date"
                                                dateFormat="yyyy-MM-dd"
                                                filterDate={this._isFirstday}
                                                showYearDropdown
                                                id="uniquenumber"
                                                showMonthDropdown
                                                selected={this.state.startDate}
                                                onChange={this._enrollmentDateHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col s3 pt-5 pl-2">Target<label className="danger-txt">*</label></label>
                                        <div className="pl-0">
                                            <Input type='number' min="0" name="target"
                                                onChange={this._inputHandlerChange}
                                                defaultValue={this.editedRowData.target}
                                                key={this.editedRowData.target}
                                            />
                                        </div>
                                    </div>
                                </Modal>
                                {this.props.applicationMode !== 'VIEW' ?
                                    <div className="right pr-2 mr-10">
                                        <a onClick={this._showEnrollment} >{localConstant.Enrollment_Target.ADD_ENROLLMENT}</a>
                                    </div> : null}
                                <br /><br />
                                <ReactGrid
                                    gridColData={this.props.applicationMode == "VIEW" ? HeaderData.enrollmentTargetHeaderView : HeaderData.enrollmentTargetHeaderCreate}
                                    gridRowData={this.state.enrollemntTargets && this.state.enrollemntTargets}
                                    onRef={ref => { this.gridChildren = ref; }}
                                />
                                {/* </Card> */}
                            </div>}
                    </div>
                    : <p>Select the location</p>}

            </Fragment>
        )
    }
}
export default EnrollmentTab;