import { debug } from "util";

const initialState = {
    Projects:[],
    error:[]
}
const store = (state = initialState , action ) =>{
    switch(action.type){
        case 'STUDY_CONFIG_SUCCESS':
        state = {
            ...state,
            Projects:action.payload     
        };
        return state;

        case 'STUDY_CONFIG_ERROR':
        state = {
            ...state,
            error: action.payload
        };
        return state;

        case 'FETCH_ALL_TENANTS_SUCCESS':
        state = {
            ...state,
            Projects: action.payload
        };
        return state;

        case 'FETCH_ALL_TENANTS_ERROR':
        state = {
            ...state,
            error:action.payload
        };
        return state;

        case 'FETCH_SINGLE_TENANT_SUCCESS':
        state = {...state,
            Projects:{
                ...state.Projects,
                [action.payload.id] :action.payload
            }  
         }
        return state;

        case 'FETCH_SINGLE_TENANT_ERROR':
        state = {
            ...state,
            error: action.payload
        };
        return state;
        
        case 'SAVE_STUDYCONFIG':
        state = {
            ...state,
            error: action.payload
        };
        return state;

        case 'SAVE_FUNCTIONS':
        state = {
            ...state,
            error: action.payload
        };
        return state;

        case 'SAVE_ENROLLMENT':
        state = {
            ...state,
            error: action.payload
        };
        return state;

        case 'SAVE_PAGES':
        state = {
            ...state,
            error: action.payload
        };
        return state;
        
        case 'SAVE_ROLES':
        state = {
            ...state,
            error: action.payload
        };
        return state;
        
        
        default:
        return state;
    }
}

export default store;