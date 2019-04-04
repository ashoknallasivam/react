'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// create bounds.
exports.createBounds = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/bounds`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};