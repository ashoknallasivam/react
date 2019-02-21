import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tab,Tabs } from 'react-materialize';
import brand from '../../../../public/assets/images/logo/login-logo.png';
import * as actions from '../../actions';

class Signin extends Component {
	
	constructor(props) {
        super(props);
        
        // reset login status
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const { username, password } = this.state;
       
        if (username && password) {
			
			this.props.login(username, password);
        }
    }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  
  componentWillReceiveProps(newProps){
	 // redirect to feature branch if auth status is true
	 if(newProps.authStatus == true){
	  
	  this.props.history.push('/twofactor')
	 }
  }

  render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
    return (
   <div>
  
<Row id="login-page">
		 
         <Col className="z-depth-4 offset-xl4 " s={12} m={6} l={4} xl={4}>
           <form className="col-md-4" onSubmit={this.handleSubmit} >
             <Row>
               <Col className="input-field center"s={12}>
                 <img src={ brand } alt="" className="square responsive-img valign profile-image-login" width="80"/>
                 <p className="center login-form-text">Admin Login</p>
               </Col>
             </Row>
             <Row className="margin">
               <Col className="input-field p-0" s={12}>
                 <i className="material-icons prefix pt-5">person_outline</i>
                 <input id="username" name="username" type="text" value={username} onChange={this.handleChange} />
                 <label htmlFor="username" className="center-align">Username</label>
               </Col>
             </Row>
             <Row className="margin">
               <Col className="input-field p-0" s={12}>
                 <i className="material-icons prefix pt-5">lock_outline</i>
                 <input id="password" name="password" type="password" value={password} onChange={this.handleChange} />
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
             <Row className="mb-2 login-footer">
               <Col className="input-field col s6 m6 l6" s={6} m={6} l={6}>
                 <p className="margin medium-small"><a href="page-register.html">Register Now!</a></p>
               </Col>
               <Col className="input-field" s={6} m={6} l={6}>
                 <p className="margin right-align medium-small"><a href="page-forgot-password.html">Forgot password ?</a></p>
               </Col>
             </Row>
           </form>
         </Col>
       </Row>	   
	
      
     </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authStatus: state.auth.authenticated, tokenStatus: state.auth.tokenverified };
}

export default connect(mapStateToProps, actions)(Signin);
