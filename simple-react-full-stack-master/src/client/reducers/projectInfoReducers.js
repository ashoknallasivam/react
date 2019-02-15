

var retrievedObject = localStorage.getItem('testObject');
const parsedJSON = JSON.parse(retrievedObject);
const initialTtoReducers = {
    locList: [],
    currentTtoSelection: '',
}
const initialLtoReducers = {
    currentLtoSelection: ''
}
const initalMode = "CREATE";
const initialUserState = [];
let allOrgTemp = [];
let completeTenantList = [];
let allTenants = [];
let allRolesTemp = [];
const initialFetchedData = {
    allTenants:[],
    allOrgTemp: [],
    allRolesTemp:[]
}//use this later
function mapOrganisationToTenant(unMappedTenant, allRoles) {
    let ttoSibling = [];
    let ltoSibling = [];
    let TenantObj = {};
    allOrgTemp.map(i => {
       if(i.tenantId === unMappedTenant.id && i.level == 0){
            ttoSibling.push(i);
       } else if (i.tenantId === unMappedTenant.id && !i.level == 0) {
            ltoSibling.push(i);           
       }
    });
    TenantObj.id = unMappedTenant.id;
    TenantObj.name = unMappedTenant.name;
    TenantObj.topLevelOrg = ttoSibling;
    TenantObj.lowerLevelOrg = ltoSibling;
    TenantObj.roles = [...allRoles];
    TenantObj.selected = false;
    completeTenantList.push(TenantObj);
}
function mapRolesToOrganisation(unMappedOrg){
    console.log(allRolesTemp, unMappedOrg);
    let rolesList = [];
    allRolesTemp.map(item => {
        if (item.orgId == unMappedOrg.id){
            rolesList.push(item);
        }
    });
    console.log(rolesList);
    return rolesList;
    //let eachOrg = allOrgTemp.filter(item => item.id == unMappedOrg.id);
}
export const ApplicationMode = (state = initalMode, action) => {
    const { type, data } = action;
    console.log(data);
    switch (type) {
        case 'CHANGE_MODE':
            completeTenantList = [];
            state = data;
        default:
            return state;
    }
}
export const ProjectInfoReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'TENANT_FETCH_SUCCESS':
        console.log(action)
            completeTenantList = [];
            allOrgTemp = [...action.data.organizationResponse];
            allTenants = [...action.data.tenantResponse];
            allRolesTemp = [...action.data.roleResponse];
            console.log(allRolesTemp);
            allOrgTemp.map(x => {
                let temp = mapRolesToOrganisation(x);
                x.roles = temp;
            });
            allTenants.map(x => mapOrganisationToTenant(x, allRolesTemp));
            state = completeTenantList;
            return state;
        case 'SELECT_ORGANIZATION_DETAIL':
            console.log(action)
            let selectedProject = state.filter(item => item.id == action.data);
            selectedProject[0].selected = true;
            return selectedProject;
        default:
            return state;
    }
};

export const newProject = (state = '', action) => {
    const { type, data } = action;
    switch(type) {
        case 'NEW_PROJECT':
        state = data;
        return state;
    }
    return state;
}

export const TtoReducers = (state = initialTtoReducers, action) => {
    const { type, data } = action;
    console.log(data);
    switch (type) {
        case 'SELECTED_DROPDOWN_ORG':
            state = {...state, 
                locList: [...data.locList],
                currentTtoSelection: data.currentTtoSelection,
            };
            return state;
        case "CLEAR_ORGANIZATIONS":
        state = {
            ...state,
            locList: [],
            currentTtoSelection: '',
        };
        default:
            return state;
    }
}

export const LtoReducers = (state = initialLtoReducers, action) => {
    const { type, data } = action;
    console.log(state, data);
    switch(type) {
        case 'SELECTED_DROPDOWN_LOC':
            state = {...state,
                currentLtoSelection: data.currentLtoSelection
            };
            return state;
        case "CLEAR_ORGANIZATIONS":
        state = {
            ...state,
            currentLtoSelection: '',
        };
        default:
            return state;
    }
}