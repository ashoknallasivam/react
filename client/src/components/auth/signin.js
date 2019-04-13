import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import Spinner from 'react-spinner-material';
import brand from '../../../public/assets/images/logo/login-logo.png';
import * as actions from '../../actions';
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
    const { username, password, environment } = this.state;

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

  componentWillReceiveProps(newProps) {
    // redirect to feature branch if auth status is true
    if (newProps.authStatus == true) {
      this.props.history.push('/twofactor')
    } else {
      this.setState({ submitted: true });
    }
  }

  render() {
    const customStyles = { input: styles => { return { ...styles, height: '1.7em' }; } }
    const { loggingIn } = this.props;
    const { username, password, submitted, environment } = this.state;
    if (this.state.submitted == true && this.props.errorMessage == null) {
      return (
        <Row id="login-page" >
          <Col className="z-depth-0 offset-xl5 " s={12} m={6} l={5} xl={4}>
            <Row>
              <Spinner size={50} spinnerColor={"#fd5633"} spinnerWidth={4} visible={true} />
            </Row>
          </Col>
        </Row>
      );
    } else {
      return (<div>
        <Row id="login-page">
          <Col className="z-depth-4 offset-xl4 " s={12} m={6} l={4} xl={4}>
            <form className="col-md-4" onSubmit={this.handleSubmit} >
              <Row>
                <Col className="input-field center" s={12}>
                  <p className="center login-form-text"><h5>RAPTER Configurator</h5></p>
                </Col>
              </Row>
              <Row className="margin">
                <Col className="input-field p-0" s={12}>
                  <Input s={12} name='environment' id='environment' type='select' icon='storage' className="pl-0" label='Environment' onChange={this.handleChange} required>
                    <option value=''>Select Environment</option>
                    {env.map(itemval => {
                      return <option value={itemval.value}>{itemval.label}</option>
                    })}
                  </Input>
                </Col>
              </Row>
              <Row className="margin">
                <Col className="input-field p-0" s={12}>
                  <Input
                    s={12}
                    label='Username'
                    id='username'
                    name='username'
                    type='text'
                    icon='person_outline'
                    onChange={this.handleChange}
                    required
                    value={username}
                    className="labelText"
                  />
                </Col>
              </Row>
              <Row className="margin">
                <Col className="input-field p-0" s={12}>
                  <Input
                    s={12}
                    label='Password'
                    id='password'
                    name='password'
                    type='password'
                    icon='lock_outline'
                    onChange={this.handleChange}
                    required
                    value={password}
                    className="labelText"
                  />
                </Col>
                {this.renderAlert()}
              </Row>
              <Row className="center submit-container">
                <button className="btn btn_primary" type="submit" name="action">Submit
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
