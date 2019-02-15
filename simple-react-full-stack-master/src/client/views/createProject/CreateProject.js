import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs,Button } from 'react-materialize';
import ProjectForm from '../../components/projectForm';
import TabsProject from '../../components/tabsProject';

class CreateProject extends Component {

  onPublish = () => {
    this.props.actions.SavePublishAction();
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
            {this.props.ApplicationMode !== 'CREATE'?null:
              <Button className="mb-5  mr-2 CreateProjectSave btn_primary" waves='light'>Save </Button>
            }
              {this.props.ApplicationMode == 'EDIT'?
                <Button className="mb-5 CreateProjectPublish btn_primary" onClick={this.props.actions.Update} waves='light'>Update</Button>
                :this.props.ApplicationMode == 'CREATE'?
                <Button className="mb-5 CreateProjectPublish btn_primary" onClick={this.props.actions.Publish} waves='light'>Publish</Button>
                :null
              }
            </Col>
          </Row>
   
        )
     }
} 
export default CreateProject;
