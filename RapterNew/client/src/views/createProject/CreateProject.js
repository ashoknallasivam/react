import React, { Component } from 'react';
import { Row, Col, Card, Tab, Tabs, Button } from 'react-materialize';
import Modal from '../../components/base/modal';
import ProjectForm from '../../components/projectForm';
import TabsProject from '../../components/tabsProject';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
    this.errorMessage = {};
    this.modalButton = [
      {
        name: localConstant.commonConstants.OK,
        action: this.showModal,
        btnClass: 'btn_secondary otherButtonAddDetUpt mr-1',
        showbtn: true
      }
    ];
  }
  showModal = () => {
    this.setState({ openModal: false });
  }
  mandatoryFieldValidations = () => {
    let isBoolean = true;
    if (this.props.studyConfigList) {
      this.props.studyConfigList.map(item => {
        this.errorMessage = {};
        if (objectUtil.isEmpty(item.description) && objectUtil.isEmpty(item.blockSize) && objectUtil.isEmpty(item.groups)) {
          this.props.actions.DeleteStudyConfig(item._id);
          isBoolean = true;
        }
        else {
          if (objectUtil.isEmpty(item.description) || objectUtil.isEmpty(item.blockSize)) {
            this.setState({ openModal: true });
            this.errorMessage.mandatory = localConstant.warningMessages.RA_CONFIG_VALIDATION;
            isBoolean = false;
          }
          let sum = 0;
          item.groups && item.groups.map(res => {
            if (res.ratio)
              sum = sum + parseFloat(res.ratio);
          });
          if (sum > 0 && sum != 1) {
            this.setState({ openModal: true });
            this.errorMessage.ratio = localConstant.warningMessages.PUBLISH_CUMULATIVE_RATIO;
            isBoolean = false;
          }
        }
      })
      return isBoolean;
    }
    else return isBoolean;
  }
  finalPublish = () => {
    if (this.mandatoryFieldValidations()) {
      this.props.actions.Publish();
    }
  }
  finalUpdate = () => {
    if (this.mandatoryFieldValidations()) {
      this.props.actions.Update();
    }
  }
  render() {
    return (
      <Row className="create-project-page">
        <Col className="z-depth-4 col-centered mt-2" s={12} m={12} l={12} xl={12}>
          <ProjectForm />
        </Col>

        <Col className="z-depth-4 col-centered mb-3 p-0" s={12} m={12} l={12} xl={12}>
          <TabsProject />
          <Modal
            // title={localConstant.study_Config.ADD_STUDY_CONFIG}
            buttons={this.modalButton}
            className="message-model"
            isShowModal={this.state.openModal} >
            <div>
              {this.errorMessage.mandatory}
              <br />
              {this.errorMessage.ratio}
            </div>
          </Modal>
        </Col>
        <Col className="col-centered mb-3 p-0 form-footer" s={12} m={12} l={12} xl={12}>
          {this.props.ApplicationMode !== 'CREATE' ? null :
            <Button className="mb-5  mr-2 CreateProjectSave btn_primary" waves='light'>Save </Button>
          }
          {this.props.ApplicationMode == 'EDIT' ?
            <Button className="mb-5 CreateProjectPublish btn_primary" onClick={this.finalUpdate} waves='light'>Update</Button>
            : this.props.ApplicationMode == 'CREATE' || this.props.ApplicationMode == 'CLONE' ?
              <Button className="mb-5 CreateProjectPublish btn_primary" onClick={this.finalPublish} waves='light'>Publish</Button>
              : null
          }
        </Col>
      </Row>

    )
  }
}
export default CreateProject;
