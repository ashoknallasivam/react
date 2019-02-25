import axios from 'axios';
import { ProfileActionTypes } from '../constants/actionTypes';
import { API_URL, BACKEND_URL } from '../config';
const UPADTE_TENANT = 'UPADTE_TENANT';
const UPADTE_ORGANISATION = 'UPADTE_ORGANISATION';
const UPADTE_TL_ORG ='UPADTE_TL_ORG';
const UPADTE_LL_ORG ='UPADTE_LL_ORG';
const UPADTE_LOCATION = 'UPADTE_LOCATION';
const SELECTED_DROPDOWN_ORG = 'SELECTED_DROPDOWN_ORG';
const SELECTED_DROPDOWN_LOC = 'SELECTED_DROPDOWN_LOC';
const ADD_ROLE_DETAILS = 'ADD_ROLE_DETAILS';
const ADD_MENU_DETAILS = 'ADD_MENU_DETAILS';
const ADD_RESOURCE_DETAILS = 'ADD_RESOURCE_DETAILS';
const UPDATE_ROLE_DETAILS = 'UPDATE_ROLE_DETAILS';
const DELETE_ROLE_DETAILS = 'DELETE_ROLE_DETAILS';
const FETCH_MENUS = 'FETCH_MENUS';
const FETCH_ROLES = 'FETCH_ROLES';
const FETCH_RESOURCE = 'FETCH_RESOURCE';
const DELETE_ORG_DETAILS = 'DELETE_ORG_DETAILS';
const DELETE_LOC_DETAILS = 'DELETE_LOC_DETAILS';
const FETCH_MENU_ROLE_ACCESS = 'FETCH_MENU_ROLE_ACCESS';
const FETCH_RESOURCE_ROLE_ACCESS = 'FETCH_RESOURCE_ROLE_ACCESS';
const FETCH_COPY_MENU_ROLE_ACCESS = 'FETCH_COPY_MENU_ROLE_ACCESS';
const FETCH_COPY_RESOURCE_ROLE_ACCESS = 'FETCH_COPY_RESOURCE_ROLE_ACCESS';
const CHANGE_MODE = 'CHANGE_MODE';

let finalToken = localStorage.getItem('finaltoken');
var config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
};

const actions = {
    UpdateTenant: (payload) => ({
        type: UPADTE_TENANT,
        data: payload
    }),
    UpdateOrganization: (payload) => ({
        type: UPADTE_ORGANISATION,
        data: payload
    }),
    UpdateTlOrg: (payload) => ({
        type: UPADTE_TL_ORG,
        data: payload
    }),
    UpdateLlOrg: (payload) => ({
        type: UPADTE_LL_ORG,
        data: payload
    }),
    UpdateLocation: (payload) => ({
        type: UPADTE_LOCATION,
        data: payload
    }),
    FetchRoles: (payload) => ({
        type: FETCH_ROLES,
        data: payload
    }),
    SelectedDropdownOrg: (payload) =>({
        type: SELECTED_DROPDOWN_ORG,
        data: payload
    }),
    SelectedDropdownLoc: (payload) => ({
        type: SELECTED_DROPDOWN_LOC,
        data: payload
    }),
    FetchMenus: (payload) => ({
        type: FETCH_MENUS,
        data: payload
    }),
    FetchResource: (payload) => ({
        type: FETCH_RESOURCE,
        data: payload
    }),
    ChangeMode: (payload) => ({
        type: CHANGE_MODE,
        data: payload
    }),
     AddRoleDetails: (payload) => ({
        type: ADD_ROLE_DETAILS,
        data: payload
    }),
    AddMenuDetails: (payload) => ({
        type: ADD_MENU_DETAILS,
        data: payload
    }),
    AddResourceDetails: (payload) => ({
        type: ADD_RESOURCE_DETAILS,
        data: payload
    }),
    UpdateRoleDetails: (payload) => ({
        type: UPDATE_ROLE_DETAILS,
        data: payload
    }),
    DeleteRoleDetails: (payload) => ({
        type: DELETE_ROLE_DETAILS,
        data: payload
    }),
    DeleteOrgDetails: (payload) => ({
        type: DELETE_ORG_DETAILS,
        data: payload
    }),
    DeleteLocDetails: (payload) => ({
        type: DELETE_LOC_DETAILS,
        data: payload
    }),
    FetchMenuRoleAccess: (payload) => ({
        type: FETCH_MENU_ROLE_ACCESS,
        data: payload
    }),
    FetchResourceRoleAccess: (payload) => ({
        type: FETCH_RESOURCE_ROLE_ACCESS,
        data: payload
    }),
    FetchFunctions: (payload) => ({
        type: ProfileActionTypes.functions.FETCH_FUNCTIONS,
        data: payload
    }),
    FetchCopyMenuRoleAccess: (payload) => ({
        type: FETCH_COPY_MENU_ROLE_ACCESS,
        data: payload
    }),
    FetchCopyResourceRoleAccess: (payload) => ({
        type: FETCH_COPY_RESOURCE_ROLE_ACCESS,
	data: payload
    }),
    FetchFunctions: (payload) => ({
        type: ProfileActionTypes.functions.FETCH_FUNCTIONS,
        data: payload
    })
};

export const ChangeMode = (data) => (dispatch) => {
    dispatch(actions.ChangeMode(data));
};

export const UpdateTenant = (data) => (dispatch) => {
    dispatch(actions.UpdateTenant(data));
};

export const UpdateOrganization = (data) => (dispatch) => {
    dispatch(actions.UpdateOrganization(data));
};
export const SelectedDropdownOrg = (ttoId, flag) => (dispatch, getState) => {
    const { projectInfo, projectFormReducer, ApplicationMode } = getState();
    if(ApplicationMode == "VIEW"){
        let locList = projectInfo[0].lowerLevelOrg.filter(item => item.parentId == ttoId);
        dispatch(actions.SelectedDropdownOrg({locList: [...locList], currentTtoSelection: ttoId, flag: flag}));
    }else{
        let locList = projectFormReducer.locations.filter(item => item.parentID == ttoId);//change applicationMode in brand
        dispatch(actions.SelectedDropdownOrg({locList: [...locList], currentTtoSelection: ttoId, flag: flag}));
    }
}
export const SelectedDropdownLoc = (ltoId, flag) => (dispatch, getState) => {
    const { projectInfo, projectFormReducer, ApplicationMode } = getState();
    if(ApplicationMode == "VIEW"){
        dispatch(actions.SelectedDropdownLoc({currentLtoSelection: ltoId, flag: flag}));//start from here
    }else{
        let rolList = projectFormReducer.roles.filter(item => item == ltoId);
        dispatch(actions.SelectedDropdownLoc({rolList: [...rolList], currentLtoSelection: ltoId, flag: flag}));
    }
};

export const UpdateLocation = (data) => (dispatch) => {
    dispatch(actions.UpdateLocation(data));
};
let formatRoleData = (role) => {
    let roleBody = {};
    roleBody.id = role.id;
    roleBody.name = role.name;
    roleBody.description = role.description;
    roleBody.orgId = role.orgId;
    roleBody.isAssignable = role.isAssignable.data[0];
    roleBody.isAutoAccess = role.isAutoAccess.data[0];
    roleBody.isAutoAssignOnIntake = role.isAutoAssignOnIntake.data[0];
    return roleBody;
}
export const FetchRoles = () => (dispatch) => {    
    axios.get(`${BACKEND_URL}/role`, {mode: 'cors'}, config)
    .then(function (response) {
        let allUnformattedRoles = response.data;
        let formattedRoleData = allUnformattedRoles.map(item => formatRoleData(item));
        console.log(formattedRoleData);
        dispatch(actions.FetchRoles(formattedRoleData));
    })
    .catch(function (error) {
        console.log(error);
    });
};

export const AddRoleDetails = (data) => (dispatch) => {
    dispatch(actions.AddRoleDetails(data));
};

export const AddMenuDetails = (data) => (dispatch) => {
    dispatch(actions.AddMenuDetails(data));
};

export const AddResourceDetails = (data) => (dispatch) => {
    dispatch(actions.AddResourceDetails(data));
}
export const UpdateTlOrg = (dataTlOrg,updatedNewTlOrgData) => (dispatch,getState) => {
    const state = getState();
    const updatedTlOrg = state.projectFormReducer.organizations.map((iteratedValue)=>{
        if(iteratedValue.id == dataTlOrg){
            return iteratedValue = {...iteratedValue,name:updatedNewTlOrgData,flag: iteratedValue.flag === "createFlag" ? iteratedValue.flag: "UpdateFlag"};
        }else{
            return iteratedValue;
        }
    });
    dispatch(actions.UpdateTlOrg(updatedTlOrg));
};
export const UpdateLlOrg = (dataLlOrg,updatedNewLlOrgData) => (dispatch,getState) => {
    const state = getState();
    const updatedLlOrg = state.projectFormReducer.locations.map((iteratedValue)=>{
        if(iteratedValue.id == dataLlOrg){
            return iteratedValue ={...iteratedValue,name:updatedNewLlOrgData, flag:iteratedValue.flag === "createFlag" ? iteratedValue.flag: "UpdateFlag"};
        }else{
            return iteratedValue;
        }
    });
    dispatch(actions.UpdateLlOrg(updatedLlOrg));
};
export const UpdateRoleDetails = (dataroles,updatedNewRoleData,updatedNewMenuData,updatedNewResourceData, updatedOrgId, flag) => (dispatch,getState) => {
    const state = getState();
    const updatedRoles = state.projectFormReducer.roleDetails.map((iteratedValue)=>{
        if(iteratedValue.id == dataroles.id){
            const role = {
                "id": dataroles.id,
                "name": updatedNewRoleData.roleName?updatedNewRoleData.roleName:iteratedValue.name,
                "description": updatedNewRoleData.roleDescription?updatedNewRoleData.roleDescription:iteratedValue.description,
                "orgId": updatedOrgId,
                "isAssignable": updatedNewRoleData.isAssignable||updatedNewRoleData.isAssignable==0?updatedNewRoleData.isAssignable:iteratedValue.isAssignable,
                "isAutoAccess": updatedNewRoleData.isAutoAccess||updatedNewRoleData.isAutoAccess==0?updatedNewRoleData.isAutoAccess:iteratedValue.isAutoAccess,
                "isAutoAssignOnIntake": updatedNewRoleData.isAutoAssignOnIntake||updatedNewRoleData.isAutoAssignOnIntake==0?updatedNewRoleData.isAutoAssignOnIntake:iteratedValue.isAutoAssignOnIntake,
                "flag": flag
            }

            return iteratedValue = role;
        }else{
            return iteratedValue;
        }
        
    });
    const updatedMenuRoles = state.projectFormReducer.menuDetails.map((iteratedValue)=>{
        if(iteratedValue.roleId == dataroles.id){
            const MenuUpdated = {...iteratedValue.menuId, ...updatedNewMenuData};
            iteratedValue.menuId  = MenuUpdated;
            return  iteratedValue;  
        }else{
            return iteratedValue;
        }
        
    });
    const updatedResourceRoles = state.projectFormReducer.resourceDetails.map((iteratedValue)=>{
        if(iteratedValue.roleId == dataroles.id){
            const ResourceUpdated = {...iteratedValue.resourceId, ...updatedNewResourceData};
            iteratedValue.resourceId  = ResourceUpdated;
            return iteratedValue
        }else{
            return iteratedValue;
        }
        
    });
    
    const data= {
        updatedRoles:updatedRoles,
        updatedMenuRoles:updatedMenuRoles,
        updatedResourceRoles:updatedResourceRoles
    }
    dispatch(actions.UpdateRoleDetails(data));
};

export const DeleteRoleDetails = (dataroles) => (dispatch,getState) => {
    const state = getState();
    const deleteRoles = state.projectFormReducer.roleDetails.filter((iteratedValue)=>{
        return iteratedValue.id !== dataroles.id;
        
    });
    const deleteMenuRoles = state.projectFormReducer.menuDetails.filter((iteratedValue)=>{
        return iteratedValue.roleId !== dataroles.id;
        
    });
    const deleteResourceRoles = state.projectFormReducer.resourceDetails.filter((iteratedValue)=>{
        return iteratedValue.roleId !== dataroles.id;
        
    });

    const data= {
        deleteRoles:deleteRoles,
        deleteMenuRoles:deleteMenuRoles,
        deleteResourceRoles:deleteResourceRoles,
        id:dataroles.id
    }
    dispatch(actions.DeleteRoleDetails(data));
};

