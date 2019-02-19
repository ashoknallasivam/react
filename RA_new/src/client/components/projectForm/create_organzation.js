import React, { Component } from "react";
import { Row,Input,Modal,Button } from 'react-materialize';

export default class AddOrganization extends Component {
    
    render(){
        return (
            <div >
                <Input s={12} m={12} l={12} xl={12} type='select' label="Organization" >
                </Input>
                {/* <button onClick={this.handleNewOrganization}>Add</button> */}
                <Modal
                    header='Add Orgnization'
                    trigger={<Button>ADD ORGAIZATION</Button>}>
                    <Input s={12} m={12} l={12} xl={12} label="Organization"/>
                    <Button >Submit</Button>
                </Modal>
            </div>
        )
    }
}