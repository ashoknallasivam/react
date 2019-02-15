import Header from "./header";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ChangeMode } from '../../actions/projectFormActions';
import { clearOrg } from '../../actions/tenantAction';

const mapStateToProps=(state)=>{
    return{
        authentication: state.auth.authenticated
    }
}

const mapDispatchToProps =(dispatch) =>{
    return{
        actions:bindActionCreators({
                 ChangeMode,
                 clearOrg
            },dispatch
        ) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);