import axios from 'axios';
import { authHeaderFinal, xrapterBounds } from '../helpers';
import { API_URL } from '../config';

export const pageService = {
    createBounds,
	getPages,
	getPage,
	updatePage,
	createPage,
};

function createBounds( { params } ) {
		
	return axios
			.post(`${API_URL}/api/v1/bounds`, params , { headers: authHeaderFinal() } )
			.then(onSuccess)
			.catch(onError);
	
}

function getPages() {
		
	return axios
			.get(`${API_URL}/api/v1/page`, {
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
				'x-rapter-bounds': localStorage.getItem('bounds') }
			  } )
			.then(onSuccess)
			.catch(onError);
	
}

function getPage(params) {
		
	return axios
			.get(`${API_URL}/api/v1/page/` + params, {
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
				'x-rapter-bounds': localStorage.getItem('bounds') }
			  })
			.then(onSuccess)
			.catch(onError);
	
}

function updatePage(params,id) {
		
	return axios
			.put(`${API_URL}/api/v1/page/${id}`, params , {
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
				'x-rapter-bounds': localStorage.getItem('bounds'), 'Content-Type': 'application/json' }
			  })
			.then(onSuccess)
			.catch(onError);
	
}

function createPage(params) {
		
	return axios
			.post(`${API_URL}/api/v1/page`, params , {
				headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
				'x-rapter-bounds': localStorage.getItem('bounds'), 'Content-Type': 'application/json' }
			  })
			.then(onSuccess)
			.catch(onError);
	
}

const onSuccess = function (response) {

    console.debug('Request Successful!', response);
    return response;
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




