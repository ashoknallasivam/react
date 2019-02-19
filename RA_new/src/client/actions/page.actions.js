import { UPDATE_BOUNDS,GET_PAGES,GET_PAGE,UPDATE_PAGE,DISPLAY_EDITOR,TEST_MESSAGE } from './types';
import { pageService } from '../services';

export function createBounds({ params }) {
    
	return function(dispatch) {
		 pageService
			.createBounds({params})
			.then(
				response => { 
					dispatch({ type: UPDATE_BOUNDS, payload: response.data["x-rapter-bounds"]});
					// - Save the Rapter token
					localStorage.setItem('bounds', response.data["x-rapter-bounds"]);
					dispatch(getPages());
					// alert(JSON.stringify(data));
				},
				error => {
					dispatch(authError('Invalid Bounds'));
					// alert(JSON.stringify(error));
				}
			);
	};
  
}

export function getPages() {

	return function(dispatch) {
		 pageService
			.getPages()
			.then(
				response => { 
					dispatch({ type: GET_PAGES, payload: response.data});
					// alert(JSON.stringify(data));
				},
				error => {
					dispatch(authError('Unable to Fetch Pages'));
					// alert(JSON.stringify(error));
				}
			);
	};
  
}

export function getPage(params) {
	
	return function(dispatch) {
		 pageService
			.getPage(params)
			.then(
				response => { 
				    delete response.data['_id'];
					dispatch({ type: GET_PAGE, payload: response.data, page_id:params});
					 //alert(JSON.stringify(response));
				},
				error => {
					dispatch(authError('Unable to Fetch Pages'));
					// alert(JSON.stringify(error));
				}
			);
	};

}


export function updatePage(params,id) {

	return function(dispatch) {
		 pageService
			.updatePage(params,id)
			.then(
				response => { 
				    dispatch({ type: UPDATE_PAGE, payload: response.statusText});
					dispatch(getPages());
					// alert(JSON.stringify(data));
				},
				error => {
					dispatch(authError('Unable to Fetch Pages'));
					// alert(JSON.stringify(error));
				}
			);
	};
 
}

export function createPage(params) {

	return function(dispatch) {
		 pageService
			.createPage(params)
			.then(
				response => { 
				    dispatch({ type: UPDATE_PAGE, payload: response.statusText});
					dispatch(getPages());
					// alert(JSON.stringify(data));
				},
				error => {
					dispatch(authError('Unable to Create Pages'));
					// alert(JSON.stringify(error));
				}
			);
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