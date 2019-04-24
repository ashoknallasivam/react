import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';



class ButtonControl extends Component {

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
			<Collapsible accordion={false}>
				<CollapsibleItem header="Button" icon="keyboard_arrow_down">
				
				 <div>
					<Input
						s={12}
						label="Element type"
						id="type"
						name="type"
						type="text"
						value="checkbox"
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
						value={this.state.name}
						required
						onChange={this.handleChange}
					/><div className="helper-text" >A unique element name</div>
				</div>
				<div>	
					 <Input
						s={12}
						label="Label"
						id="label"
						name="label"
						type="text"
						value={this.state.label}
						required
						onChange={this.handleChange}
					/><div className="helper-text" >The text the user sees</div>
					
				</div>
				

			
				<Collapsible accordion={false}>
					<CollapsibleItem header="Options"  icon="keyboard_arrow_down">
					<Row>
					<Col>
					<div>
												<label>Disabled by default *</label>
												<Input
													className="with-gap"
													s={12}
													label="yes"
													id="yes"
													name="disabled"
													type="radio"
													value={this.state.disabled}
													onChange={this.handleChange}
												/>
												<Input
													s={12}
													className="with-gap"
													label="no"
													id="no"
													name="disabled"
													type="radio"
													value={this.state.disabled}
													onChange={this.handleChange}
												/>
											</div>
											</Col>
					</Row>
					</CollapsibleItem >		
					</Collapsible>
					
					</CollapsibleItem>
					
			</Collapsible>
			);
	 
  }	 
	

}
export default ButtonControl;