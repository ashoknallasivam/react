import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FunctionsTab from '../functionsTab';
import StudyConfigTab from '../studyConfigTab';
import EnrollmentTab from '../enrollmentTab';
import RolesTab from '../rolesTab';
import PagesTab from '../pagesTab';

let roles;
class TabsProject extends Component {
    constructor(props) {
        super(props)
    }
    
    render(){
        return(
            <Row className='m-0'>
                <Tabs>
                        <TabList className="tabs customTabs z-depth-1 tabs-fixed-width">
                            <Tab className="tab" >Functions</Tab>
                            <Tab className="tab" >StudyConfig</Tab>
                            <Tab className="tab" >Enrollment Target</Tab>
                            <Tab className="tab" >Pages</Tab>
                            <Tab className="tab" >Roles</Tab>
                        </TabList>
                        <TabPanel>
                            <FunctionsTab/>
                        </TabPanel>

                        <TabPanel>
                            <StudyConfigTab StudyConfig={this.props.selectedLocation.raConfig} applicationMode={this.props.applicationMode} /> 
                        </TabPanel>

                        <TabPanel>
                             <EnrollmentTab applicationMode={this.props.applicationMode} selectedOrganisation ={this.props.selectedOrganisation} enrollemntTargets={this.props.selectedLocation.enrollemntTargets} /> 
                        </TabPanel>

                        <TabPanel>
                             <PagesTab bounds={this.props.selectedLocation.bounds} pages={this.props.selectedLocation.pages} />
                        </TabPanel>

                        <TabPanel>
                            <RolesTab  selectedOrganisation={this.props.selectedOrganisation} roles = {this.props.selectedLocation.roles} applicationMode={this.props.applicationMode} selectedLocation = {this.props.selectedLocation}  />
                        </TabPanel>
                </Tabs>
            </Row>
        )
    }
}
export default TabsProject;
