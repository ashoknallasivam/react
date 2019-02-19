import { connect } from 'react-redux'
import { checkFeasibility } from './feasibilityActions'
import Feasibility from './feasibility';

function mapStateToProps(state) {
    return {
        feasibilityResponse: state.feasibilityReducer,
    }
}

export default connect(mapStateToProps, { checkFeasibility })(Feasibility)