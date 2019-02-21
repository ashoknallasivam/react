import React, { Component } from 'react'
import './feasibility.scss';

const DefaultView = (props) => (
    <div>
        <span>To check feasibility</span>
        <span><i className="material-icons">location_on</i></span>
        <a href='javascript:void(0);' onClick={props.displayFormView}>Add Address or Land Phone</a>
    </div>
)

const FeasibilityFormView = (props) => (
    <div>
        <input type="text"
            className={props.error ? 'error' : ''}
            placeholder="Address"
            value={props.address}
            onChange={props.handleAddressChange}
            onBlur={props.handleSubmit}
        />
        <input type="text"
            className={props.error ? 'error' : ''}
            placeholder="Land Phone"
            value={props.landPhone}
            onChange={props.handleLandPhoneChange}
            onBlur={props.handleSubmit}
        />
    </div>
)

const PostFeasibilityCheckView = (props) => (
    <div>
        <span className={props.isFeasibilityAvailable ? 'success-text': 'failure-text'}>{props.description}</span>
        <span><i className="material-icons">location_on</i></span>
        <span>{props.feasibilityAddress}</span>
    </div>
)

const InstallationInProgressView = (props) => (
    <div>

    </div>
)

class FeasibilityCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentView: 'default',
            address: '',
            landPhone: '',
            error: false,
        }
    }

    displayFormView = () => {
        this.setState({
            currentView: 'formView'
        })
    }

    handleSubmit = () => {
        const { address, landPhone } = this.state

        if (address.length == 0 && landPhone.length == 0) {
            this.setState({
                error: true,
            })
            return
        }

        const payload = {
            feasibilityRequest: {
                address: "BTM",
                neighbourPhoneNumber: "",
                technology: "Fiber"
            }
        }

        this.props.checkFeasibility(payload).then(response => {
            this.setState({
                currentView: 'feasibilityCheckSuccess',
                address: '',
                landPhone: '',
                error: false,
            })
        })
        /*setTimeout(() => {
            this.setState({
                address: '',
                landPhone: '',
                error: false,
            })
        }, 3000)*/
    }

    handleAddressChange = (e) => {
        const input = e.target.value

        this.setState({
            address: input,
        })
    }

    handleLandPhoneChange = (e) => {
        const input = e.target.value

        this.setState({
            landPhone: input,
        })
    }

    render() {
        const { currentView, address, landPhone, error } = this.state
        let feasibilityView = null

        if (currentView === 'default') {
            feasibilityView = <DefaultView displayFormView={this.displayFormView}/>
        }

        if (currentView === 'formView') {
            const viewProps = {
                handleSubmit: this.handleSubmit,
                handleAddressChange: this.handleAddressChange,
                handleLandPhoneChange: this.handleLandPhoneChange,
                address,
                landPhone,
                error,
            }
            feasibilityView = <FeasibilityFormView {...viewProps} />
        }

        if (currentView === 'feasibilityCheckSuccess') {
            feasibilityView = <PostFeasibilityCheckView {...this.props.feasibilityResponse}/>
        }

        return (
            <div>{feasibilityView}</div>
        )
    }
}

export default FeasibilityCheck