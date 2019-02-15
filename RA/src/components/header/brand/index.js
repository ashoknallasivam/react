import { connect } from 'react-redux';
import Home from './brand';
import { clearOrg } from '../../../actions/tenantAction';

function mapDispatchToProps(dispatch){
    return{
        clearOrgStore : function () {
            clearOrg(dispatch);
        }
    }
}

export default connect(null,mapDispatchToProps)(Home);