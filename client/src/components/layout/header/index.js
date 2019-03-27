import Header from "./header";
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps=(state)=>{
    return{
        authentication: state.auth.authenticated
    }
}

const mapDispatchToProps =(dispatch) =>{
    return{
        actions:bindActionCreators({
                
            },dispatch
        ) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);