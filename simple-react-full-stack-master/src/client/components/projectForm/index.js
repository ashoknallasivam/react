import ProjectForm from './projectForm';
import { getOrganization } from '../../actions/organzationAction';
import { FetchEnrollmentTarget } from '../../actions/createProjectAction'
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
        FetchResourceRoleAccess
    } from '../../actions/projectFormActions';
import { clearOrg } from '../../actions/tenantAction';
import { connect } from 'react-redux';

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        organizations:state.projectFormReducer.organizations,
        locations:state.projectFormReducer.locations,
        selectedLocations: state.TtoReducers.locList,
        selectedCurrentTTO: state.TtoReducers.currentTtoSelection,
        //selectOrgLocMapCreate: state.selectOrgLocMapCreate.locList,
        ApplicationMode: state.ApplicationMode,
        selectedOrg: state.projectInfo[0]
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
                FetchEnrollmentTarget
            },dispatch
        )
    };
    };

export default connect(mapStateToProps,mapDispatchToProps)(ProjectForm);
