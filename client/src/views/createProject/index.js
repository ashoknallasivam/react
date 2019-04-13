import CreateProject from './CreateProject'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchSingleTenant, SaveTenant, SaveOrganization, SaveLocations, publishProject, saveProject,fetchUserInfo,removeProject} from '../../actions';


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
                SaveOrganization, 
                SaveLocations,
                publishProject,
                saveProject,
                removeProject
            }, dispatch
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);