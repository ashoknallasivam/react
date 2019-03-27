import React, { Component, Fragment } from 'react';
import { Row, Card, Modal, Button, Input } from 'react-materialize';
import ReactGrid from '../base/reactAgGrid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HeaderData } from '../enrollmentTab/headerData'
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();
class EnrollmentTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enrollemntTargets: [],
            openModal: false,
            startDate: null,
        }
        this.editedRowData = {};
        this.updatedData = {};
        objectUtil.bindAction(HeaderData.enrollmentTargetHeaderCreate, "EditColumn", this._editRowHandler);
    }
    componentDidMount() {
        // this.props.actions.fetchRoles(this.props.currentProjectId);
        this.setState({
            enrollemntTargets: this.props.enrollemntTargets
        })
    }
    componentWillReceiveProps(props) {
        let enrollemntTargets = props.enrollemntTargets;
        this.setState({
            enrollemntTargets,
        })
    }
    _editRowHandler = (data) => {
        const d = new Date(data.month);
        d.setDate(d.getDate());
        this.setState({
            startDate: d
        });
        this.setState({ openModal: true });
        this.editedRowData = data;
    }
    _isFirstday = (date) => {
        const day = date.getDate()
        return day === 1
    }
    _enrollmentDateHandler = (data) => {
        this.month = data // for showing in UI
        this.formatedMonth = data //for sending in backend
        this.setState({
            startDate: new Date(this.month)
        });
        this.formatedMonth.setMinutes(30);
        this.formatedMonth.setHours(5);
        this.formatedMonth = this.formatedMonth.toISOString()
        this.updatedData["month"] = this.formatedMonth;
    }
    _inputHandlerChange = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        this.updatedData[e.target.name] = value;
    }
    _cancelEnrollmentTarget = () => {
        this.updatedData = {};
        this.editedRowData = {};
        this.setState({ openModal: !this.state.openModal });
    }
    _updateEnrollmentTarget = () => {
        if (("" + this.editedRowData.id).includes("c"))
            this.updatedData["statusFlag"] = "new";
        else
            this.updatedData["statusFlag"] = "modified";
        const combinedData = Object.assign(this.editedRowData, this.updatedData);
        this.gridChildren.refreshCells(true);
        this._cancelEnrollmentTarget();
    }
    render() {
        return (
            <Row>
                <Fragment>
                    {this.state.enrollemntTargets && this.state.enrollemntTargets.length > 0 &&
                        <div>
                            {/* <Card> */}
                            {/* <div className="right pr-2 mr-10">
                            </div> */}
                            <Modal open={this.state.openModal}
                                actions={
                                    <div>
                                        <Button onClick={this._cancelEnrollmentTarget} className="btn_secondary" >{localConstant.commonConstants.CANCEL}</Button>
                                        <Button onClick={this._updateEnrollmentTarget} className="btn_secondary ml-2" >{localConstant.commonConstants.OK}</Button>
                                    </div>
                                }
                                header={localConstant.Enrollment_Target.ENROLLMENT_TARGET} >
                                <div className='row' >
                                    <div >
                                    {console.log(this.editedRowData.month)}
                                        <label className="col s3 pt-3 mr-1 pl-2" >Month<label className="danger-txt">*</label></label>
                                        <DatePicker
                                            name="month"
                                            autoComplete="off"
                                            placeholderText="Click to select a date"
                                            dateFormat="yyyy/MM/dd"
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
                            <br /><br />
                            <ReactGrid
                                gridColData={this.props.applicationMode == "VIEW" ? HeaderData.enrollmentTargetHeaderView : HeaderData.enrollmentTargetHeaderCreate}
                                gridRowData={this.state.enrollemntTargets && this.state.enrollemntTargets}
                                onRef={ref => { this.gridChildren = ref; }}
                            />
                            {/* </Card> */}
                        </div>}
                </Fragment>
            </Row>
        )
    }
}
export default EnrollmentTab;