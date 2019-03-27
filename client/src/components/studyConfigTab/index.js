import StudyConfigTab  from './studyConfigTab';
import {fetchStudyConfig} from  '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps=(dispatch)=>{
    return{
        actions:bindActionCreators(
            {
                fetchStudyConfig
            },
            dispatch
        )
    };
};

export default connect(null, mapDispatchToProps)(StudyConfigTab);
// export default StudyConfigTab;
