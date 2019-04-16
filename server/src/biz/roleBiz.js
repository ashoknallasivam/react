'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// role list.
exports.getRoleList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/role`, requestOptions).then(response => {
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
    return axios.get(`${config.RAPTER_URL}/role/` + roleIdId, requestOptions).then(response => {
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
    return axios.post(`${config.RAPTER_URL}/role`, inpParam, requestOptions).then(response => {
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
    return axios.put(`${config.RAPTER_URL}/role/` + RoleId, inpParam, requestOptions).then(response => {
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
    return axios.delete(`${config.RAPTER_URL}/role/` + roleIdId, requestOptions).then(response => {
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
    return axios.post(`${config.RAPTER_URL}/user-role`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error === undefined ? error.response.data.sqlMessage : error.response.error };
    });
};


// user role list.
exports.getUserRoleList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/user-role`, requestOptions).then(response => {
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
    return axios.get(`${config.RAPTER_URL}/user-role/` + userRoleIdId, requestOptions).then(response => {
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
    return axios.put(`${config.RAPTER_URL}/user-role/` + userRoleIdId, inpParam, requestOptions).then(response => {
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