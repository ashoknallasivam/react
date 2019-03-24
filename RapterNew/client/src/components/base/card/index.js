import { connect } from 'react-redux';
import CustomCard from './customCard';
import {bindActionCreators} from 'redux';
import { selectedOrg, ExportThisProject } from '../../../actions/tenantAction';
import { ChangeMode } from '../../../actions/projectFormActions';

const mapStateToProps = (state) => {
    return{
        applicationState: state.ApplicationMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        actions:bindActionCreators(
            {
                selectedOrg,
                ChangeMode,
                ExportThisProject
            }, dispatch
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomCard);