'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// tenant list.
exports.getTenantList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/tenant`, requestOptions).then(response => {
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
// find tenant by using id.
exports.getTenant = (requestOptions, tenantId) => {
    return axios.get(`${config.RAPTER_URL}/tenant/` + tenantId, requestOptions).then(response => {
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

// create tenant.
exports.createTenant = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/tenant`, inpParam, requestOptions).then(response => {
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

// update tenant.
exports.updateTenant = (requestOptions, tenantId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/tenant/` + tenantId, inpParam, requestOptions).then(response => {
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
// delete tenant.
exports.deleteTenant = (requestOptions, tenantId) => {
    return axios.delete(`${config.RAPTER_URL}/tenant/` + tenantId, requestOptions).then(response => {
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
