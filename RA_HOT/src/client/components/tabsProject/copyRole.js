import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

class CopyRole extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return (
            <Treebeard
                data={this.props.data}
                onToggle={this.props.onToggle}
            />
        );
    }
}

export default CopyRole;