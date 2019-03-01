import { ProfileActionTypes } from '../constants/actionTypes';
const intialData = {
    tenant: '',
    organizations: [],
    locations: [],
    menuList: [],
    resourceList: [],
    roleDetails: [],
    updateRoleDetails: [],
    menuDetails: [],
    resourceDetails: [],
    roles: [],
    menuRoleAccessDetails: [],
    resourceRoleAccessDetails: [],
    functionsList: [],
    fetchCopyMenuRoleAccess:[],
    fetchCopyResourceRoleAccess:[],
    orgDeleteIdList:[],
    locDeleteIdList:[],
    roleDeleteIdList:[],
    functionsList: []
};

const initialTtoReducers = {
    locList: [],
    rolList: []
};

export const projectFormReducer = (state = intialData, action) => {
    const { type, data } = action;
    switch (type) {
        case "UPADTE_TENANT":
            state = {
                ...state,
                tenant: data
            };
            return state;
        case "UPADTE_ORGANISATION":
            state = {
                ...state,
                organizations: [...state.organizations, data]
            };
            return state;
        case "UPADTE_LOCATION":
            state = {
                ...state,
                locations: [...state.locations, data]
            };
            return state;
        case "UPDATE_ROLES":
            state = {
                ...state,
                roles: [...state.roles.data]
            }
        case "FETCH_MENUS":
            state = {
                ...state,
                menuList: data
            };
            return state;
        case "FETCH_COPY_MENU_ROLE_ACCESS":
            state = {
                ...state,
                fetchCopyMenuRoleAccess:data
            };
            return state;
        case "FETCH_COPY_RESOURCE_ROLE_ACCESS":
            state = {
                ...state,
                fetchCopyResourceRoleAccess:data
            };
            return state;
        case "FETCH_ROLES":
            state = {
                ...state,
                roles: [...state.roles, ...data]
            }
            return state;
        case "FETCH_RESOURCE":
            state = {
                ...state,
                resourceList: data
            };
            return state;
        case "ADD_ROLE_DETAILS":
            state = {
                ...state,
                roleDetails: [...state.roleDetails, data]
            };
            return state;
        case "ADD_MENU_DETAILS":
            state = {
                ...state,
                menuDetails: [...state.menuDetails, data]//no of set of menu == no of set of roles
            };
            return state;
        case "ADD_RESOURCE_DETAILS":
            state = {
                ...state,
                resourceDetails: [...state.resourceDetails, data]
            };
            return state;
        case "UPADTE_TL_ORG":
            state = {
                ...state,

                organizations:data

            };
            return state;
        case "UPADTE_LL_ORG":
            state = {
                ...state,

               locations:data

            };
            return state;
        case "UPDATE_ROLE_DETAILS":
            state = {
                ...state,

                roleDetails: data.updatedRoles,
                menuDetails: data.updatedMenuRoles,
                resourceDetails: data.updatedResourceRoles,
                selectedCurrentTTO: data.updatedOrgId

            };
            return state;
        case "DELETE_ROLE_DETAILS":
            state = {
                ...state,
                roleDetails:data.deleteRoles,
                menuDetails:data.deleteMenuRoles,
                resourceDetails:data.deleteResourceRoles,
                roleDeleteIdList:[...state.roleDeleteIdList, data.id]
            };
            return state;
        case "DELETE_ORG_DETAILS":
            state = {
                ...state,
                organizations:data.deleteOrg, 
                orgDeleteIdList:[...state.orgDeleteIdList, data.id]
            };
            return state;
        case "DELETE_LOC_DETAILS":
            state = {
                ...state,
                locations:data.deleteLoc,
                locDeleteIdList:[...state.locDeleteIdList, data.id]
            };
            return state;
        case "FETCH_MENU_ROLE_ACCESS":
            state = {
                ...state,
                menuRoleAccessDetails: [...state.menuRoleAccessDetails, ...data]
            };
            return state;
        case "FETCH_RESOURCE_ROLE_ACCESS":
            state = {
                ...state,
                resourceRoleAccessDetails: [...state.resourceRoleAccessDetails, ...data]
            };
            return state;
        case "CLEAR_ORGANIZATIONS":
            state = {
                ...state,
                tenant: '',
                organizations: [],
                locations: [],
                roleDetails: [],
                updateRoleDetails: [],
                menuDetails: [],
                resourceDetails: [],
                roles: [],
                menuRoleAccessDetails: [],
                resourceRoleAccessDetails: []
            };
            return state;
        case ProfileActionTypes.functions.FETCH_FUNCTIONS:
            state = {
                ...state,
                functionsList: data
            };            
            return state;
        default:
            return state;
    }

}
