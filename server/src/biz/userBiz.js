'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// create bounds.
exports.getUserInfo = (requestOptions, inpParam) => {
    return axios.get(`${config.RAPTER_URL}/me`, requestOptions).then(response => {
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