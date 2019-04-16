'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// organization list.
exports.getOrganizationList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/organization`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};
// find organization by using id.
exports.getOrganization = (requestOptions, organizationId) => {
    return axios.get(`${config.RAPTER_URL}/organization/` + organizationId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};

// create organization.
exports.createOrganization = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/organization`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};

// update organization.
exports.updateOrganization = (requestOptions, organizationId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/organization/` + organizationId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};
// delete organization.
exports.deleteOrganization = (requestOptions, organizationId) => {
    return axios.delete(`${config.RAPTER_URL}/organization/` + organizationId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};

// create organization user.
exports.createOrganizationUser = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/organization-user`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};