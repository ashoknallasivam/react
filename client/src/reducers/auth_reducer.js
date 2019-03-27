import { AUTH_USER,AUTH_TOKEN,UNAUTH_USER,AUTH_ERROR,TOKEN_ERROR,FETCH_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
	
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, tokenverified: false };
    case AUTH_TOKEN:
      return { ...state, error: '', authenticated: true, tokenverified: true };	  
    case UNAUTH_USER:
      return { ...state, authenticated: false, tokenverified: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
	case TOKEN_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }

  return state;
}
