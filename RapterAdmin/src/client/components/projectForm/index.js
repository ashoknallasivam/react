import ProjectForm from './projectForm';
import { getOrganization } from '../../actions/organzationAction';
import { FetchEnrollmentTarget, FetchRaConfig } from '../../actions/createProjectAction'
import {bindActionCreators} from 'redux';
import { UpdateTenant, 
        UpdateOrganization, 
        UpdateLocation, 
        SelectedDropdownOrg, 
        FetchRoles, 
        SelectedDropdownLoc, 
        ChangeMode, 
        DeleteOrgDetails, 
        DeleteLocDetails, 
        FetchMenuRoleAccess,
        FetchResourceRoleAccess,
        UpdateTlOrg, 
        UpdateLlOrg,
        AddRoleDetails,
        changeOrgDeletedStatus
    } from '../../actions/projectFormActions';
import { clearOrg, selectedOrg } from '../../actions/tenantAction';
import { connect } from 'react-redux';

const mapStateToProps=(state)=>{
    return{
        organizations:state.projectFormReducer.organizations,
        locations:state.projectFormReducer.locations,
        selectedLocations: state.TtoReducers.locList,
        selectedCurrentTTO: state.TtoReducers.currentTtoSelection,
        selectedCurrentLTO: state.LtoReducers.currentLtoSelection,
        //selectOrgLocMapCreate: state.selectOrgLocMapCreate.locList,
        ApplicationMode: state.ApplicationMode,
        selectedOrg: state.projectInfo[0],
        projectInfo: state.projectInfo[0]
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                UpdateTenant,
                UpdateOrganization,
                UpdateLocation,
                FetchRoles,
                FetchMenuRoleAccess,
                FetchResourceRoleAccess,
                SelectedDropdownOrg,
                SelectedDropdownLoc,
                ChangeMode,
                clearOrg,
		        DeleteOrgDetails,
                DeleteLocDetails,
                FetchEnrollmentTarget,
                FetchRaConfig,
		        UpdateTlOrg,
                UpdateLlOrg,
                selectedOrg,
                AddRoleDetails,
                changeOrgDeletedStatus
            },dispatch
        )
    };
    };

export default connect(mapStateToProps,mapDispatchToProps)(ProjectForm);
