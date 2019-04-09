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
            <Row className='col m-0 pl-2'>
                <h6> FunctionsTab  </h6>
            </Row>
        )
    }
}
export default FunctionsTab;