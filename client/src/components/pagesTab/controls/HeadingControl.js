import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';



class HeadingControl extends Component {

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
				<CollapsibleItem header="Heading" icon="keyboard_arrow_down">
					<div>
						<h5><b>Heading Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="password"
							disabled
							required
						/>
					</div>
					<div>
						<Input
							s={12}
							label="Label *"
							id="label"
							name="label"
							type="text"
							value={this.state.label}
							required
							onChange={this.handleChange}
						/><div className="helper-text" >What the user sees</div>
					</div>
					<div>
						<Collapsible accordion={false}>
							<CollapsibleItem header='Options' icon="keyboard_arrow_down">
								<div style={{height:"80px"}}>
								<label htmlFor="required">Level *</label>
									<Input
										s={12}
										//label="Level"
										id="Level"
										name="level"
										type="range"
										min= {1}
										max= "6"
										step= "1"
										value={this.state.hint}
									onChange={this.handleChange}
									/>
								</div>
							</CollapsibleItem>
						</Collapsible>
					</div>
				</CollapsibleItem>
			</Collapsible>
		);

	}


}
export default HeadingControl;