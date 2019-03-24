import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions/page.actions';
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';



class App extends React.Component {

handleEdit = (e) => {
  e.preventDefault();
  const newTitle = this.getTitle.value;
  const newMessage = this.getMessage.value;
  const data = {
    newTitle,
    newMessage
  }
  this.props.dispatch({ type: 'UPDATE', id: this.props.post.id, data: data })
}




  constructor(props) {
    super(props)
    
  }
  
 
render() {
    return (
      <div>
  <form onSubmit={this.handleEdit}>
    <input required type="text" ref={(input) => this.getTitle = input}
    defaultValue={this.props.testmessage} placeholder="Enter Post Title" /><br /><br />
    <textarea required rows="5" ref={(input) => this.getMessage = input}
    defaultValue={this.props.testmessage} cols="28" placeholder="Enter Post" /><br /><br />
    <button>Update</button>
  </form>
</div>
    )
  }
}

function mapStateToProps(state) {
  return { bounds: state.page.bounds, 
  pageContent: state.page.pages, 
  pageJson: state.page.pagejson , 
  pageId: state.page.pageid, 
  pageStatus: state.page.pagestatus, 
  testmessage: state.page.testmessage, 
  editor: state.page.editor };
}

export default connect(mapStateToProps, actions)(App);