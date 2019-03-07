import React, { Component, Fragment } from "react";
import { Row,Input,Button,Modal } from 'react-materialize';



export default class AddLocation extends Component {
    
    render(){
        return (
            <Fragment>
                <Input s={12} m={6} l={6} xl={6} type='select' label="Location" >
                </Input>
                <Modal
                    header='Add Location'
                    trigger={<Button>ADD LOCATION</Button>}>
                    <Input label="Location" s={12} m={6} l={6} xl={6} />
                    <Input s={12} m={6} l={6} xl={6} type='select' label="Perent Organization" >
                    </Input>
                    <Button>Submit</Button>
                </Modal>
            </Fragment>
        )
    }
}