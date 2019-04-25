import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';



class DateControl extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			data: this.props.data
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data
		});
	}



	handleChange(e) {
		const { onChange } = this.props;
		//const { name, value } = e.target;
		//this.setState({ [name]: value }, () => console.log(name, value));
		onChange(e);
	}




	render() {


		return (
			<Collapsible accordion={false}>
				<CollapsibleItem header="Date" icon="keyboard_arrow_down">
					<div>
						<h5><b>Date Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="date"
							value="date"
							disabled
							required
						/>
					</div>
					<div>
						<Input
							s={12}
							label="Name *"
							id="name"
							name="name"
							type="text"
							value={this.state.name}
							required
							onChange={this.handleChange}
							className ="mb-1"
						/><div className="helper-text" >A unique element name</div>
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
							className ="mb-1"
						/><div className="helper-text" >The text the user sees</div>

					</div>

					<div>
						<Collapsible accordion={false}>
							<CollapsibleItem header='options' icon="keyboard_arrow_down">
								<div>
									<Input
										s={12}
										label="Hint"
										id="hint"
										name="hint"
										type="text"
										value={this.state.hint}
										onChange={this.handleChange}
										className ="mb-1"
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
										className ="mb-1"
									/><div className="helper-text mb-3">Provide a default value (ISO date format)</div>
								</div>
								<fieldset>
									<legend><b>Show If?</b></legend>
									<div>
										<Input
											s={12}
											label="Property name"
											id="property"
											name="property"
											type="text"
											value={this.state.property}
											onChange={this.handleChange}
											className ="mb-1"
										/><div className="helper-text" >Property name of field dependency.</div>
									</div>
									<div>
										<Input
											s={12}
											label="Property value"
											id="value"
											name="value"
											type="text"
											value={this.state.value}
											onChange={this.handleChange}
											className ="mb-1"
										/><div className="helper-text" >Value of dependent field.</div>
									</div>
								</fieldset>
								<Collapsible accordion={false}>
									<CollapsibleItem header='Start date' icon="keyboard_arrow_down">
										<div>
											<Input
												s={12}
												label="Year"
												id="year"
												name="year"
												type="number"
												value={this.state.hint}
												onChange={this.handleChange}
												className ="mb-1"
											/><div className="helper-text" >The start year</div>
										</div>
										<div>
											<div >
												<label className="ml-3">Month</label>
												<select defaultValue="" name='type' id='type' className ="mb-1">
													<option value="" disabled >Choose month</option>
													<option value="January">January</option>
													<option value="February">February</option>
													<option value="March">March</option>
													<option value="April">April</option>
													<option value="May">May</option>
													<option value="June">June</option>
													<option value="July">July</option>
													<option value="August">August</option>
													<option value="September">September</option>
													<option value="October">October</option>
													<option value="November">November</option>
													<option value="December">December</option>
												</select>
											</div><div className="helper-text" >The start month</div>
										</div>
										<div>
											<Input
												s={12}
												label="Day"
												id="day"
												name="day"
												type="number"
												value={this.state.hint}
												onChange={this.handleChange}
												className ="mb-1"
											/><div className="helper-text" >The start day</div>
										</div>
									</CollapsibleItem>
								</Collapsible>

								<fieldset><legend><b>Validation</b></legend>
								<div>
									<div>
										<input s={12} type="checkbox" id="required" name="required" className='filled-in' onChange={this.handleChange} />
										<label htmlFor="required">Required?</label>
									</div>
								</div>
								</fieldset>
								<Collapsible accordion={false}>
									<CollapsibleItem header='Minimum date' icon="keyboard_arrow_down">
										<div>
											<Input
												s={12}
												label="Year"
												id="year"
												name="year"
												type="number"
												value={this.state.hint}
												onChange={this.handleChange}
												className ="mb-1"
											/><div className="helper-text" >The minimum date year</div>
										</div>
										<div>
											<div >
												<label className="ml-3">Month</label>
												<select defaultValue="" name='type' id='type' className ="mb-1">
													<option value="" disabled >Choose month</option>
													<option value="January">January</option>
													<option value="February">February</option>
													<option value="March">March</option>
													<option value="April">April</option>
													<option value="May">May</option>
													<option value="June">June</option>
													<option value="July">July</option>
													<option value="August">August</option>
													<option value="September">September</option>
													<option value="October">October</option>
													<option value="November">November</option>
													<option value="December">December</option>
												</select>
											</div><div className="helper-text" >The minimum date month</div>
										</div>
										<div>
											<Input
												s={12}
												label="Day"
												id="day"
												name="day"
												type="number"
												value={this.state.hint}
												onChange={this.handleChange}
												className ="mb-1"
											/><div className="helper-text" >The minimum date day</div>
										</div>
									</CollapsibleItem>
								</Collapsible>
								<Collapsible accordion={false}>
									<CollapsibleItem header='Maximum date' icon="keyboard_arrow_down">
										<div>
											<Input
												s={12}
												label="Year"
												id="year"
												name="year"
												type="number"
												value={this.state.hint}
												onChange={this.handleChange}
												className ="mb-1"
											/><div className="helper-text" >The maximum date year</div>
										</div>
										<div>
											<div >
												<label className="ml-3">Month</label>
												<select defaultValue="" name='type' id='type' className ="mb-1">
													<option value="" disabled >Choose month</option>
													<option value="January">January</option>
													<option value="February">February</option>
													<option value="March">March</option>
													<option value="April">April</option>
													<option value="May">May</option>
													<option value="June">June</option>
													<option value="July">July</option>
													<option value="August">August</option>
													<option value="September">September</option>
													<option value="October">October</option>
													<option value="November">November</option>
													<option value="December">December</option>
												</select>
											</div><div className="helper-text" >The maximum date month</div>
										</div>
										<div>
											<Input
												s={12}
												label="Day"
												id="day"
												name="day"
												type="number"
												value={this.state.hint}
												onChange={this.handleChange}
												className ="mb-1"
											/><div className="helper-text" >The maximum date day</div>
										</div>
									</CollapsibleItem>
								</Collapsible>
								<fieldset>
									<legend><b>Required If?</b></legend>
									<div>
										<Input
											s={12}
											label="Property name"
											id="property"
											name="property"
											type="text"
											value={this.state.property}
											onChange={this.handleChange}
											className ="mb-1"
										/><div className="helper-text" >Property name of field dependency.</div>
									</div>
									<div>
										<Input
											s={12}
											label="Property value"
											id="value"
											name="value"
											type="text"
											value={this.state.value}
											onChange={this.handleChange}
											className ="mb-1"
										/><div className="helper-text" >Value of dependent field.</div>
									</div>
								</fieldset>
							</CollapsibleItem>
						</Collapsible>
					</div>
				</CollapsibleItem>
			</Collapsible>
		);

	}


}
export default DateControl;