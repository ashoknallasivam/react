import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';
import InputText from './inputText';

class PagePreview extends React.Component {
  constructor(props) {

    super(props);
	
	
	this.state = {
            submitted: false,
			values: [],
			key: '',
			collection:'',
			title:'',
			subtitle:'',
			layout: []
			
			
    };
   
    this.handleSubmit = this.handleSubmit.bind(this);    
	this.handleChange = this.handleChange.bind(this);
	//this.removeClick = this.removeClick.bind(this);
  }

	componentDidMount() {
		//alert(this.props.pageId)
		
		
			
	}
	
	componentWillReceiveProps(nextProps) {
    
   
  }
  
  // Function to get data from child component
	getInput(inputJSON){
       console.log(inputJSON);
	  //Send the data to store via action 
	 // this.props.actions.SavePages(this.state.tenantId,pageJSON)
      console.log('Send this in a POST request:', inputJSON);
    }

 createUI(){
     return this.state.values.map((el, i) => 
          <div key={i}>
		    <a className="btn-floating btn-small grey" onClick={this.removeClick.bind(this, i)}><i className="material-icons">delete_outline</i></a>
		   <InputText selected={this.state.type} sendInput={this.getInput}/>
			
    	    
         </div>            
     )
  }

   handleChange(e) {
	    const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(name, value));
   }
   
  
  
  
  addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
  }
  
  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }

  handleSubmit(e) {
   
    e.preventDefault();
	const formPayload = {
			type : this.state.type,
			name: this.state.name,
			label: this.state.label
			
			
	};
     
	//console.log('Send this in a POST request:', formPayload);
	//console.log(this.props.pageJson);
	//console.log(this.state);
	
	//if (this.state) {
		
		//this.props.updatePage(formPayload,this.props.pageId);
		
	//}
		
		
	
	
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
	 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
       <button className="btn " type="submit" name="action" onClick={this.addClick.bind(this)}>Attributes
          <i className="material-icons right">add</i>
       </button>
     
	  </Col>
	  <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} > 
	  {this.createUI()}     
		
		
	 </Col>
     </Row>
  
    

	
	 	
    
    </form>
		
		</div>
		);
	 
	 
	

	
	

  }
}

export default PagePreview;