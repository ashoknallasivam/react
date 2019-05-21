'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');
let urlList= require('../helpers/api-url');

// role list.
exports.getRoleList = (requestOptions) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.get(`${RAPTER_URL}/role`, requestOptions).then(response => {
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
// find role by using id.
exports.getRole = (requestOptions, roleIdId) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.get(`${RAPTER_URL}/role/` + roleIdId, requestOptions).then(response => {
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

// create role.
exports.createRole = (requestOptions, inpParam) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.post(`${RAPTER_URL}/role`, inpParam, requestOptions).then(response => {
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

// update role.
exports.updateRole = (requestOptions, RoleId, inpParam) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.put(`${RAPTER_URL}/role/` + RoleId, inpParam, requestOptions).then(response => {
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
// delete role.
exports.deleteRole = (requestOptions, roleIdId) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.delete(`${RAPTER_URL}/role/` + roleIdId, requestOptions).then(response => {
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

// create user role.
exports.createUserRole = (requestOptions, inpParam) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.post(`${RAPTER_URL}/user-role`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error === undefined ? error.response.data.sqlMessage : error.response.error };
    });
};


// user role list.
exports.getUserRoleList = (requestOptions) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.get(`${RAPTER_URL}/user-role`, requestOptions).then(response => {
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
// find user role by using id.
exports.getUserRole = (requestOptions, userRoleIdId) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.get(`${RAPTER_URL}/user-role/` + userRoleIdId, requestOptions).then(response => {
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
// update user role.
exports.updateUserRole = (requestOptions, userRoleIdId, inpParam) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.put(`${RAPTER_URL}/user-role/` + userRoleIdId, inpParam, requestOptions).then(response => {
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