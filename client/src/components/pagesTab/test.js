import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';
import InputText from './inputText';
import inputJson from './text.json';
import Collapsible from 'react-collapsible';


class dynamicControls extends React.Component {
  constructor(props) {

    super(props);
	
	
	this.state = {
            submitted: false,
			values: [],
			key: '',
			collection:'',
			title:'',
			subtitle:'',
			layout: [],
			inputJson: inputJson,
			selected:'',
			name: "",
            shareholders: [{ name: "" }]
			
    };
   
    this.handleSubmit = this.handleSubmit.bind(this);    
	this.handleChange = this.handleChange.bind(this);
	this.handleShareholderNameChange = this.handleShareholderNameChange.bind(this);
	//this.removeClick = this.removeClick.bind(this);
  }

	componentDidMount() {
		//alert(this.props.pageId)
		
		this.setState({
			type: this.state.type
			
		});
			
	}
	
	componentWillReceiveProps(nextProps) {
      this.setState({
			type: nextProps.type
			
		});
   
  }
  
  // Function to get data from child component
	getInput(inputJSON){
      //  console.log(inputJSON);
	  //Send the data to store via action 
	 // this.props.actions.SavePages(this.state.tenantId,pageJSON)
      // console.log('Send this in a POST request:', inputJSON);
    }
	
	renderForm = (idx) => {
		
		return <div >
					 <Input
					 s={6}
					 label={`Shareholder #${idx + 1} name`}
					 id='name'
					 name='name'
					 type='text'
					 onChange={this.handleShareholderNameChange(idx)}			 
					/>
					</div>
	}
	
	handleShareholderNameChange = idx => evt => {
      const { name, value } = evt.target;
     
	 this.setState({ [name[idx]]: value }, () => console.log(name, value));
	 alert(idx);
  };
	
	handleShareholderNameChange1 = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };
	
	handleChange(e) {
	    const { name, value } = e.target;
		
        this.setState({ [name]: value }, () => console.log(name, value));
		
		
   }
   
   handleSubmit(e) {
   
    e.preventDefault();
	
   const optionsPayload = {
			hint : this.state.hint,
			autocomplete: this.state.autocomplete,
   };
   const formPayload = {
			type : this.state.type,
			name: this.state.name,
			label: this.state.label,
			options: optionsPayload,
   };
     
	// console.log('Send this in a POST request:', formPayload);
	//console.log(this.props.pageJson);
	console.log(this.state);
	
	//if (this.state) {
		
		//this.props.updatePage(formPayload,this.props.pageId);
		
	//}
		
		
	
	
  }
	
  renderForm1 = (i) => {
	  
	 // onClick={this.removeClick.bind(this, i)}
        let model = this.state.inputJson.layout;
        let input = '';        
        let formUI = model.map((m) => {
			console.log(m.name);
            let name = m.name;
            let type = m.type ;
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
					 onChange={this.handleChange}
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
					 onChange={this.handleChange}
					 />
					</div>;
				}
		   
           }
		   
		  
		   
		   if (type == "panel") {
			   
			 
			   
			   var arr3 = Object.values(m.options.fields);
			   
			   input = arr3.map((o) => {
                   //console.log(o.name);
				   var arr4 = Object.values(o.options)
					
					 if(o.type == 'text' || o.type == 'checkbox' ){
					 return <div>
				     <Input
					 s={6}
					 label={o.label}
					 id={o.name}
					 name={o.name}
					 type={o.type}
					 onChange={this.handleChange}
					 /></div>
		             }   
						
		 
		
						
						
				  
				   
               });
               
			   input = <div className ="form-group-checkbox">{input}</div>;
			   
			   
			 
                
           }
          return (
               <div>
		           <Collapsible trigger={label}>
                       {input}
					</Collapsible>
                </div>
            );

		   

		});	
	return <Collapsible trigger='Text'> {formUI} </Collapsible>;
    }	
	
   createUI(){
     return this.state.values.map((el, i) => 
	 
          <div key={i}>
		  
		     <Row className="right submit-container">
			<Col className="input-field p-0" s={12}>
		    <a className="btn-floating btn-small grey" onClick={this.removeClick.bind(this, i)}><i className="material-icons">delete_outline</i></a>
		    </Col></Row>
		   
		    <Row>
			 {this.renderForm(i)}
		
			</Row>
		   
		   
			
    	    
         </div>            
     )
   }

   
   
  
  
  
  addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
  }
  
  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }

  
  
 
  
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  
	

  render() {
 
  
  return (
   <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
   <form onSubmit={this.handleSubmit} >
    <Row>
	 <Col className="input-field p-0" s={12} m={6} l={4} xl={6} > 
	
		<Input s={12} name='type' id='type' type='select' className="pl-0" label='Controls' onChange={this.handleChange} required>
		  <option value=''>Select Control</option>
		   <option value='text'>Text</option>
		   {/*<option value='email'>Email</option>
		   <option value='radio'>Radio</option>
		   <option value='checkbox'>Checkbox</option>
		   <option value='textarea'>TextArea</option>
		   <option value='numeric'>Numeric</option>
		   <option value='date_picker'>DatePicker</option>
		   <option value='time_picker'>TimePicker</option>*/}
		  
		</Input>
	 </Col>
	 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={4} >
       <button className="btn " type="submit" name="action" onClick={this.addClick.bind(this)}>Add Attr
          
       </button>
     
	  </Col>
	  <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} > 
	  {this.createUI()}     
		
		
	 </Col>
     </Row>
  
     <Row>
	 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
         
      <input type="submit" className="btn" value="Submit" />
	  </Col>
    </Row>

	
	 	
    
    </form>
		
		</div>
		);
	 
	 
	

	
	

  }
}

export default dynamicControls;