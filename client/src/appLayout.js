import React, { Component, Fragment } from 'react';
import Routes from './routes/mainRoute';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
class App extends Component {
    render() {
        return (
            <Fragment>
                <Header /> 
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
