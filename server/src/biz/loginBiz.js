'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
let urlList= require('../helpers/api-url');

// login.
exports.getLogin = (requestOptions) => {
	
	let RAPTER_URL = urlList.apiUrl(requestOptions.environment)
	let rtVal
	//console.log(requestOptions.environment);
	//console.log(`${RAPTER_URL}/login`);
	
    return axios.post(`${RAPTER_URL}/login`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        if (error.response !== undefined) {//if the environment login url is valid,
            rtVal = {//the url check is required only during login.
                code:error.response.status,
                status:error.response.statusText,
                messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
            };   
        }else{
            rtVal = {
                code:401,
                status:"invalid url",
                messages: "the enviroment has wrong URL"
            }; 
        }
        
        return rtVal;
    });
};
exports.getTwoFactorGeneration = (requestOptions) => {
	//console.log(requestOptions)
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
	//console.log(requestOptions.headers.Environment);
    return axios.post(`${RAPTER_URL}/two-factor-sms`, {} ,requestOptions).then(response => {
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
exports.getTwoFactorValidation = (inpParam, requestOptions) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
	
    return axios.post(`${RAPTER_URL}/two-factor-validate`, inpParam, requestOptions).then(response => {
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

