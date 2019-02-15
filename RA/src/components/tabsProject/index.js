import TabsProject from './tabsProject';
import {
    FetchMenus,
    FetchResource,
    FetchRoles,
    AddRoleDetails,
    DeleteRoleDetails,
    UpdateRoleDetails,
    AddResourceDetails,
    AddMenuDetails,
    FetchCopyResourceRoleAccess,
    FetchCopyMenuRoleAccess,
    FetchFunctions,
    FetchMenuRoleAccess
} from '../../actions/projectFormActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearOrg, getTenants } from '../../actions/tenantAction';
import {
    AddStudyConfigGroups,
    AddStudyConfig,
    AddFinalStudyConfig,
    DeleteStudyConfigGroups,
    UpdateStudyConfig,
    DeleteStudyConfig,
    GetEnrollmentTarget,
    AddEnrollmentTarget,
    DeleteEnrollmentTarget,
    UpdateEnrollmentTarget,
    FetchEnrollmentTarget,
    FetchRaConfig
} from '../../actions/createProjectAction';
import objectUtil from '../../utils/objectUtil';

const mapStateToProps = (state) => {
    return {
        menuList: state.projectFormReducer.menuList,
        ApplicationMode: state.ApplicationMode,
        resourceList: state.projectFormReducer.resourceList,
        studyConfigList: objectUtil.isEmpty(state.createProj.studyConfigList) ? [] : state.createProj.studyConfigList,
        finalStudyConfigData: objectUtil.isEmpty(state.createProj.finalStudyConfigData) ? [] : state.createProj.finalStudyConfigData,
        enrollmentTargetData: state.createProj.enrollmentTargetData,
        organizations: state.projectFormReducer.organizations,
        selectedCurrentTTO: state.TtoReducers.currentTtoSelection,
        currentTtoFlag: state.TtoReducers.currentTtoFlag,
        selectedCurrentLTO: state.LtoReducers.currentLtoSelection,
        currentLtoFlag: state.LtoReducers.currentLtoFlag,
        roleDetails: state.projectFormReducer.roleDetails,
        updateRoleDetails: state.projectFormReducer.updateRoleDetails,
        menuDetails: state.projectFormReducer.menuDetails,
        resourceDetails: state.projectFormReducer.resourceDetails,
        menuRoleAccessDetails: state.projectFormReducer.menuRoleAccessDetails,
        resourceRoleAccessDetails: state.projectFormReducer.resourceRoleAccessDetails,
        rolList: state.TtoReducers.rolList,
        selectedOrg: state.projectInfo[0],
        functionsList: objectUtil.isEmpty(state.projectFormReducer.functionsList) ? [] : state.projectFormReducer.functionsList,
        fetchCopyMenuRoleAccess: state.projectFormReducer.fetchCopyMenuRoleAccess,
        fetchCopyResourceRoleAccess: state.projectFormReducer.fetchCopyResourceRoleAccess,
        tenantData: state.projectInfo,
        copyTenantData: state.copyProjectInfo,
        locations: state.projectFormReducer.locations
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                FetchRoles,
                FetchMenus,
                FetchResource,
                FetchMenuRoleAccess,
                FetchCopyMenuRoleAccess,
                FetchCopyResourceRoleAccess,
                AddStudyConfigGroups,
                AddStudyConfig,
                AddFinalStudyConfig,
                DeleteStudyConfigGroups,
                UpdateStudyConfig,
                DeleteStudyConfig,
                GetEnrollmentTarget,
                FetchEnrollmentTarget,
                FetchRaConfig,
                AddEnrollmentTarget,
                DeleteEnrollmentTarget,
                UpdateEnrollmentTarget,
                AddRoleDetails,
                DeleteRoleDetails,
                UpdateRoleDetails,
                AddResourceDetails,
                AddMenuDetails,
                getTenants,
                FetchRoles,
                clearOrg,
                FetchFunctions
            }, dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsProject);
