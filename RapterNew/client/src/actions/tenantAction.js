const TENANT_FETCH_SUCCESS = 'TENANT_FETCH_SUCCESS';
const SELECT_ORGANIZATION_DETAIL = 'SELECT_ORGANIZATION_DETAIL';
const CLEAR_ORGANIZATIONS = 'CLEAR_ORGANIZATIONS';
const IMPORT_ALL_PROJECT = 'IMPORT_ALL_PROJECT';

import { API_URL, BACKEND_URL } from '../config';
import axios from 'axios';

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


let formatRoleData = (role) => {
    let roleBody = {};
    roleBody.id = role.id;
    roleBody.name = role.name;
    roleBody.description = role.description;
    roleBody.orgId = role.orgId;
    roleBody.isAssignable = role.isAssignable.data[0];
    roleBody.isAutoAccess = role.isAutoAccess.data[0];
    roleBody.isAutoAssignOnIntake = role.isAutoAssignOnIntake.data[0];
    return roleBody;
}
export const getTenants = (data) => (dispatch) => {
	
	const requestOptions = {
  
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + localStorage.getItem('finaltoken') }
        
    };
	
    axios.all([axios.get(`${BACKEND_URL}/tenant`, requestOptions), axios.get(`${BACKEND_URL}/organization`, requestOptions), axios.get(`${BACKEND_URL}/role`, requestOptions)]).
    then(axios.spread(function (tenantResponse, organizationResponse, roleResponse){
        let allUnformattedRoles = roleResponse.data;
        let formattedRoleData = allUnformattedRoles.map(item => formatRoleData(item));//formatting the api structure with internal structure
        let combinedInfo = {
            tenantResponse:[...tenantResponse.data],
            organizationResponse:[...organizationResponse.data],
            roleResponse:[...formattedRoleData],
        }

        dispatch(actions.getTenants(combinedInfo))
      })).catch(function (error) {
        console.log(error);
        return error.response;
    });
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
    }).catch(function (error) {
        console.log(error);
        return error.response;
    });
}

export const ImportAlltheProjects = () => (dispatch) => {
    axios.get(`${BACKEND_URL}/import-project`, { mode: 'cors' }, config).then(function (response){
        console.log(response.data);
        dispatch(actions.ImportAlltheProjects(response.data));
    }).catch(function (error) {
        console.log(error);
        return error.response;
    });
}
