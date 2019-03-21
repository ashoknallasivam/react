import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';
import env from './controls.json';
const scaryAnimals = env;


const fields = [
      { name: 'name', label: 'Name', type: 'text', value: 'Ashok', placeholder: 'Enter Name1' },
      { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter age' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
      { name: 'employed', label: 'Employed', type: 'checkbox' },
      {
        name: 'favouriteColors',
		label: 'Color',
        type: 'select',
        options: [
          { label: 'Red', value: 'red' },
          { label: 'Yellow', value: 'yellow' },
          { label: 'Green', value: 'green' },
        ],
      },
    ]

const schema = {
  key: 'participant',
  collection: 'cases',
  title: 'Applicant',
  subtitle: 'Gather some basic information',
  layout: [
    {
      type: 'text',
      name: 'firstName',
      label: 'First name',
      options: {
        items: [
          {}
        ],
        validation: {
          required: true,
          minLength: 2,
          maxLength: 30
        }
      }
    }
    
  ]
};

class NewForm extends React.Component {
  constructor() {
    super();
	
	this.state = {
            key: '',
            collection: '',
			title: '',
            submitted: false,
			subtitle: '',
			name:'',
            shareholders: [{ name: "" }],
			schema: {schema}
        };
	
	this.handleChange = this.handleChange.bind(this);
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };
  
  
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
		
		
    }
	

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
	  
	const { schema, submitted, key, collection, title, subtitle } = this.state; 
	  
    return (
	  /* {schema.map(field => (
	   <div key={field.key}>
	    <h1>{field.key}</h1>
		  
        </div>
	   
	   ))} */
          <form className="col-md-4" onSubmit={this.handleSubmit} >
 		
		 <Row>
			  <Input s={12} label="Key" id="key" name="key" type="text" value={key} validate defaultValue='case-access-denied' onChange={this.handleChange} required/>
		 </Row>
		 <Row>
			  <Input s={12} label="Collection" id="collection" name="collection" type="text" value={collection} validate defaultValue='cases' onChange={this.handleChange} required/>
		 </Row>
		 <Row>
			  <Input s={12} label="Title" id="title" name="title" type="text" value={title} validate defaultValue='Access denied' onChange={this.handleChange} required/>
		 </Row>
		 <Row>
			  <Input s={12} label="Sub Title" id="subtitle" name="subtitle" type="text" value={subtitle} validate defaultValue='You do not have access to the details of this case.' onChange={this.handleChange} required />
		 </Row>
		
        {this.state.shareholders.map((shareholder, idx) => (
		
          <div className="shareholder">
		 
		  
			  <Row>
			  <Input s={12} type='select' label="Element Type" defaultValue='2'>
			    <option value='text'>Text Box</option>
				<option value='textarea'>Text Area</option>
				<option value='email'>Email</option>
				<option value='number'>Numberic</option>
				<option value='checkbox'>Checkbox</option>
				<option value='radio'>Radio Button</option>
				<option value='select'>Select Box</option>
			  </Input>
			</Row>
		  <h6>Attributes</h6>
		    <Row>
			  <Input s={6} label="Field Name" validate></Input>
			  <Input s={6} label="Field Label" validate type='tel'></Input>
			</Row>
            <Row>
			  <Input s={6} label="Default Value" validate defaultValue='Alvin' onChange={this.handleShareholderNameChange(idx)}/>
			</Row>
			
			<h6>Validation</h6>
			
			
			<Row>
				<Input name='group1' type='checkbox' value='Required' label='Required' className='filled-in' defaultChecked='checked' />
			</Row>

			
			
			
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="btn waves-light"
            >
               <Icon>delete</Icon>Delete Element
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="btn waves-light"
        >
          <Icon>add</Icon>Add Element
        </button>
		
		
		
		 <button className="btn waves-effect waves-light" type="submit" name="action">
                          Submit <i className="mdi-content-send right"></i>
                      </button>
        
       </form>
          
    );
  }
}

export default NewForm;