import CreateProject from './CreateProject'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchSingleTenant, SaveTenant, SaveOrganization, SaveLocations, publishProject, saveProject,fetchUserInfo,removeProject,deleteSavedProject,fetchSingleSavedTenant,fetchAllTenants,fetchSavedTenants} from '../../actions';


const mapStateToProps=(state)=>{
    return{
        projectList : state.projectList.Projects,
        userId : state.projectList.userId,
        error : state.projectList.error
    }
};
const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                fetchSingleTenant,
                fetchUserInfo,
                SaveTenant, 
                SaveOrganization, 
                SaveLocations,
                publishProject,
                saveProject,
                removeProject,
                deleteSavedProject,
                fetchSingleSavedTenant,
                fetchAllTenants,
                fetchSavedTenants
            }, dispatch
        )
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);