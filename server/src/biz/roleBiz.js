'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// role list.
exports.getRoleList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/role`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// find role by using id.
exports.getRole = (requestOptions, roleIdId) => {
    return axios.get(`${config.RAPTER_URL}/role/` + roleIdId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// create role.
exports.createRole = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/role`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// update role.
exports.updateRole = (requestOptions, RoleId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/role/` + RoleId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// delete role.
exports.deleteRole = (requestOptions, roleIdId) => {
    return axios.delete(`${config.RAPTER_URL}/role/` + roleIdId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
