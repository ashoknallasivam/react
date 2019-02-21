import axios from 'axios';
import { UPDATE_BOUNDS,GET_PAGES,GET_PAGE,UPDATE_PAGE,DISPLAY_EDITOR,TEST_MESSAGE } from './types';
import { API_URL } from '../config';

export function createBounds({ params }) {
	alert(JSON.stringify({params}));
  return function(dispatch) {
	
    axios
      .post(`${API_URL}/api/v1/bounds`, params , { headers:{'Authorization': 'Bearer ' + localStorage.getItem('finaltoken')}})
      .then(response => {
        // If request is good...
        // - Update state to indicate the bounds got updated
        dispatch({ type: UPDATE_BOUNDS, payload: response.data["x-rapter-bounds"]});
        // - Save the Bounds token
        localStorage.setItem('bounds', response.data["x-rapter-bounds"]);
		dispatch(getPages());
		//console.log(JSON.stringify(response.data["x-rapter-bounds"]));
      })
      .catch(() => {
		// If request is bad...
        // - Show an error to the user
		
        dispatch(authError('Invalid Bounds'));
      });
	  
  };
}


export function getPages() {
	//alert('Ahh..');
 return function(dispatch) {
	
    axios
      .get(`${API_URL}/api/v1/page`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
		'x-rapter-bounds': localStorage.getItem('bounds') }
      })
      .then(response => {
        dispatch({ type: GET_PAGES, payload: response.data});
		//console.log(JSON.stringify(response.data));
      })
	  .catch(() => {
		
        // If request is bad...
        // - Show an error to the user
		dispatch(authError('Unable to Fetch Pages'));
      });
  };
}

export function getPage(params) {
	//alert(params);
 return function(dispatch) {
	
    axios
      .get(`${API_URL}/api/v1/page/` + params, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
		'x-rapter-bounds': localStorage.getItem('bounds') }
      })
      .then(response => {
		delete response.data['_id'];
        dispatch({ type: GET_PAGE, payload: response.data, page_id:params});
		//console.log(JSON.stringify(response.data));
      })
	  .catch(() => {
		
        // If request is bad...
        // - Show an error to the user
		dispatch(authError('Unable to Fetch Pages'));
      });
  };
}


export function updatePage(params,id) {

	
 return function(dispatch) {
	
    axios
      .put(`${API_URL}/api/v1/page/${id}`, params , {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
		'x-rapter-bounds': localStorage.getItem('bounds'), 'Content-Type': 'application/json' }
      })
      .then(response => {
        dispatch({ type: UPDATE_PAGE, payload: response.statusText});
		dispatch(getPages());
      })
	  .catch(() => {
		//alert('Error');
        // If request is bad...
        // - Show an error to the user
		dispatch(authError('Unable to Fetch Pages'));
      });
  };
}

export function createPage(params,id) {

	
 return function(dispatch) {
	
    axios
      .post(`${API_URL}/api/v1/page`, params , {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('finaltoken') , 
		'x-rapter-bounds': localStorage.getItem('bounds'), 'Content-Type': 'application/json' }
      })
      .then(response => {
        dispatch({ type: UPDATE_PAGE, payload: response.statusText});
		dispatch(getPages());
      })
	  .catch(() => {
		//alert('Error');
        // If request is bad...
        // - Show an error to the user
		dispatch(authError('Unable to Fetch Pages'));
      });
  };
}

export function viewEditor() {
	
  return {
    type: DISPLAY_EDITOR,
    payload: 'Add'
  };
}

export function test() {
        return {
			type: TEST_MESSAGE,
			payload: 'Test'
		};    
}