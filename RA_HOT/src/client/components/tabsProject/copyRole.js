import React ,{ Component } from 'react';
import ReactDOM from 'react-dom';
import {Treebeard ,decorators} from 'react-treebeard';

class CopyRole extends Component {
    constructor(props){
        super(props);
        this.state = {
            cursor: '',
            prevNode: ''
          };
    }
    
    render(){
        const mydecorator =  {
            Header: (props) => {
              const activeColor = this.state.cursor.id === props.node.id ? '#333333' : '#428BCA';
              return (
                <div style={props.style.base}>
                  <div id={props.node.id} style={{'color':activeColor}}>
                    {props.node.name}
                  </div>
                </div>
              );
            }
          }
        return (
            <Treebeard
                data={this.props.data}
                onToggle={this.props.onToggle}
                decorators={{...decorators, Header: mydecorator.Header}}
            />
        );
    }
}

export default CopyRole;
