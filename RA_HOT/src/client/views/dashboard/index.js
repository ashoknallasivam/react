import { connect } from 'react-redux';
import dashboard from './dashboard';
import { getTenants } from '../../actions/tenantAction';
import { bindActionCreators } from 'redux';
import { FetchMenus, FetchResource, FetchRoles} from '../../actions/projectFormActions';
import { FetchEnrollmentTarget, FetchRaConfig } from '../../actions/createProjectAction';
import { clearOrg } from '../../actions/tenantAction';

const mapStateToProps=(state)=>{
    return{
        tenantData: state.projectInfo,
        newProject: state.newProject,
        ProjectInformation: state.ProjectInformation,
        ApplicationMode: state.ApplicationMode
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                getTenants,
                FetchRoles,
                FetchResource,
                FetchMenus,
                FetchEnrollmentTarget,
                FetchRaConfig,
                clearOrg
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
