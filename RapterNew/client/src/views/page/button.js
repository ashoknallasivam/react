import React, { Component } from 'react';


class Button extends Component {


   render(props) {

		return (
		  <fieldset>
			<button
			 type={this.props.type || 'button'}
			 value={this.props.value || null}
			>
			 {this.props.text}
			</button>
		   </fieldset>
		  );
		 
	}

}

export default Button;
