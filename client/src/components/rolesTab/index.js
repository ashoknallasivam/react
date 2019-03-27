import RolesTab  from './rolesTab'
import { fetchResourceList, fetchMenuList } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                fetchResourceList,
                fetchMenuList

            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(RolesTab);

