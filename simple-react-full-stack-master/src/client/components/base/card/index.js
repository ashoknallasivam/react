import { connect } from 'react-redux';
import CustomCard from './customCard';
import {bindActionCreators} from 'redux';
import { selectedOrg } from '../../../actions/tenantAction';
import { ChangeMode } from '../../../actions/projectFormActions';

const mapStateToProps = (state) => {
    console.log(state);
    return{
        applicationState: state.ApplicationMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                selectedOrg,
                ChangeMode
            }, dispatch
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomCard);