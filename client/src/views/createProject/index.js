import CreateProject from './CreateProject'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchSingleTenant, SaveTenant, SaveOrganizations, SaveLocations, publishProject, saveProject,fetchUserInfo} from '../../actions';


const mapStateToProps=(state)=>{
    return{
        projectList : state.projectList.Projects,
        userId : state.projectList.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                fetchSingleTenant,
                fetchUserInfo,
                SaveTenant, 
                SaveOrganizations, 
                SaveLocations,
                publishProject,
                saveProject
            }, dispatch
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);