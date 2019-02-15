import React, { Component } from 'react';
class EditComponent extends Component {
    selectedRow = () => {
        this.props.editAction(this.props.data);
    }
    render() {
        return (
            this.props.ApplicationMode !== 'VIEW' ?
                <a onClick={this.selectedRow} href="javascript:void(0)">Edit</a>
                :null
            
            
        );
    }
}
export default EditComponent;