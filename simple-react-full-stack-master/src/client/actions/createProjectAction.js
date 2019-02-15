import axios from 'axios';
import { ProfileActionTypes } from '../constants/actionTypes';
import objectUtil from '../utils/objectUtil';
import { API_URL } from '../config';

let finalToken = localStorage.getItem('finaltoken');
var config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
};
export function RequestPayload(data = {}, headers = {}) {
    this.data = data;
    this.headers = headers;
}
const actions = {
    GetStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.GET_STUDY_CONFIG,
        data: payload
    }),
    AddStudyConfigGroups: (payload) => ({
        type: ProfileActionTypes.studyConfig.ADD_STUDY_CONFIG_GROUPS,
        data: payload
    }),
    AddStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.ADD_STUDY_CONFIG,
        data: payload
    }),
    AddFinalStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.ADD_FINAL_STUDY_CONFIG,
        data: payload
    }),
    DeleteStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.DELETE_STUDY_CONFIG,
        data: payload
    }),
    UpdateStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.UPDATE_STUDY_CONFIG,
        data: payload
    }),
    GetEnrollmentTarget: (payload) => ({
        type: ProfileActionTypes.enrollmentTarget.GET_ENROLLMENT_TARGET,
        data: payload
    }),
    AddEnrollmentTarget: (payload) => ({
        type: ProfileActionTypes.enrollmentTarget.ADD_ENROLLMENT_TARGET,
        data: payload
    }),
    DeleteEnrollmentTarget: (payload) => ({
        type: ProfileActionTypes.enrollmentTarget.DELETE_ENROLLMENT_TARGET,
        data: payload
    }),
    UpdateEnrollmentTarget: (payload) =>({
        type: ProfileActionTypes.enrollmentTarget.UPDATE_ENROLLMENT_TARGET,
        data: payload
    }),
    SavePublishAction: (payload) => ({
        type: ProfileActionTypes.common.SAVE_PUBLISH_ACTION,
        data: payload
    }),
    FetchEnrollmentTarget: (payload) => ({
        type: ProfileActionTypes.enrollmentTarget.FETCH_ENROLLMENT_TARGET,
        data: payload
    })
};

export const GetStudyConfig = (data) => (dispatch) =>{
    axios.get('https://demo3135799.mockable.io/v1/ra-config',config)
    .then(function (response) {
        dispatch(actions.GetStudyConfig(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
};

export const AddStudyConfigGroups = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    studyConfigList.map(item => {
        if (item.ltoId === getstate().LtoReducers.currentLtoSelection) {
            item.groups.push(data);
        }
    });
    dispatch(actions.AddStudyConfigGroups(studyConfigList));
};

export const AddStudyConfig = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    if (!objectUtil.isEmpty(studyConfigList)) {
        studyConfigList.map(item => {
            if (item.ltoId === getstate().LtoReducers.currentLtoSelection) {
                data.groups = Object.assign([], item.groups);
                item = Object.assign(item, data);
            }
            else {
                dispatch(actions.AddStudyConfig(data));
            }
        });
    }
    else
        dispatch(actions.AddStudyConfig(data));
};

export const AddFinalStudyConfig = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    studyConfigList.map(item => {
        if (item.ltoId === getstate().LtoReducers.currentLtoSelection) {
            data.groups = Object.assign([], item.groups);
            item = Object.assign(item, data);
        }
    });
    dispatch(actions.AddFinalStudyConfig(studyConfigList));
};

export const DeleteStudyConfig = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    studyConfigList.map(item => {
        if (item.ltoId === getstate().LtoReducers.currentLtoSelection) {
            item.groups = data;
        }
    });
    dispatch(actions.DeleteStudyConfig(studyConfigList));
};

export const UpdateStudyConfig = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    studyConfigList.map(item => {
        if (item.ltoId === getstate().LtoReducers.currentLtoSelection) {
            item.groups = data;
        }
    });
    dispatch(actions.UpdateStudyConfig(studyConfigList));
};

export const GetEnrollmentTarget = (data) => (dispatch) => {
    console.log('i am here for get');
    axios.get('http://localhost:3001/home', config)
        .then(function (response) {
            dispatch(actions.GetEnrollmentTarget(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const FetchEnrollmentTarget = () => (dispatch, getState) => {//move this to tenant actions
    const { LtoReducers, createProj } = getState();
    axios.get(`${API_URL}/api/v1/enrollment-target`, config).then((response) => {
        dispatch(actions.FetchEnrollmentTarget(response.data));
        setTimeout(() => {
            let selectedEnrollment = createProj.enrollmentTargetList.filter(item => item.orgId == LtoReducers.currentLtoSelection);
            dispatch(actions.UpdateEnrollmentTarget(selectedEnrollment));//bug alert: loc dropdown match enrollment on 2nd time
        }, 5000);
    })
}

export const AddEnrollmentTarget = (data) => (dispatch) => {
    dispatch(actions.AddEnrollmentTarget(data));
};

export const DeleteEnrollmentTarget = (data) => (dispatch, getstate) => {
    const newState = getstate().createProj.enrollmentTargetData;
    data.map(row => {
        newState.map(iteratedValue => {
            if (iteratedValue.id === row.id) {
                const index = newState.findIndex(value => (value.id === row.id));
                newState.splice(index, 1);
            }
        });
    });
    dispatch(actions.DeleteEnrollmentTarget(newState));
};
export const UpdateEnrollmentTarget = (data) => (dispatch, getstate) => {
   // console.log(data);
    const state = getstate();
    //  const index = state.createProj.enrollmentTargetData.findIndex(iteratedValue => iteratedValue.id === data.id);
   // const newState = Array.from(state.createProj.enrollmentTargetData);
     //console.log("action",newState);
    //  newState[index] = editedRow;
    //  if (index >= 0) {
         dispatch(actions.UpdateEnrollmentTarget(state.createProj.enrollmentTargetData));
    //  }
};

export const SavePublishAction = () => (dispatch, getstate) => {
    const url = 'http://localhost:3000/home';
    const postData = getstate().createProj.studyConfigData;
    const requestPayload = new RequestPayload(postData);
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    // axios.defaults.headers.post['Authorization'] = 'bearer ' + 1234556;
    // axios.defaults.headers.post['Acces-Control-Allow-Origin'] = '*';
    // console.log("data to post",requestPayload.data)
    axios.post(url, requestPayload.data, config)
        .then(function (response) {
            dispatch(actions.SavePublishAction(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
};
