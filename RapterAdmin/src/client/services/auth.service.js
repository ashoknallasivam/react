import axios from 'axios';
import { authHeaderInitial } from '../helpers';
import { API_URL, BACKEND_URL } from '../config';

export const authService = {
    login,
	twoStepVerification,
    logout,

};

function login(username, password, environment) {
		
	return axios
			.post(`${BACKEND_URL}/login`, { username, password, environment })
			.then(onSuccess)
			.catch(onError);
	
}

function twoStepVerification(code) {
  console.log(code);
		
	return axios
			.post(`${BACKEND_URL}/two-factor-validate`, { code },{mode: 'cors'},{ headers: 'access-token' :localStorage.getItem('token')})
			.then(onSuccess)
			.catch(onError);
	
}

sudo kill `sudo lsof -t -i:9001`

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

const onSuccess = function (response) {

    console.debug('Request Successful!', response);
    return response.data;
  }

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
}




