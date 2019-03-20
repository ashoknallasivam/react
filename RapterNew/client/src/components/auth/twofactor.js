import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Otp from './otp';

class Twofactor extends Component {
	
   constructor(props) {
        super(props);

        this.state = {
            code: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }	
	
  componentDidMount() {
	
    if (!this.props.authStatus && !this.props.tokenStatus) {
		this.props.history.push('/signin');
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
        const { code } = this.state;
        if (code) {
			this.props.twoStepVerification(code);

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
	 if(newProps.authStatus == true && newProps.tokenStatus == true){
		this.props.history.push('/dashboard')

	 }
  }
  
  render() {
	

	const { code } = this.state;
   
    return (
	<Row id="login-page" >
         <Col className="z-depth-4 offset-xl4 " s={12} m={6} l={4} xl={3} >
           <form className="login-form" onSubmit={this.handleSubmit} >
             <Row>
               <Col className="input-field center"s={12}>
                 <p className="center login-form-text"><Otp {...this.props}/></p>

               </Col>
             </Row>
             
             <Row className="margin">
               <Col className="input-field p-0" s={12}>
                 <i className="material-icons prefix pt-5">lock_outline</i>
                 <input id="code" name="code" type="text"  onChange={this.handleChange}/>
                 <label htmlFor="password">OTP</label>
               </Col>
			    {this.renderAlert()}
             </Row>
            
             <Row >
               <Col className="input-field center">
			   <button className="btn waves-effect waves-light" type="submit" name="action">Validate</button>

               </Col>
             </Row>
             <Row className="mb-2">
               <Col className="input-field col s6 m6 l6" s={6} m={6} l={6}>
                 <p className="margin medium-small"></p>
               </Col>
              
             </Row>
           </form>
         </Col>
       </Row>
	)
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps, actions)(Twofactor);
