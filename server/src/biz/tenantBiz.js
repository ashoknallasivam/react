'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// tenant list.
exports.getTenantList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/tenant`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// find tenant by using id.
exports.getTenant = (requestOptions, tenantId) => {
    return axios.get(`${config.RAPTER_URL}/tenant/` + tenantId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// create tenant.
exports.createTenant = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/tenant`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// update tenant.
exports.updateTenant = (requestOptions, tenantId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/tenant/` + tenantId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// delete tenant.
exports.deleteTenant = (requestOptions, tenantId) => {
    return axios.delete(`${config.RAPTER_URL}/tenant/` + tenantId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
