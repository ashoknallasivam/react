const TENANT_FETCH_SUCCESS = 'TENANT_FETCH_SUCCESS';
const SELECT_ORGANIZATION_DETAIL = 'SELECT_ORGANIZATION_DETAIL';
const CLEAR_ORGANIZATIONS = 'CLEAR_ORGANIZATIONS';
import { API_URL } from '../config';
import axios from 'axios';

let finalToken = localStorage.getItem('finaltoken');
console.log(finalToken);
var config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
};
const actions = {
    selectedOrg: (payload) => ({
        type: SELECT_ORGANIZATION_DETAIL,
        data: payload
    }),
    clearOrg: () => ({
        type: CLEAR_ORGANIZATIONS,
    }),
    getTenants: (payload) => ({
        type: TENANT_FETCH_SUCCESS,
        data: payload
    })
}

export const getTenants = (data) => (dispatch) => {
    axios.all([axios.get(`${API_URL}/api/v1/tenant`, config), axios.get(`${API_URL}/api/v1/organization`, config), axios.get(`${API_URL}/api/v1/role`, config)]).
    then(axios.spread(function (tenantResponse, organizationResponse, roleResponse){
        let combinedInfo = {
            tenantResponse:[...tenantResponse.data],
            organizationResponse:[...organizationResponse.data],
            roleResponse:[...roleResponse.data],
        }
        console.log(combinedInfo);
        dispatch(actions.getTenants(combinedInfo))
      }));
}

export const selectedOrg = (data) => (dispatch) => {
    dispatch(actions.selectedOrg(data))
}

export const clearOrg = () => (dispatch) => {
    console.log('i am here');
    dispatch(actions.clearOrg());
}