export const DeleteOrgDetails = (data) => (dispatch,getState) => {
    const state = getState();
    const deleteOrg = state.projectFormReducer.organizations.filter((iteratedValue)=>{
        return iteratedValue.id != data;  
    });
    const orgDelete={deleteOrg:deleteOrg,id:data}
    dispatch(actions.DeleteOrgDetails(orgDelete));
}

export const DeleteLocDetails = (data) => (dispatch,getState) => {
    const state = getState();
    const deleteLoc = state.projectFormReducer.locations.filter((iteratedValue)=>{
        return iteratedValue.id != data;  
    });
    const locDelete={deleteLoc:deleteLoc,id:data}
    dispatch(actions.DeleteLocDetails(locDelete));
}

export const FetchMenus = (data) => (dispatch) => {    

    axios.get(`${BACKEND_URL}/menu`, {mode: 'cors'}, config)
    .then(function (response) {
        dispatch(actions.FetchMenus(response.data));
    })
        .catch((error) => { console.log(error) });
};


export const FetchResource = (data) => (dispatch) => {    
    axios.get(`${BACKEND_URL}/resource`, {mode: 'cors'}, config)
    .then(function (response) {
        dispatch(actions.FetchResource(response.data));
    })
        .catch((error) => { console.log(error) });
};

let createBounds = (tenantId, ttoId, ltoId) => {
    let boundsBody = {};
    boundsBody.tenantId = tenantId;
    ltoId !== '' ? boundsBody.ltoId = ltoId : null;
    boundsBody.ttoId = ttoId;
    return boundsBody;
}

export const FetchMenuRoleAccess = () => (dispatch,getState) => {
    const { projectInfo, TtoReducers, LtoReducers } = getState();
    let boundsBody = createBounds(projectInfo[0].id, TtoReducers.currentTtoSelection, LtoReducers.currentLtoSelection);
    axios.post(`${BACKEND_URL}/menu-role-access`, boundsBody,{mode: 'cors'}, config).then((response) => {
        //this response will have all the roles and its subsiquent 
        //menu id combination for the selected tenant, tto, lto
        dispatch(actions.FetchMenuRoleAccess(response.data));
    }).catch(function (error) {
        console.log(error);
    })
};

export const FetchResourceRoleAccess = () => (dispatch,getState) => {
    const { projectInfo, TtoReducers, LtoReducers } = getState();
    let boundsBody = createBounds(projectInfo[0].id, TtoReducers.currentTtoSelection, LtoReducers.currentLtoSelection);
    axios.post(`${BACKEND_URL}/resource-role-access`, boundsBody,{mode: 'cors'}, config).then((response) => {
        //this response will have all the roles and its subsiquent 
        //resource id combination for the selected tenant, tto, lto
        dispatch(actions.FetchResourceRoleAccess(response.data));
    }).catch(function (error) {
        console.log(error);
    })
};


export const FetchCopyMenuRoleAccess = (tenantId, orgId, locId) => (dispatch) => {
    
    let boundsBody = createBounds(tenantId, orgId, locId);
    axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = {headers: config.headers};
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
        axios.get(`${API_URL}/api/v1/menu-role-access/`, newConfig)
            .then(function (response) {
                //this response will have all the roles and its subsiquent 
                //menu id combination for the selected tenant, tto, lto
                dispatch(actions.FetchCopyMenuRoleAccess(response.data));
            })
            
            .catch(function (error) {
                console.log(error);
            });
    })
};

export const FetchCopyResourceRoleAccess = (tenantId, orgId, locId) => (dispatch) => {
    let boundsBody = createBounds(tenantId, orgId, locId);
    axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = {headers: config.headers};
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
        axios.get(`${API_URL}/api/v1/resource-role-access/`, newConfig)
            .then(function (response) {
                //this response will have all the roles and its subsiquent 
                //menu id combination for the selected tenant, tto, lto
                dispatch(actions.FetchCopyResourceRoleAccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    })
};

export const FetchFunctions = (data) => (dispatch) => {  
    axios.get('http://localhost:3000/functions', config)
    .then(function (response) {
        dispatch(actions.FetchFunctions(response.data));
    })
        .catch((error) => { console.log(error) });
}; //checkout json provided by vidya

