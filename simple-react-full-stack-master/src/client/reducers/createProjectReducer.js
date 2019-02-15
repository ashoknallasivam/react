import { ProfileActionTypes } from '../constants/actionTypes';
const intialData = {
    studyConfigList: [],
    enrollmentTargetData: []
}
export const createProjectReducer = (state = intialData, action) => {
    const { type, data } = action;
    console.log(data);
    switch (type) {
        case ProfileActionTypes.studyConfig.GET_STUDY_CONFIG:
            state = {
                ...state,
                studyConfigData: data
            };
            return state;
        case ProfileActionTypes.studyConfig.ADD_STUDY_CONFIG_GROUPS:
            state = {
                ...state,
                studyConfigList: data 
            };
            return state;
        case ProfileActionTypes.studyConfig.ADD_STUDY_CONFIG:
            state = {
                ...state,
                studyConfigList: [
                    ...state.studyConfigList, data
                ] 
            };       
            return state;
        case ProfileActionTypes.studyConfig.ADD_FINAL_STUDY_CONFIG:
            state = {
                ...state,     
                studyConfigList: data
            };
            return state;
        case ProfileActionTypes.studyConfig.DELETE_STUDY_CONFIG:
            state = {
                ...state,
                studyConfigList: data
            };
            return state;
        case ProfileActionTypes.studyConfig.UPDATE_STUDY_CONFIG:
            state = {
                ...state,
                studyConfigList: data
            };
            return state;
        case ProfileActionTypes.enrollmentTarget.GET_ENROLLMENT_TARGET:
            state = {
                ...state,
                enrollmentTargetData: data
            };
            return state;
        case ProfileActionTypes.enrollmentTarget.ADD_ENROLLMENT_TARGET:
            state = {
                ...state,
                enrollmentTargetData: [
                    ...state.enrollmentTargetData,
                    data
                ]
            };
            return state;
        case ProfileActionTypes.enrollmentTarget.DELETE_ENROLLMENT_TARGET:
            state = {
                ...state,
                enrollmentTargetData:
                    data
            };
            return state;
        case ProfileActionTypes.enrollmentTarget.UPDATE_ENROLLMENT_TARGET:
            state = {
                ...state,
                enrollmentTargetData: data
            };
            return state;
        case ProfileActionTypes.enrollmentTarget.FETCH_ENROLLMENT_TARGET:
        state = {
            ...state,
            enrollmentTargetList:[...data]
        };
        return state;
        case ProfileActionTypes.common.SAVE_PUBLISH_ACTION:
            state = {
                // ...state,
                // studyConfigData: {
                //     ...state.studyConfigData,
                //     groups:data 
                // }
            };
            return state;
        default:
            return state;
    }
};
