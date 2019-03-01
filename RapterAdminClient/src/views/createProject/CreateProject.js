import React, { Component } from 'react';
import { Row, Col, Card, Tab, Tabs, Button } from 'react-materialize';
import ProjectForm from '../../components/projectForm';
import TabsProject from '../../components/tabsProject';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

class CreateProject extends Component {
  mandatoryFieldValidations = () => {
    let isBoolean = true;
    if (this.props.studyConfigList) {
      this.props.studyConfigList.map(item => {
        if (objectUtil.isEmpty(item.description) || objectUtil.isEmpty(item.blockSize)) {
          window.Materialize.toast(localConstant.warningMessages.RA_CONFIG_VALIDATION, 2000);
          isBoolean = false;
        }
        let sum = 0;
        item.groups && item.groups.map(res => {
          if (res.ratio)
          sum = sum + parseFloat(res.ratio);
        });
        if (sum > 0 && sum != 1) {
          window.Materialize.toast(localConstant.warningMessages.PUBLISH_CUMULATIVE_RATIO, 2000);
          isBoolean = false;
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
