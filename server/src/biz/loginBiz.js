'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// login.
exports.getLogin = (requestOptions) => {
    return axios.post(`${config.RAPTER_URL}/login`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
exports.getTwoFactorValidation = (inpParam, requestOptions) => {
    return axios.post(`${config.RAPTER_URL}/two-factor-validate`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
