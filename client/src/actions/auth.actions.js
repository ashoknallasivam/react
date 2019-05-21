import { AUTH_USER, AUTH_TOKEN, UNAUTH_USER, AUTH_ERROR, TOKEN_ERROR, SMS_ERROR } from './types';
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
					
				},
				error => {
					dispatch(authError(error.data.messages));
					 
				}
			);
	};

}

export function twoStepGeneration() {
	
	return function(dispatch) {
		 authService
			.twoStepGeneration()
			.then(
				data => { 
					 //dispatch({ type: AUTH_TOKEN });
					 //console.log('Data',data);
					 //dispatch(smsError('Code sent via SMS.'));
					 //alert(JSON.stringify(data));
				},
				error => {
					//dispatch(smsError('Unable able send SMS. Please try again.'));
					//console.log('Error',error)
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

export function smsError(error) {
  return {
    type: SMS_ERROR,
    payload: error
  };
}

export function tokenError(error) {
  return {
    type: TOKEN_ERROR,
    payload: error
  };
}

