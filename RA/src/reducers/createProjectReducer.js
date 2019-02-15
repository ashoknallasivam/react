import { ProfileActionTypes } from '../constants/actionTypes';
const intialData = {
    studyConfigList: [],
    finalStudyConfigData: [],
    enrollmentTargetData: [],
    enrollmentTargetList:[],
    enrolDeleteIdList:[],
    raConfigDeleteIdList: []
}
export const createProjectReducer = (state = intialData, action) => {
    const { type, data } = action;
    switch (type) {
        case ProfileActionTypes.studyConfig.FETCH_RA_CONFIG:
            state = {
                ...state,
                finalStudyConfigData: data,
                studyConfigList: data,
                raConfigDeleteIdList: []
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
                finalStudyConfigData: state.studyConfigList
            };
            return state;
        case ProfileActionTypes.studyConfig.DELETE_STUDY_CONFIG_GROUPS:
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
        case ProfileActionTypes.studyConfig.DELETE_STUDY_CONFIG:
            state = {
                ...state,
                studyConfigList: data.finalStudyConfigData,
                finalStudyConfigData: data.finalStudyConfigData,
                raConfigDeleteIdList: [...state.raConfigDeleteIdList, data.id]
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
                // enrollmentTargetData:
                //     data,
                enrollmentTargetData:
                     data.deleteEnrol,
                    enrolDeleteIdList:[...state.enrolDeleteIdList, data.id],
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
        default:
            return state;
    }
};
