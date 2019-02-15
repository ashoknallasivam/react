import React, { Component, Fragment } from 'react';
import { Col, Row, Card } from 'react-materialize';
import Routes from './routes/mainRoute';
import Header from './components/header';
import Footer from './components/footer';
import Breadcrumbs from './components/breadcrumbs';
import SideNav from "./components/sideNav";
import RightSideNav from "./components/rightSideNav";
import RequireAuth from './components/auth/require_auth';
import 'babel-polyfill'; 


class App extends Component {
    constructor(props) {
		
        super(props);
		
		
		
        this.state = {
            isVisableAsideLeft: false,
            isRegistration: true,
            isRightNavOpen:false,
            data: null
       }

    }
    componentDidMount() {
        // Call our fetch function below once the component mounts
        // this.callBackendAPI()
        // .then(res => {
        //     this.setState({ data: res.express });
        //     console.log(res)
        // })
        // .catch(err => console.log(err, 'very okay'));
      }
      
    //   callBackendAPI = async () => {
    //     const response = await fetch('http://localhost:8000/tenant',{mode: 'cors'});
    //       console.log(response);
    //       const body = await response.json();
      
    //     if (response.status !== 200) {
    //       throw Error(body.message) 
    //     }
    //     return body;
    //   };
    toggleRightNav = () => {
        this.setState({ isRightNavOpen: !this.state.isRightNavOpen });
    }
    render() {
			
		//let navHeader = !this.state.auth.authenticated ? <Header toggleRightNav={this.toggleRightNav}/>  : '';
        return (
            <Fragment>
			    
                <Header toggleRightNav={this.toggleRightNav}/> 
                <div id="main">
                    <div className="wrapper">

                        <section id="content">
                            <div className="container cards-container">
                                <Routes />
                            </div>
                        </section>
                        
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export default App;
