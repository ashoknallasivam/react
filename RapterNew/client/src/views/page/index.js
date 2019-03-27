import { connect } from 'react-redux';
import Pages from './pages';
import * as actions from '../../actions/page.actions';
//import * as actions from '../../actions';

function mapStateToProps(state) {
  return { bounds: state.page.bounds, 
  pageContent: state.page.pages, 
  pageJson: state.page.pagejson , 
  pageId: state.page.pageid, 
  pageStatus: state.page.pagestatus, 
  editor: state.page.editor };
}

export default connect(mapStateToProps, actions)(Pages);



