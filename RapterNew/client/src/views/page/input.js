import React, { Component } from 'react';
import Label from './label';

class Input extends Component {


   render(props) {

		return (
		  <div class="input-field col s6">
			
			 <input
			  className="validate"
			  id={this.props.htmlFor}
			  max={this.props.max || null}
			  min={this.props.min || null}
			  name={this.props.name || null}
			  placeholder={this.props.placeholder || null}
			  required={this.props.required || null}
			  step={this.props.step || null}
			  type={this.props.type || 'text'}
			 />
			 <Label
			 hasLabel={this.props.hasLabel}
			 htmlFor={this.props.htmlFor}
			 label={this.props.label}
			/>
		   </div>
		  );
		 
	}

}

export default Input;
