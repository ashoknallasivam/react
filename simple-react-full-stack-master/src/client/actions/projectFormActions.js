import axios from 'axios';
import { API_URL } from '../config';

const UPADTE_TENANT = 'UPADTE_TENANT';
const UPADTE_ORGANISATION = 'UPADTE_ORGANISATION';
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
const CHANGE_MODE = 'CHANGE_MODE';

let finalToken = localStorage.getItem('finaltoken');
console.log(finalToken);
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
    })
};

export const ChangeMode = (data) => (dispatch) => {
    dispatch(actions.ChangeMode(data));
};
export const UpdateTenant = (data) => (dispatch) => {
    dispatch(actions.UpdateTenant(data));
}
export const UpdateOrganization = (data) => (dispatch) => {
    dispatch(actions.UpdateOrganization(data));
};
export const SelectedDropdownOrg = (data) => (dispatch, getState) => {
    const { projectInfo, projectFormReducer, ApplicationMode } = getState();
    if(ApplicationMode == "VIEW"){
        let locList = projectInfo[0].lowerLevelOrg.filter(item => item.parentId == data);
        dispatch(actions.SelectedDropdownOrg({locList: [...locList], currentTtoSelection: data}));
    }else{
        let locList = projectFormReducer.locations.filter(item => item.parentID == data);//change applicationMode in brand
        console.log(locList);
        dispatch(actions.SelectedDropdownOrg({locList: [...locList], currentTtoSelection: data}));

    }
}
export const SelectedDropdownLoc = (data) => (dispatch, getState) => {
    const { projectInfo, projectFormReducer, ApplicationMode } = getState();
    console.log(projectInfo, data);
    if(ApplicationMode == "VIEW"){
        dispatch(actions.SelectedDropdownLoc({currentLtoSelection: data}));//start from here
    }else{
        let rolList = projectFormReducer.roles.filter(item => item == data);
        console.log(rolList, data);
        dispatch(actions.SelectedDropdownLoc({rolList: [...rolList], currentLtoSelection: data}));
    }
}
export const UpdateLocation = (data) => (dispatch) => {
    dispatch(actions.UpdateLocation(data));
};

export const FetchRoles = (data) => (dispatch) => {    
    axios.get(`${API_URL}/api/v1/role`, config)
    .then(function (response) {
        dispatch(actions.FetchRoles(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
};
export const AddRoleDetails = (data) => (dispatch) => {
    dispatch(actions.AddRoleDetails(data));
}
export const AddMenuDetails = (data) => (dispatch) => {
    dispatch(actions.AddMenuDetails(data));
}
export const AddResourceDetails = (data) => (dispatch) => {
    dispatch(actions.AddResourceDetails(data));
}
export const UpdateRoleDetails = (dataroles,updatedNewRoleData,updatedNewMenuData,updatedNewResourceData, updatedOrgId) => (dispatch,getState) => {
    const state = getState();
    const updatedRoles = state.projectFormReducer.roleDetails.map((iteratedValue)=>{
        if(iteratedValue.id == dataroles.id){
            console.log(updatedOrgId);
            const role = {
                "id": dataroles.id,
                "name": updatedNewRoleData.roleName?updatedNewRoleData.roleName:iteratedValue.name,
                "description": updatedNewRoleData.roleDescription?updatedNewRoleData.roleDescription:iteratedValue.description,
                "orgId": updatedOrgId,
                "isAssignable": updatedNewRoleData.isAssignable||updatedNewRoleData.isAssignable==0?updatedNewRoleData.isAssignable:iteratedValue.isAssignable,
                "isAutoAccess": updatedNewRoleData.isAutoAccess||updatedNewRoleData.isAutoAccess==0?updatedNewRoleData.isAutoAccess:iteratedValue.isAutoAccess,
                "isAutoAssignOnIntake": updatedNewRoleData.isAutoAssignOnIntake||updatedNewRoleData.isAutoAssignOnIntake==0?updatedNewRoleData.isAutoAssignOnIntake:iteratedValue.isAutoAssignOnIntake
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
}
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
        deleteResourceRoles:deleteResourceRoles
    }
    dispatch(actions.DeleteRoleDetails(data));
}
export const DeleteOrgDetails = (data) => (dispatch,getState) => {
    const state = getState();
    const deleteOrg = state.projectFormReducer.organizations.filter((iteratedValue)=>{
        return iteratedValue.id != data;  
    });
    
    dispatch(actions.DeleteOrgDetails(deleteOrg));
}
export const DeleteLocDetails = (data) => (dispatch,getState) => {
    debugger;
    console.log(data);
    const state = getState();
    const deleteLoc = state.projectFormReducer.locations.filter((iteratedValue)=>{
        return iteratedValue.id != data;  
    });
    console.log(state);
    dispatch(actions.DeleteLocDetails(deleteLoc));
}

export const FetchMenus = (data) => (dispatch) => {    

    axios.get(`${API_URL}/api/v1/menu/`, config)
    .then(function (response) {
        console.log(response);
        dispatch(actions.FetchMenus(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
};

export const FetchResource = (data) => (dispatch) => {    

    axios.get(`${API_URL}/api/v1/resource/`, config)
    .then(function (response) {
        console.log(response);
        dispatch(actions.FetchResource(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
};


let createBounds = (tenantId, ttoId, ltoId) => {
    let boundsBody = {};
    boundsBody.tenantId = tenantId;
    ltoId !== '' ? boundsBody.ltoId = ltoId : null;
    boundsBody.ttoId = ttoId;
    console.log(boundsBody);
    return boundsBody;
}



export const FetchMenuRoleAccess = () => (dispatch,getState) => {
    const { projectInfo, TtoReducers, LtoReducers } = getState();
    let boundsBody = createBounds(projectInfo[0].id, TtoReducers.currentTtoSelection, LtoReducers.currentLtoSelection);
    axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
        console.log(response, 'bounds for menu');
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = {headers: config.headers};
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
        axios.get(`${API_URL}/api/v1/menu-role-access/`, newConfig)
            .then(function (response) {
                console.log(response);//this response will have all the roles and its subsiquent 
                //menu id combination for the selected tenant, tto, lto
                dispatch(actions.FetchMenuRoleAccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    })
};

export const FetchResourceRoleAccess = () => (dispatch,getState) => {
    const { projectInfo, TtoReducers, LtoReducers } = getState();
    let boundsBody = createBounds(projectInfo[0].id, TtoReducers.currentTtoSelection, LtoReducers.currentLtoSelection);
    axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
        console.log(response, 'bounds for resource');
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = {headers: config.headers};
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
        axios.get(`${API_URL}/api/v1/resource-role-access/`, newConfig)
            .then(function (response) {
                console.log(response);//this response will have all the roles and its subsiquent 
                //menu id combination for the selected tenant, tto, lto
                dispatch(actions.FetchResourceRoleAccess(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    })
};

