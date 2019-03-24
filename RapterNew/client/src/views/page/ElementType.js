import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions/page.actions';
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';

class NewForm extends React.Component {
  constructor(props) {

	 
    super(props);
	this.props.test();
	this.state = {
            submitted: false,
			values: []
    };

  
    this.handleSubmit = this.handleSubmit.bind(this);    
	//this.handleChange = this.handleChange.bind(this);
	//this.removeClick = this.removeClick.bind(this);
  }


  

 createUI(){
     return this.state.values.map((el, i) => 
          <div key={i}>
    	    <input type="text" defaultValue={el||''} onChange={this.handleChange.bind(this, i)} />
    	    <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
         </div>            
     )
  }

  handleChange(i, event) {
     let values = [...this.state.values];
     values[i] = event.target.value;
     this.setState({ values });
  }
  
  addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
  }
  
  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.values.join(', '));
    event.preventDefault();
  }


  render() {
  
	  
	const { submitted } = this.state; 
    var schema  = this.props.pageJson;
	    return (



	    
  <form onSubmit={this.handleSubmit} >
    <Row>
     <Input s={12} label="Key" id="key" name="key" type="text" defaultValue={schema.key} validate onChange={this.handleChange} required/>
     </Row>
     <Row>
        <Input s={12} label="Collection" id="collection" name="collection" type="text" defaultValue={schema.collection} validate onChange={this.handleChange} required/>
     </Row>
     <Row>
        <Input s={12} label="Title" id="title" name="title" type="text" defaultValue={schema.title} validate onChange={this.handleChange} required/>
     </Row>
     <Row>
        <Input s={12} label="Sub Title" id="subtitle" name="subtitle" type="text" defaultValue={schema.subtitle} validate onChange={this.handleChange} required />
     </Row>
    <input required type="text" ref={(input) => this.getTitle = input}
    defaultValue={this.props.testmessage} placeholder="Enter Post Title" />


    <Row>
    
    {schema.layout.map(value => {
        const { type, label, name } = value
        
        if (type == 'text') {
           return <div >
             <Input
             s={6}
             label={value.label}
             id={value.name}
             name={value.name}
             type={value.type}
             minLength={value.options.validation.minLength}
             maxLength={value.options.validation.maxLength}
             onChange={this.handleChange}
            />
            </div>;
        } else if (type == 'radio') {
           return <div >
               <h5>{value.label}</h5>
             {value.options.items.map(itemval => {
               return  <Input name={value.name} type={value.type} defaultValue={itemval.value} label={itemval.label} onChange={this.handleChange}/>
              
               })}
              </div>;
        } else if (type == 'checkbox') {
           return <div >
               <Input s={12} name={value.name} type={value.type} label={value.label} onChange={this.handleChange}/>
               </div>;
        } else if (type == 'email') {
           return <div >
             <Input
             s={6}
             label={value.label}
             id={value.name}
             name={value.name}
             type={value.type}
             onChange={this.handleChange}
            />
            </div>;
        } else if (type == 'select') {
           return <div >
               <Input s={6} name={value.name} type={value.type} label={value.label} defaultValue='' onChange={this.handleChange}>
             {value.options.items.map(itemval => {
               return   <option value={itemval.value}>{itemval.label}</option>
              
               })}
             </Input>
              </div>;
            
        } else if (type == 'date') {
           return <div >
               <Input s={6} type={value.type} label={value.label} format='dd/mm/yyyy' onChange={this.handleChange}>
             
             
             </Input>
              </div>;
            
        }else if (type == 'time') {
           return <div >
               <Input s={6} type={value.type} label={value.label} onChange={this.handleChange}>
             
             
             </Input>
              </div>;
            
        }
        
        
               
    })}
        
    </Row>


	<Row>
      {this.createUI()}        
      <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
      <input type="submit" value="Submit" />
    </Row> 
	 	
    
    </form>
		
		
		);
	 
	 
	

	
	

  }
}


function mapStateToProps(state) {
  return { bounds: state.page.bounds, 
  pageContent: state.page.pages, 
  pageJson: state.page.pagejson , 
  pageId: state.page.pageid, 
  pageStatus: state.page.pagestatus, 
  testmessage: state.page.testmessage, 
  editor: state.page.editor };
}

export default connect(mapStateToProps, actions)(NewForm);