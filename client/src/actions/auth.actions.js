import { AUTH_USER, AUTH_TOKEN, UNAUTH_USER, AUTH_ERROR, TOKEN_ERROR } from './types';
import { authService } from '../services';

export function login(username, password, environment) {
	
	return function(dispatch) {
		 authService
			.login(username, password, environment)
			.then(
				data => {
					dispatch({ type: AUTH_USER, 
						//payload:environment 
					});
					// alert(JSON.stringify(data));
				},
				error => {
					dispatch(authError('Invalid Credentials'));
					// alert(JSON.stringify(error));
				}
			);
	};

}

export function twoStepVerification(code) {
	
	return function(dispatch) {
		 authService
			.twoStepVerification(code)
			.then(
				data => { 
					 dispatch({ type: AUTH_TOKEN });
					 //alert(JSON.stringify(data));
				},
				error => {
					dispatch(authError('Invalid Code. Please try again.'));
					 //alert(JSON.stringify(error));
				}
			);
	};

}

export function signoutUser() {
	// - Clear the Rapter tokens
	localStorage.removeItem('token');
	localStorage.removeItem('finaltoken');
	localStorage.removeItem('bounds');
	return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function tokenError(error) {
  return {
    type: TOKEN_ERROR,
    payload: error
  };
}

