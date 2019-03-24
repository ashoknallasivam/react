import React, { Component } from 'react';
import Label from './label';

// Create component for datalist input
class Datalist extends Component {
 render() {
  // Get all options from option prop
  const dataOptions = this.props.options.split(', ');

  // Generate list of options
  const dataOptionsList = dataOptions.map((dataOption, index) => {
   return <option key={index} value={dataOption} />
  });

  return (
   <fieldset>
    <Label
     hasLabel={this.props.hasLabel}
     htmlFor={this.props.htmlFor}
     label={this.props.label}
    />
 
    <input list={this.props.htmlFor} />
 
    <datalist
     defaultValue=''
     id={this.props.htmlFor}
     name={this.props.name || null}
     required={this.props.required || null}
    >
     <option value='' disabled>Select one option</option>

     {dataOptionsList}
    </datalist>
   </fieldset>
  );
 }
}

export default Datalist;
