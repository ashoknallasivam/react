import DeleteGridRow from './deleteGridRow'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        ApplicationMode: state.ApplicationMode
    }
}

export default connect(mapStateToProps)(EditComponent);