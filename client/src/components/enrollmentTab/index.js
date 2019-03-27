import EnrollmentTab  from './enrollmentTab'
import { fetchEnrollment} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                fetchEnrollment
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(EnrollmentTab);
