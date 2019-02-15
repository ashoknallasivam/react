import { connect } from 'react-redux';
import dashboard from './dashboard';
import { getTenants } from '../../actions/tenantAction';
import { bindActionCreators } from 'redux';
import { FetchMenus, FetchResource, FetchRoles} from '../../actions/projectFormActions';
import { FetchEnrollmentTarget } from '../../actions/createProjectAction';
import { clearOrg } from '../../actions/tenantAction';


// function mapStateToProps(state){
//     return{
//         tenantData: state.projectInfo,
//     }
// }

const mapStateToProps=(state)=>{
    console.log(state);
    return{
        tenantData: state.projectInfo,
        newProject: state.newProject
    }
}

// function mapDispatchToProps(dispatch){
//     return{
//         getTenantsFunction: function(){
//             getTenants(dispatch);
//         }
//     }
// }

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                getTenants,
                FetchRoles,
                FetchResource,
                FetchMenus,
                FetchEnrollmentTarget,
                clearOrg
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
