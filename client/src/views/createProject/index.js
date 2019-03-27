import CreateProject from './CreateProject'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchSingleTenant} from '../../actions';


const mapStateToProps=(state)=>{
    return{
        projectList : state.projectList.Projects,
        test : state.projectList.Projects[1]
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                fetchSingleTenant,
            }, dispatch
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);