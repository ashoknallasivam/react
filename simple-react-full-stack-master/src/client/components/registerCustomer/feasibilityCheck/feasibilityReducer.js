import {feasibilityActionTypes as registrationActions} from 'actionTypes'

const initialState = {
    isFeasibilityAvailable: false,
    description: '',
    completionDate: '',
    technologiesAvailable: [],
    feasibilityAddress: '',
    error: false,
    errorMsg: '',
}

function feasibilityReducer(state = initialState, action) {
    switch (action.type) {
        case registrationActions.FEASIBILITY_CHECK_STARTED:
            //TODO Display a loading screen by setting a loadingState
            return state
        case registrationActions.FEASIBILITY_CHECK_SUCCESS:
            let data = action.data.response.body.feasibility
            if(data.status.toUpperCase() === 'YES') {
                data['description'] = 'FEASIBILITY OK'
            } else {
                data['description'] = 'FEASIBILITY NOT OK'
            }
            return {
                ...state,
                isFeasibilityAvailable: data.status.toUpperCase() === 'YES' ? true: false,
                technologiesAvailable: data.technology,
                feasibilityAddress: data.address,
                description: data.description,
                probableDate: data.probableDate,
            }
        case registrationActions.FEASIBILITY_CHECK_FAILED:
            return {
                ...state,
                error: true,
                errorMsg: action.data.error
            }
        default:
            return state
    }
}

export default feasibilityReducer