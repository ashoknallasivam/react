import React, { Component } from 'react';
import objectUtil from '../../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

class EditComponent extends Component {
    selectedRow = () => {
        this.props.editAction(this.props.data);
    }
    render() {
        return (
            this.props.ApplicationMode !== 'VIEW' ?
                <a onClick={this.selectedRow} href="javascript:void(0)"><i className="material-icons" title='Edit'>edit</i></a>
                :null
            
            
        );
    }
}
export default EditComponent;