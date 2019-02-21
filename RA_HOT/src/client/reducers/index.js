import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import pageReducer from './page_reducer';
import {ProjectInfoReducer, newProject, ApplicationMode, TtoReducers, LtoReducers, ProjectInformation, CopyProjectInfoReducer} from './projectInfoReducers';
import { createProjectReducer } from './createProjectReducer';
import {projectFormReducer, renderedRoles, selectOrgLocMapCreate} from './projectFormReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  page: pageReducer,
  projectInfo: ProjectInfoReducer,
  copyProjectInfo:CopyProjectInfoReducer,
  projectFormReducer:projectFormReducer,
  ApplicationMode: ApplicationMode,//cant be merged but can be moved to component level
  TtoReducers: TtoReducers,//tto and lto can be merged to one reucer
  LtoReducers: LtoReducers,
  createProj: createProjectReducer,//can be merged to projectformReducer
  newProject: newProject,//for showing the latest project, cant be merged
  ProjectInformation: ProjectInformation//for import project, cant be merged
});
export default rootReducer;
