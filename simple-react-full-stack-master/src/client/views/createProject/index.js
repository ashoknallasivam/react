import CreateProject from './createProject';
import {bindActionCreators} from 'redux';
import {Publish} from '../../actions/publishAction';
import {Update} from '../../actions/updateAction';
import { connect } from 'react-redux';

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        menuList:state.projectFormReducer.menuList,
        ApplicationMode: state.ApplicationMode, 
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                Publish,
                Update
            }, dispatch
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);