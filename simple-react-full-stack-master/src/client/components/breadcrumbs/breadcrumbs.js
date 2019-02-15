/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import './breadcrumbs.scss';

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <Fragment>          
          <div id="breadcrumbs-wrapper">       
             <div className="container">
              <div className="row">
                <div className="col s10 m12 l12">
                  
				  <Col s={3} m={12}> </Col>
				   
				   {/*<ol className="breadcrumbs">
                    <li><a href="index-2.html">Dashboard</a></li>
                    <li><a href="#">Pages</a></li>
                    <li className="active">Blank Page</li>
				   </ol>*/}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        );
    }
}


export default (Breadcrumbs);