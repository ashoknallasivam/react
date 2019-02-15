import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import pageReducer from './page_reducer';
import {ProjectInfoReducer, newProject, ApplicationMode, TtoReducers, LtoReducers} from './projectInfoReducers';
import organizationStore from './organizationReducer';
import {createProjectReducer} from './createProjectReducer';
import {projectFormReducer, renderedRoles, selectOrgLocMapCreate} from './projectFormReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  page: pageReducer,
  projectInfo: ProjectInfoReducer,
  organization: organizationStore,
  projectFormReducer:projectFormReducer,
  ApplicationMode: ApplicationMode,
  TtoReducers: TtoReducers,
  LtoReducers: LtoReducers,
  createProj: createProjectReducer,
  newProject: newProject
});
console.log(rootReducer);
export default rootReducer;
