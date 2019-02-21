const TENANT_FETCH_SUCCESS = 'TENANT_FETCH_SUCCESS';
const SELECT_ORGANIZATION_DETAIL = 'SELECT_ORGANIZATION_DETAIL';
const CLEAR_ORGANIZATIONS = 'CLEAR_ORGANIZATIONS';
const IMPORT_ALL_PROJECT = 'IMPORT_ALL_PROJECT';

import { API_URL, BACKEND_URL } from '../config';
import axios from 'axios';

let finalToken = localStorage.getItem('finaltoken');

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
    }),
    ImportAlltheProjects: (payload) => ({
        type: IMPORT_ALL_PROJECT,
        data: payload
    })
}

// export const passToken = () => {
//     axios.post(`${BACKEND_URL}/token`, {mode: 'cors'}, config).then(function (response) {
//         console.log(response);
//     });
// }
export const getTenants = (data) => (dispatch) => {
    axios.all([axios.get(`${BACKEND_URL}/tenant`, {mode: 'cors'}, config), axios.get(`${BACKEND_URL}/organization`, {mode: 'cors'}, config), axios.get(`${BACKEND_URL}/role`, {mode: 'cors'}, config)]).
    then(axios.spread(function (tenantResponse, organizationResponse, roleResponse){
        let combinedInfo = {
            tenantResponse:[...tenantResponse.data],
            organizationResponse:[...organizationResponse.data],
            roleResponse:[...roleResponse.data],
        }

        dispatch(actions.getTenants(combinedInfo))
      }));
}

export const selectedOrg = (data) => (dispatch) => {
    dispatch(actions.selectedOrg(data))
}

export const clearOrg = () => (dispatch) => {
    dispatch(actions.clearOrg());
}

export const ExportThisProject = (id, name) => (dispatch) => {
    let project = {id: id, name: name}
    console.log(project);
    return axios.post(`${BACKEND_URL}/export-project`, project, { mode: 'cors' }, config).then(function (response) {
        console.log(response.data);
        return response.data;
    })
}

export const ImportAlltheProjects = () => (dispatch) => {
    axios.get(`${BACKEND_URL}/import-project`, { mode: 'cors' }, config).then(function (response){
        console.log(response.data);
        dispatch(actions.ImportAlltheProjects(response.data));
    })
}