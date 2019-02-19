import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TopTags from '../../components/topTags/topTags';
import SearchTypeahead from '../../components/typeahead/searchTypeahead';
import RegisterUserInfo from '../../components/registerCustomer/registerUserInfo'

class RegisterCustomer extends Component {
    render() {
        return (
            <div className="row">
               <RegisterUserInfo/>
               <div className="col-sm-12 pl-2 pr-0 white minPaddingAll">
               <SearchTypeahead/>
               <h4>Top Tags</h4>
               <TopTags/>
               </div>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // TODO
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                // TODO
            },
            dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCustomer)