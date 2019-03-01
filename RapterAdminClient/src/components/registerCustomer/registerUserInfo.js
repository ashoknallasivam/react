import React from 'react';
import ReactDom from 'react-dom';
import FeasibilityCheck from './feasibilityCheck';
class RegisterUserInfo extends React.Component{
    render(){
        return(
            <div className="col-sm-12 pl-0 pr-0">
              <form className="inlineBlock fullWidth blue maxPaddingAll">
                    <div className="form-group col-sm-3 col-md-offset-1">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name"/>
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="Identity">Identity No.</label>
                        <input type="text" className="form-control" id="Identity"/>
                    </div>
                    <div className="form-group col-sm-3">
                        <label htmlFor="contactInfo">Email/Mobile Number</label>
                        <input type="text" className="form-control" id="contactInfo"/>
                    </div>

                    <div className="checkbox">
                        <label><input type="checkbox"/> Is Corporate?</label>
                    </div>

               </form>
               <div className="col-sm-12 pl-0 pr-0 maxlineHeight">
                <FeasibilityCheck/>
                </div>
              </div>
        )
    }
}

export default RegisterUserInfo;
