import axios from 'axios';
import { ProfileActionTypes } from '../constants/actionTypes';
import objectUtil from '../utils/objectUtil';
import { API_URL, BACKEND_URL } from '../config';

let finalToken = localStorage.getItem('finaltoken');
var config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
};
export function RequestPayload(data = {}, headers = {}) {
    this.data = data;
    this.headers = headers;
}
const actions = {
    AddStudyConfigGroups: (payload) => ({
        type: ProfileActionTypes.studyConfig.ADD_STUDY_CONFIG_GROUPS,
        data: payload
    }),
    AddStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.ADD_STUDY_CONFIG,
        data: payload
    }),
    // AddFinalStudyConfig: (payload) => ({
    //     type: ProfileActionTypes.studyConfig.ADD_FINAL_STUDY_CONFIG,
    //     data: payload
    // }),
    DeleteStudyConfigGroups: (payload) => ({
        type: ProfileActionTypes.studyConfig.DELETE_STUDY_CONFIG_GROUPS,
        data: payload
    }),
    UpdateStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.UPDATE_STUDY_CONFIG,
        data: payload
    }),
    DeleteStudyConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.DELETE_STUDY_CONFIG,
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
    UpdateEnrollmentTarget: (payload) => ({
        type: ProfileActionTypes.enrollmentTarget.UPDATE_ENROLLMENT_TARGET,
        data: payload
    }),
    FetchEnrollmentTarget: (payload) => ({
        type: ProfileActionTypes.enrollmentTarget.FETCH_ENROLLMENT_TARGET,
        data: payload
    }),
    FetchRaConfig: (payload) => ({
        type: ProfileActionTypes.studyConfig.FETCH_RA_CONFIG,
        data: payload
    })
};

export const AddStudyConfigGroups = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    studyConfigList.map(item => {
        if (item.ltoId == getstate().LtoReducers.currentLtoSelection) {
            item.groups.push(data);
        }
    });
    dispatch(actions.AddStudyConfigGroups(studyConfigList));
};

export const AddStudyConfig = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    let ltoIdPresent = false;
    if (!objectUtil.isEmpty(studyConfigList)) {
        studyConfigList.map(item => {
            if (item.ltoId == data.ltoId) {
                ltoIdPresent = true;
            }
        })
    }
    else
        dispatch(actions.AddStudyConfig(data));

    if (ltoIdPresent === true) {
        studyConfigList.map(item => {
            if (item.ltoId == getstate().LtoReducers.currentLtoSelection) {
                data.groups = Object.assign([], item.groups);
                item = Object.assign(item, data);
            }
        });
    }
    else if (ltoIdPresent === false && !objectUtil.isEmpty(studyConfigList))
        dispatch(actions.AddStudyConfig(data));
};

// export const AddFinalStudyConfig = () => (dispatch) => {
//     dispatch(actions.AddFinalStudyConfig());
// };

export const DeleteStudyConfigGroups = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    studyConfigList.map(item => {
        if (item.ltoId == getstate().LtoReducers.currentLtoSelection) {
            item.groups = data;
        }
    });
    dispatch(actions.DeleteStudyConfigGroups(studyConfigList));
};

export const UpdateStudyConfig = (data) => (dispatch, getstate) => {
    const studyConfigList = getstate().createProj.studyConfigList;
    dispatch(actions.UpdateStudyConfig(studyConfigList));
};

export const DeleteStudyConfig = (data) => (dispatch, getstate) => {
    const finalStudyConfigData = getstate().createProj.finalStudyConfigData;
    let deletedDataId = "";
    finalStudyConfigData.map((item, index) => {
        if(item.ltoId == data){
            deletedDataId = item._id;
            finalStudyConfigData.splice(index, 1);
        }
    })
    const studyConfigDelete = {finalStudyConfigData: finalStudyConfigData, id: deletedDataId};
    dispatch(actions.DeleteStudyConfig(studyConfigDelete));
};

export const FetchRaConfig = (data) => (dispatch) =>{
    let tempBody = {"tenant": data};
    axios.post(`${BACKEND_URL}/ra-config`, tempBody, {mode: 'cors'}, config)
    .then(function (response) {
        let temp = [];
        response.data.map(item => {
            let body = {};
            body._id = item._id;
            body.description = item.description;
            body.ltoId = item.stratum[0].value;
            body.blockSize = item.blockSize;
            body.groups = item.groups;
            temp.push(body);
        })
        dispatch(actions.FetchRaConfig(temp));
    })
    .catch(function (error) {
        console.log(error);
    });
};

export const FetchEnrollmentTarget = () => (dispatch, getState) => {//move this to tenant actions
    const { LtoReducers, createProj } = getState();
    axios.get(`${BACKEND_URL}/enrollment-target`, {mode: 'cors'}, config).then((response) => {
        dispatch(actions.FetchEnrollmentTarget(response.data));
        //let selectedEnrollment = createProj.enrollmentTargetList.filter(item => item.orgId == LtoReducers.currentLtoSelection);
           // dispatch(actions.UpdateEnrollmentTarget(selectedEnrollment));//bug alert: loc dropdown match enrollment on 2nd time
    })
}

export const AddEnrollmentTarget = (data) => (dispatch) => {
    dispatch(actions.AddEnrollmentTarget(data));
};

export const DeleteEnrollmentTarget = (data,id) => (dispatch, getstate) => {
    const newState = getstate().createProj.enrollmentTargetData;
    data.map(row => {
        newState.map(iteratedValue => {
            if (iteratedValue.id === row.id) {
                const index = newState.findIndex(value => (value.id === row.id));
                newState.splice(index, 1);
            }
        });
    });
    const deleteEnrol={deleteEnrol:newState,id:id}
    //dispatch(actions.DeleteEnrollmentTarget(newState));
    dispatch(actions.DeleteEnrollmentTarget(deleteEnrol));
};

export const UpdateEnrollmentTarget = (data) => (dispatch, getstate) => {
    const state = getstate();
    dispatch(actions.UpdateEnrollmentTarget(state.createProj.enrollmentTargetData));

};