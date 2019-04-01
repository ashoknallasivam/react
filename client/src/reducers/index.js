import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import projectList from './fetchTenantsReducer'


export default combineReducers({
  form,
  auth: authReducer,
  projectList
});
