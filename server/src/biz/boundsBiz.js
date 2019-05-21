'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');
let urlList= require('../helpers/api-url');

// create bounds.
exports.createBounds = (requestOptions, inpParam) => {
	
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
	
    return axios.post(`${RAPTER_URL}/bounds`, inpParam, requestOptions).then(response => {
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
