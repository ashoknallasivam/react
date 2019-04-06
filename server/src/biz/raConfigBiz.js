'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// ra-config list.
exports.getRaConfigList = (requestOptions, tenantId) => {
    return axios.get(`${config.RAPTER_URL}/ra-config?tenantId=`+ tenantId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// find ra-config by using id.
exports.getRaConfig = (requestOptions, paramsId, query_string) => {
    return axios.get(`${config.RAPTER_URL}/ra-config/` +paramsId + '?tenantId='+ query_string , requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// create ra-config.
exports.createRaConfig = (requestOptions, tenantId, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/ra-config?tenantId=`+ tenantId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// update ra-config.
exports.updateRaConfig = (requestOptions, inpParam, query_string, reqBody) => {
    return axios.put(`${config.RAPTER_URL}/ra-config/` + inpParam+ '?tenantId=' + query_string, reqBody, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// delete ra-config.
exports.deleteRaConfig = (requestOptions, inpParam, query_string) => {
    return axios.delete(`${config.RAPTER_URL}/ra-config/` + inpParam + '?tenantId=' + query_string, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
