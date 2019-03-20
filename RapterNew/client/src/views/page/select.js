import React, { Component } from 'react';
import Label from './label';

// Create component for select input
class Select extends Component {
 render() {
  // Get all options from option prop
  const selectOptions = this.props.options.split(', ');

  // Generate list of options
  const selectOptionsList = selectOptions.map((selectOption, index) => {
   return <option key={index} value={index}>{selectOption}</option>
  });

  return (
   <div class="input-field col s12">
   
 
    <select
	 className="browser-default"
     defaultValue=''
     id={this.props.htmlFor}
     name={this.props.name || null}
     required={this.props.required || null}
    >
     <option value='' disabled selected>Select one option</option>

     {selectOptionsList}
    </select>
	
	 <Label
     hasLabel={this.props.hasLabel}
     htmlFor={this.props.htmlFor}
     label={this.props.label}
    />
   </div>
  );
 }
}

export default Select;
