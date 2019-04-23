import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { bindActionCreators } from 'redux';
import {fetchAllTenants, fetchSavedTenants,fetchUserInfo} from '../../actions';

const mapStateToProps=(state)=>{
    return{
        projectList: state.projectList.Projects,
        error : state.projectList.error,
        auth : state.auth.authenticated
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                fetchAllTenants,
                fetchSavedTenants,
                
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
