import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';



class SelectControl extends Component {

  constructor(props) {
		super(props);

		this.state = {
			
		};

		
	  this.handleChange = this.handleChange.bind(this);
	  
    }

    componentDidMount() {
     
	  
    }
   
    componentWillReceiveProps(nextProps) {
	  
	 
	}
	
	
	
	handleChange(e) {
		const { onChange } = this.props;
		const { name, value } = e.target;
		//this.setState({ [name]: value }, () => console.log(name, value));
		onChange(e);
    }
	
		


  render() {	
	return (
		<Fragment>
			<div>
				<Input
					s={12}
					label="Element type"
					id="type"
					name="type"
					type="text"
					value="select"
					className= "labelText"
					disabled
					required
				/>
			</div>	
			<div>	
				<Input
					s={12}
					label="Name"
					id="name"
					name="name"
					type="text"
					className= "labelText"
					value={this.state.name}
					required
					onChange={this.handleChange}
				/><div className="helper-text" >A unique element name</div>
			</div>
			<div>	
				<Input
					s={12}
					label="label"
					id="label"
					name="Label"
					type="text"
					className= "labelText"
					value={this.state.label}
					required
					onChange={this.handleChange}
				/><div className="helper-text" >A unique element name</div>
			</div>
			<Collapsible accordion={false}>
			<CollapsibleItem header="Options" icon="keyboard_arrow_down">
				<div>
					<div>	
						<Input
							s={12}
							label="Hint"
							id="hint"
							name="hint"
							type="text"
							value={this.state.hint}
							onChange={this.handleChange}
							disabled
							className= "labelText"
						/><div className="helper-text" >Give user a hint</div>
					</div>	
					<div>	
						<Input
							s={12}
							label="Default value"
							id="defaultValue"
							name="defaultValue"
							type="text"
							value={this.state.defaultValue}
							onChange={this.handleChange}
							className= "labelText"
						/><div className="helper-text" >Provide a default value</div>
					</div>
					
				</div>
			</CollapsibleItem>
		</Collapsible>
		</Fragment>
		);
	 
  }	 
	

}
export default SelectControl;