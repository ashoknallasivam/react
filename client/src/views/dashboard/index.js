import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { bindActionCreators } from 'redux';
import {fetchAllTenants, fetchRoles,} from '../../actions';

const mapStateToProps=(state)=>{
    return{
        projectList: state.projectList.Projects
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                fetchAllTenants,
                
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
