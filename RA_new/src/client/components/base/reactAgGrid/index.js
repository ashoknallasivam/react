import ReactGrid from './reactGrid';
import {connect} from 'react-redux';

const mapStateToProps = (state) =>{
    return{
        ApplicationMode: state.ApplicationMode
    }
}

export default connect(mapStateToProps)(ReactGrid);