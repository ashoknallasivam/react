import TabsProject from './tabsProject';
import { FetchMenus, FetchResource, FetchRoles, AddRoleDetails,DeleteRoleDetails,UpdateRoleDetails,AddResourceDetails,AddMenuDetails, FetchMenuRoleAccess } from '../../actions/projectFormActions';
import {  GetStudyConfig,
    AddStudyConfigGroups,
    AddStudyConfig,
    AddFinalStudyConfig,
    DeleteStudyConfig,
    UpdateStudyConfig,
    GetEnrollmentTarget,
    AddEnrollmentTarget,
    DeleteEnrollmentTarget,
    UpdateEnrollmentTarget,
    FetchEnrollmentTarget,
} from '../../actions/createProjectAction';
import { clearOrg } from '../../actions/tenantAction';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';


const mapStateToProps=(state)=>{
    console.log(state);
    return{
        menuList:state.projectFormReducer.menuList,
        ApplicationMode: state.ApplicationMode,        
        resourceList:state.projectFormReducer.resourceList,
        studyConfigList: state.createProj.studyConfigList,
        enrollmentTargetData: state.createProj.enrollmentTargetData,
        organizations:state.projectFormReducer.organizations,
        selectedCurrentTTO: state.TtoReducers.currentTtoSelection,
        selectedCurrentLTO: state.LtoReducers.currentLtoSelection,
        roleDetails:state.projectFormReducer.roleDetails,
        updateRoleDetails:state.projectFormReducer.updateRoleDetails,
        menuDetails:state.projectFormReducer.menuDetails,
        resourceDetails:state.projectFormReducer.resourceDetails,
        menuRoleAccessDetails:state.projectFormReducer.menuRoleAccessDetails,
        resourceRoleAccessDetails: state.projectFormReducer.resourceRoleAccessDetails,
	    studyConfigData: state.createProj.studyConfigData,
        rolList: state.TtoReducers.rolList,
        selectedOrg: state.projectInfo[0]
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                FetchRoles,
                FetchMenus,
                FetchResource,
                FetchMenuRoleAccess,
                GetStudyConfig,
                AddStudyConfigGroups,
                AddStudyConfig,
                AddFinalStudyConfig,
                DeleteStudyConfig,
                UpdateStudyConfig,
                GetEnrollmentTarget,
                FetchEnrollmentTarget,
                AddEnrollmentTarget,
		        DeleteEnrollmentTarget,
                UpdateEnrollmentTarget,
                AddRoleDetails,
                DeleteRoleDetails,
                UpdateRoleDetails,
                AddResourceDetails,
                AddMenuDetails,
                clearOrg,
            },dispatch
        )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TabsProject);
