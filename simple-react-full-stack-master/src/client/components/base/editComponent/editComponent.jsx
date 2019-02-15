import React, { Component } from 'react';
class EditComponent extends Component {
    selectedRow = () => {
        this.props.editAction(this.props.data);
    }
    render() {
        return (
            <a onClick={this.selectedRow} href="javascript:void(0)">Edit</a>
        );
    }
}
export default EditComponent;