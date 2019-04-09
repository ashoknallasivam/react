import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab, Tabs, Input, Icon, Button } from 'react-materialize';
import InputText from './inputText';
import inputJson from './text.json';
import Collapsible from 'react-collapsible';


class dynamicControls extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			submitted: false,
			key: '',
			collection: '',
			title: '',
			subtitle: '',
			type: '',
			name: '',
			label: '',
			inputJson: inputJson,
			selected: '',
			values: [],
			options: [],
			pages: this.props.pages,
			selectedPage: this.props.selectedPage
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleControlChange = this.handleControlChange.bind(this);
		//this.removeClick = this.removeClick.bind(this);
	}


	componentDidMount() {

		this.setState({
			type: this.props.type,
			name: this.props.name,
			label: this.props.label,
			pages: this.props.pages,
			selectedPage: this.props.selectedPage,


		});

	}

	componentWillReceiveProps(nextProps) {



	}


	componentDidUpdate(prevProps) {
		if (prevProps.selectedPage !== this.props.selectedPage) {

			this.setState({ selectedPage: this.props.selectedPage, values: [] });
		}



	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });

		value != '' ? this.setState({ type: value }) : ''

	}


	createControlSchema(idx) {

		const newControls = this.state.values.map((key, sidx) => {
			if (idx !== sidx) return key;

			return { ...key, name: this.state.name, type: this.state.type, label: this.state.label, options: { hint: this.state.hint, autocomplete: this.state.autocomplete } };

		});

		this.setState({ values: newControls });

	}

	handleControlChange = idx => evt => {
		const { name, value } = evt.target;

		this.setState({ [name]: value }, () => {
			this.createControlSchema(idx); // Call back function as SetState is Asynch
		})
	};


	addClick() {
		this.setState(prevState => ({ values: [...prevState.values, ''] }))
	}

	removeClick(i) {
		let values = [...this.state.values];
		values.splice(i, 1);
		this.setState({ values });
	}


	handleSubmit(e) {


		e.preventDefault();


		const combinedArrays = [...this.props.pages[this.props.selectedPage].layout, ...this.state.values];
		//console.log(combinedArrays);

		this.props.sendData(combinedArrays);

	}


	renderForm = (idx) => {


		let model = this.state.inputJson.layout;
		let input = '';
		let formUI = model.map((m) => {

			let name = m.name;
			let type = m.type;
			let label = m.label;
			if (type == "heading") {
				return (
					<div >
						<h5>{label}</h5>
					</div>
				);
			}

			if (type == "text") {

				if (name == 'type') {
					return <div >
						<Input
							s={12}
							label={label}
							id={name}
							name={name}
							type={type}
							value={this.state.type}
							minLength={m.options.validation.minLength}
							maxLength={m.options.validation.maxLength}
							onChange={this.handleControlChange(idx)}
							disabled
						/>
					</div>
						;
				} else {
					return <div >
						<Input
							s={12}
							label={label}
							id={name}
							name={name}
							type={type}
							minLength={m.options.validation.minLength}
							maxLength={m.options.validation.maxLength}
							onChange={this.handleControlChange(idx)}
						/>
					</div>;
				}

			}



			if (type == "panel") {

				var arr3 = Object.values(m.options.fields);

				input = arr3.map((o) => {
					
					if (o.type == 'text' || o.type == 'checkbox') {
						return <div>
							<Input
								s={12}
								label={o.label}
								id={o.name}
								name={o.name}
								type={o.type}
								onChange={this.handleControlChange(idx)}
							/></div>
					}


					if (o.type == 'array' || o.type == 'fieldset') {
						var autoitems ='';

                        const autoitems = Object.entries(o.options).map(([key,value])=>{

                          if(key == 'hint')	
                          {
							  return (
							      <div>{value.toString()}</div>
							  );
						  } 

						  if(key == 'fields')	
                          {
							  
                             var autofileds = '';
                             var required = '';
                             autofileds = value.map((q) => {
                                
                                const validation =q.options.validation.required.toString() ;

                                required =  validation == true ? required : '';
                                console.log(required);
                                return  <div>
                                		<div>
										<Input
											s={12}
											label={q.label}
											id={q.name}
											name={q.name}
											type={q.type}
											onChange={this.handleControlChange(idx)}
											required
										/></div><h6>{q.options.hint}</h6>
                                         </div>

                             });

                              return <div>{autofileds}</div>
								
						  } 



						})	


                        

						return <div className="card-panel hoverable">
						     	<h5>{o.label}</h5>
						       		<div>{autoitems}</div>
								</div>
					}
					if (o.type == 'fieldset') {

                        


					}

				});

				input = <div>{input}</div>;




			}
			return (
				<div >
					<Collapsible trigger={label}>
						{input}
					</Collapsible>
				</div>
			);



		});
		return <div className="collection"><Collapsible trigger='Text' > {formUI} </Collapsible></div>;
	}

	createUI() {
		return this.state.values.map((el, i) =>

			<div key={i}>

				<Row className="right submit-container">
					<Col className="input-field p-0" s={12}>
						<Button className='orgIcon col s12 m2 l2 xl2 mt-8' name="deleteOrg" onClick={this.removeClick.bind(this, i)}>
							<i className="material-icons" title='Delete'>delete</i>
						</Button>

					</Col></Row>

				<Row>
					{this.renderForm(i)}

				</Row>

			</div>

		)
	}



	render() {






		return (


			<div style={{ maxWidth: "1400px", maxHeight: "100%" }} key={this.state.selectedPage}>
				<form onSubmit={this.handleSubmit} >
					<Row>

						<Col className="input-field p-0" s={12} m={6} l={4} xl={6} >

							<Input s={12} name='type' id='type' type='select' className="pl-0" label='Controls' onChange={this.handleChange} required>
								<option value=''>Select Control</option>
								<option value='text'>Text</option>
								<option value='email'>Email</option>
								{/*<option value='radio'>Radio</option>
								   <option value='checkbox'>Checkbox</option>
								   <option value='textarea'>TextArea</option>
								   <option value='numeric'>Numeric</option>
								   <option value='date_picker'>DatePicker</option>
								   <option value='time_picker'>TimePicker</option>*/}

							</Input>
						</Col>


						<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={4} >
							<input type="button" className="btn" value="Add Control" onClick={this.addClick.bind(this)} />
						</Col>


						<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
							{this.createUI()}
						</Col>
					</Row>

					<Row>
						<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
							<input type="submit" className="btn" value="Update" />
						</Col>
					</Row>




				</form>

			</div>
		);







	}
}

export default dynamicControls;