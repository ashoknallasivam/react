import { connect } from 'react-redux';
import CustomCard from './customCard';
import {bindActionCreators} from 'redux';
import {exportProject} from '../../../actions'

const mapStateToProps = (state) => {
    return{
        projectList: state.projectList.Projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                exportProject
            }, dispatch
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomCard);