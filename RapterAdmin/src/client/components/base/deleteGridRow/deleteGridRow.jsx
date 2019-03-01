import React, { Component } from 'react';
import objectUtil from '../../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

class DeleteGridRow extends Component {
    selectedRow = () => {
        this.props.editAction(this.props.data);
    }
    render() {
        return (
            this.props.ApplicationMode !== 'VIEW' ?
                <a className="orgIcon" onClick={this.selectedRow} href="javascript:void(0)"><i className="material-icons" title='Delete'>delete</i></a>
                : null
        );
    }
}
export default DeleteGridRow;