import API from '../../../services/api/baseServiceApi'
import {feasibilityActionTypes as registrationActions} from 'actionTypes'

const actions = {
    feasibilityCheckStarted: () => {
        return {
            type: registrationActions.FEASIBILITY_CHECK_STARTED
        }
    },
    feasibilityCheckSuccess: (res) => {
        return {
            type: registrationActions.FEASIBILITY_CHECK_SUCCESS,
            data: res,
        }
    },
    feasibilityCheckFailed: (err) => {
        return {
            type: registrationActions.FEASIBILITY_CHECK_FAILED,
            error: err
        }
    },
}

export function checkFeasibility(payload) {
    return (dispatch) => {
        //dispatch(actions.feasibilityCheckStarted)
        const request = {
            url: 'http://10.2.53.10:8080/cap-dataservice/rest/dataservice/MTN/MOCK/01/clientRequestRead/json/1',
            method: 'POST',
            payload
        }
        return API.processServiceCall(request).then((res) => {
            dispatch(actions.feasibilityCheckSuccess(res))
        }, (err) => {
            dispatch(actions.feasibilityCheckFailed(err))
        })
    }
}