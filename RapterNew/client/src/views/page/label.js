import React, { Component } from 'react';

class Label extends Component {


   render(props) {

		if (this.props.hasLabel === 'true') {
		   return <label for={this.props.htmlFor}>{this.props.label}</label>
		  }
		 
	}

}

export default Label;
