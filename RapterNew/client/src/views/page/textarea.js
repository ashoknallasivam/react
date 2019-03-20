import React, { Component } from 'react';
import Label from './label';

// Create component for textarea
class Textarea extends Component {
 render() {
  return (
   
    <div class="input-field col s6">

    <textarea
	 className="materialize-textarea"
     cols={this.props.cols || null}
     id={this.props.htmlFor}
     name={this.props.name || null}
     required={this.props.required || null}
     rows={this.props.rows || null}
    >
    </textarea>
	
	<Label
     hasLabel={this.props.hasLabel}
     htmlFor={this.props.htmlFor}
     label={this.props.label}
    />
	</div>
	
	
	
	
	
   
  );
 }
}

export default Textarea;
