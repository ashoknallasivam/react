import axios from 'axios';
import { authHeaderInitial } from '../helpers';
import { API_URL, BACKEND_URL } from '../config';

export const authService = {
    login,
	twoStepGeneration,
	twoStepVerification,
    logout,

};

function login(username, password, environment) {
		
	return axios
			.post(`${BACKEND_URL}/login`, { username, password, environment })
			//.then(onSuccess)
			.then(function (response) {
				// - Save the Rapter token
				localStorage.setItem('token', response.data.token);
				onSuccess
			})
			.catch(onError);
	
}


function twoStepGeneration() {
    
	
    return axios
			.get(`${BACKEND_URL}/two-factor-sms`, { headers: authHeaderInitial() } )
			.then(function (response) {
				// - Save the Rapter token
				return onSuccessStatus(response);
			})
     		.catch(onError);
}


function twoStepVerification(code) {
    
    return axios
			.post(`${BACKEND_URL}/two-factor-validate`, { code }, { headers: authHeaderInitial() })
			.then(function (response) {
				// - Save the Rapter token
				localStorage.setItem('finaltoken', response.data.token);
				onSuccess
			})
     		.catch(onError);
	
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

const onSuccess = function (response) {

    console.debug('Request Successful!', response);
    return response.data;
  };
  
const onSuccessStatus = function (response) {

    console.debug('Request Successful!', response);
    return response.status;
  };  

const onError = function (error) {

    console.debug('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);

    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
};




