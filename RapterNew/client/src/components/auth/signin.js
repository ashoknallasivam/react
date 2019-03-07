import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tab,Tabs } from 'react-materialize';
import Spinner from 'react-spinner-material';
import brand from '../../../public/assets/images/logo/login-logo.png';
import * as actions from '../../actions';
import Select from 'react-select';
import env from '../../../env.json';

const scaryAnimals = env;


class Signin extends Component {
	
	constructor(props) {
        super(props);
        
        // reset login status
        this.state = {
            username: '',
            password: '',
			environment: null,
            submitted: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		//console.log(env);
		//console.log(scaryAnimals)
    }
	
  componentWillMount() {
    if (this.props.authStatus == true && this.props.tokenStatus == false) {
		this.props.history.push('/twofactor');
      } 
	if (this.props.authStatus == true && this.props.tokenStatus == true) {
		this.props.history.push('/dashboard');
      }  
  }	
	
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
		
		
    }
	
	
    handleSubmit(e) {
        
        
		e.preventDefault();
		
        this.setState({ submitted: true });
        const { username, password, environment} = this.state;
       
        if (username && password) {
			
			this.props.login(username, password, environment);
        }
    }

  renderAlert() {
	 
    if (this.props.errorMessage) {
		
				
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong> 
        </div>
      );
    }
  }
  
  
  
  
  componentWillReceiveProps(newProps){
	 
	 // redirect to feature branch if auth status is true
	 if(newProps.authStatus == true){
	  
	  this.props.history.push('/twofactor')
	 } else {
		 
		 this.setState({ submitted: true });
	 }
	 
  }

  render() {
	  const customStyles = { input: styles => {  return { ...styles, height: '1.7em'};  }}
	  
        const { loggingIn } = this.props;
        const { username, password, submitted, environment } = this.state;
		if(this.state.submitted == true && this.props.errorMessage == null)
		{
			return(
				<Row id="login-page" >
					 <Col className="z-depth-0 offset-xl5 " s={12} m={6} l={5} xl={4}>
					   <Row>
						<Spinner size={50} spinnerColor={"#fd5633"} spinnerWidth={4} visible={true} />
					   </Row>
					  </Col>
				</Row>
		    );
			
		} else { 
			return(<div>
      <Row id="login-page">
		 <Col className="z-depth-4 offset-xl4 " s={12} m={6} l={4} xl={4}>
           <form className="col-md-4" onSubmit={this.handleSubmit} >
             <Row>
               <Col className="input-field center"s={12}>
                 
                 <p className="center login-form-text">Admin Login</p>
               </Col>
             </Row>
			  <Row className="margin">
               <Col className="input-field p-0" s={12}>
			   
                <Select styles={customStyles} options={scaryAnimals} onChange={opt => this.setState({ environment: opt.value }) } required/>
               
               </Col>
             </Row>
             <Row className="margin">
               <Col className="input-field p-0" s={12}>
                 <i className="material-icons prefix pt-5">person_outline</i>
                 <input id="username" name="username" type="text" value={username} onChange={this.handleChange} required/>
                 <label htmlFor="username" className="center-align">Username</label>
               </Col>
             </Row>
             <Row className="margin">
               <Col className="input-field p-0" s={12}>
                 <i className="material-icons prefix pt-5">lock_outline</i>
                 <input id="password" name="password" type="password" value={password} onChange={this.handleChange} required/>
                 <label htmlFor="password">Password</label>
               </Col>
			   {this.renderAlert()}
             </Row>
             <Row className="remember-user">
                 <input type="checkbox" id="remember-me" />
                 <label htmlFor="remember-me">Remember me</label>
             </Row>
             <Row className="center submit-container">
                <button className="btn waves-effect waves-light btn_primary" type="submit" name="action">Submit
                  <i className="material-icons right">send</i>
                </button>
             </Row>
             
           </form>
         </Col>
       </Row>	   
	
      
     </div>);
			
		}	 
		 
   
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps, actions)(Signin);
