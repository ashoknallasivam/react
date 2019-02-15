import ReactImage from './react.png';
import React, { Component, Fragment } from 'react';
import { Col, Row, Card } from 'react-materialize';
import Routes from './routes/mainRoute';
import Header from './components/header';
import Footer from './components/footer';
import Breadcrumbs from './components/breadcrumbs';
import SideNav from "./components/sideNav";
import RightSideNav from "./components/rightSideNav";
import RequireAuth from './components/auth/require_auth';
import Users from './Users';

export default class App extends Component {
  
  
   constructor(props) {
    super(props);

    this.state = {
      users: [],
     
    };

  }
  
  componentDidMount() {
	  
	
	
    this.nv.addEventListener("login", this.handleNvEnter);
  }

  componentWillUnmount() {
    this.nv.removeEventListener("login", this.handleNvEnter);
  }

  handleNvEnter = (event) => {
    this.setState({ username: event.detail.username, password: event.detail.password })
  }
  
  

  
  render() {
    	
    return (
            <Fragment>
			    
			    
                <Header toggleRightNav={this.toggleRightNav}/> 
                <div id="main">
                    <div className="wrapper">

                        <section id="content">
                            <div className="container cards-container">
							    <ng-login ref={elem => this.nv = elem} username={this.state.username} password={this.state.password}></ng-login> 
                                <Routes />
								{/*<Users />*/}
                            </div>
                        </section>
                        
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
  }
}
