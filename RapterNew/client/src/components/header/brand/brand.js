/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

class Brand extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleClick = () =>{
      this.props.clearOrgStore();
    }
    render() {
        return (
          <Fragment>
              <Link to="/dashboard" className="mpr-logo" onClick={this.handleClick}>
                  <img src={ this.props.brand } alt="materialize logo"/>
              </Link>
          </Fragment>
        );
    }
}


export default (Brand);