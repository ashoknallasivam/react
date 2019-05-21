'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
let urlList= require('../helpers/api-url');

// tenant list.
exports.getTenantList = (requestOptions) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
	//console.log(requestOptions.headers.Environment);
	
	
    return axios.get(`${RAPTER_URL}/tenant`, requestOptions).then(response => {
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
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.get(`${RAPTER_URL}/tenant/` + tenantId, requestOptions).then(response => {
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
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.post(`${RAPTER_URL}/tenant`, inpParam, requestOptions).then(response => {
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
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.put(`${RAPTER_URL}/tenant/` + tenantId, inpParam, requestOptions).then(response => {
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
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.delete(`${RAPTER_URL}/tenant/` + tenantId, requestOptions).then(response => {
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
