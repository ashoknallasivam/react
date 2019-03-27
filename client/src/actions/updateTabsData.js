
const actions = {
    UpdateStudyConfig: (payload) => {
        return {
            type: 'UPDATE_STUDYCONFIG',
            payload: payload,
        };
    },
    UpdateFunctions: (payload) => {
        return {
            type: 'UPDATE_FUNCTIONS',
            payload: payload,
        };
    },
    UpdateEnrollment: (payload) => {
        return {
            type: 'UPDATE_ENROLLMENT',
            payload: payload,
        };
    },
    UpdatePages: (payload) => {
        return {
            type: 'UPDATE_PAGES',
            payload: payload,
        };
    },
    UpdateRoles: (payload) => {
        return {
            type: 'UPDATE_ROLES',
            payload: payload,
        };
    }
}

export const UpdateStudyConfig = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    let Project = state.projectList.Project[tenantId]
    let org = Project.orgsList.map((item,i)=>{
        if (data.id == item.id){
            return i;
        }
    })
    Project = {
        ...Project,
        [orgsList[org]] : data
    }

}

export const UpdateFunctions = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    let Project = state.projectList.Project[tenantId]
    let org = Project.orgsList.map((item,i)=>{
        if (data.id == item.id){
            return i;
        }
    })
    Project = {
        ...Project,
        [orgsList[org]] : data
    }

}
export const UpdateEnrollment = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    let Project = state.projectList.Project[tenantId]
    let org = Project.orgsList.map((item,i)=>{
        if (data.id == item.id){
            return i;
        }
    })
    Project = {
        ...Project,
        [orgsList[org]] : data
    }

}
export const UpdatePages = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    let Project = state.projectList.Project[tenantId]
    let org = Project.orgsList.map((item,i)=>{
        if (data.id == item.id){
            return i;
        }
    })
    Project = {
        ...Project,
        [orgsList[org]] : data
    }

}
export const UpdateRoles = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    let Project = state.projectList.Project[tenantId]
    let org = Project.orgsList.map((item,i)=>{
        if (data.id == item.id){
            return i;
        }
    })
    Project = {
        ...Project,
        [orgsList[org]] : data
    }

}