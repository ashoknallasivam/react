import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';

class FunctionsTab extends Component {
    componentDidMount(){
        //Fetch data needed by the component by raising an action
    }
    
    componentWillUnmount(){
        // 1.check whether changes are compeleted 
        // 2.alert the user that unsaved data will be lost if they have any uncompeleted changes
    }
    render(){
        return(
            <Row>
                <h1> FunctionsTab  </h1>
            </Row>
        )
    }
}
export default FunctionsTab;