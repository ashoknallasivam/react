import React, { Component } from 'react';
import Label from './label';

// Create component for checkbox input
class Checkbox extends Component {
 render() {
  return (
   <p>
    <label
     >
     <input
      id={this.props.htmlFor}
      name={this.props.name || null}
      required={this.props.required || null}
      type='checkbox'
     />
    <span> {this.props.label} </span>
    </label>
   </p>
  );
 }
}

export default Checkbox;
