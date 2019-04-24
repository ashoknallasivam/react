import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';
import inputJson from './json/text.json';

class TextControl extends Component {

  constructor(props) {
		super(props);

		this.state = {
			inputJson: inputJson,
			selected:this.props.selected,
			data:[]
		};

		
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);  
    }

    componentDidMount() {
      this.setState({
			inputJson: inputJson,
			selected:this.props.selected,
			index:this.props.index,
			data:this.props.data
	  });
	  //console.log(inputJson);
    }
   
    componentWillReceiveProps(nextProps) {
	   this.setState({
			inputJson: inputJson,
			selected:nextProps.selected,
			index:nextProps.index,
			data:nextProps.data
	  });
	  //console.log(inputJson);
	}
	
	
	
	handleChange(e) {
		const { onChange } = this.props;
		const { name, value } = e.target;
		//this.setState({ [name]: value }, () => console.log(name, value));
		onChange(e);
    }
	
		
	handleSubmit(e) {
	   
		e.preventDefault();
		
		//console.log('Send this in a POST request:', formPayload);
		//this.props.sendInput(this.state);  
		//console.log(this.props.pageJson);
		console.log(this.state);
		
		if (this.state) {
			
			this.props.sendInput(this.state);
			
		}
		
	 }	



	renderForm = () => {
		

		
	}


  render() {
        const { data } = this.state;
  			
		var model = this.state.inputJson.layout;
		var input = '';
		var formUI = model.map((m) => {
            
			var name = m.name;
			var type = m.type;
			var label = m.label;
			var value = data[name];
			var options = data[options];
			
			if (type == "heading") {
				return (
					<div>
						<h5><b>{label}</b></h5>
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
							value={value}
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
							value={value}
							onChange={this.handleChange}
						/>
					</div>;
				}

			}



			if (type == "panel") {

				var arr3 = Object.values(m.options.fields);

				input = arr3.map((o) => {
					
					if (o.type == 'text') {
						return <div>
						
						  	<Input
								s={12}
								label={o.label}
								id={o.name}
								name={o.name}
								type={o.type}
								defaultValue=''
								onChange={this.handleChange}
							/><div className="helper-text" >{o.options.hint}</div></div>
					}
					
					if (o.type == 'checkbox') {
					   return <div>
					    	  <input s={12} type={o.type} id="test6" name={o.name} onChange={this.handleChange}/>
							  <label htmlFor="test6">{o.label}</label>
         				   </div>;
					} 


					if (o.type == 'array') {
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
                             autofileds = value.map((q,idx) => {
                                
                                const validation =q.options.validation.required.toString() ;

                                required =  validation == true ? required : '';
                                //console.log(idx);
 
									   
								if(q.type == 'checkbox'){
									
									return <div>
										  <input s={12} type={q.type} id="test7" name={q.name} onChange={this.handleChange}/>
										  <label htmlFor="test7">{q.label}</label>
									   <div className="helper-text" >{q.options.hint}</div>
                                         </div>;
									
								} else {
                                	return  <div>	
										<Input
											s={12}
											label={q.label}
											id={q.name}
											name={ `${q.name}_${idx}` }
											type={q.type}
											onChange={this.handleChange}
										/><div className="helper-text" >{q.options.hint}</div>
                                         </div>;
										
								}	

                             });

                              return <div>{autofileds}</div>
								
						  } 

						})	

						return <div >
						     	<h5>{o.label}</h5>
						       		{autoitems}
								</div>
					}
					
					if (o.type == 'fieldset' && o.name == 'validation') {
						var autoitems ='';

                        const autoitems = Object.entries(o.options).map(([key,value])=>{

                          

						  if(key == 'fields')	
                          {
							  
                             var autofileds = '';
                             var required = '';
                             autofileds = value.map((q) => {
                                
                               
 
									   
								if(q.type == 'checkbox'){
									
									return <div>
										  <input s={12} type={q.type} id="test7" name={q.name} onChange={this.handleChange} />
										  <label htmlFor="test7">{q.label}</label>
									   <div className="helper-text" >{q.options.hint}</div>
                                         </div>;
									
								} else if (q.type == 'fieldset') {
									
									var requiredifitems ='';

									const requiredifitems = Object.entries(q.options).map(([key,value])=>{
										
									  if(key == 'fields')	
									  {
										  
										  
										 var requiredfields = '';
										 
										 requiredfields = value.map((r) => {
											 
											return  <div>
												<Input
													s={12}
													label={r.label}
													id={r.name}
													name={r.name}
													type={r.type}
													onChange={this.handleChange}
												/><div className="helper-text" >{r.options.hint}</div>
												 </div>;


										 })	;
                                         return <div>{requiredfields}</div>
									  }
									});	
									
									
                                	return  <div><legend><b>{q.label}</b></legend>
												<div>{requiredifitems}</div>
                                           </div>;
										
								}	else {
                                	return  <div>
										<Input
											s={12}
											label={q.label}
											id={q.name}
											name={q.name}
											type={q.type}
											onChange={this.handleChange}
										/><div className="helper-text" >{q.options.hint}</div>
                                         </div>;
										
								}	

                             });

                              return <div>{autofileds}</div>
								
						  } 



						})	


						return <div>
						     	<h5>{o.label}</h5>
						       		{autoitems}
								</div>
					}
					
				});

				input = <div>{input}</div>;


			}
			return (
				<Collapsible accordion={false}>
					<CollapsibleItem header={label} icon="keyboard_arrow_down">
						{input} 
					</CollapsibleItem>
				</Collapsible>
			);



		});
		
		return (
			<Collapsible accordion={false}>
				<CollapsibleItem header='Text' icon="keyboard_arrow_down">
					{formUI}
				</CollapsibleItem>
			</Collapsible>
			);
	 
  }	 
	

}
export default TextControl;