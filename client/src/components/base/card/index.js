import { connect } from 'react-redux';
import CustomCard from './customCard';
import {bindActionCreators} from 'redux';
// import {routeTo} from '../../../actions/routeActions'

const mapStateToProps = (state) => {
    return{
        projectList: state.projectList.Projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                // routeTo
            }, dispatch
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomCard);