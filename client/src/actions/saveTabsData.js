
const actions = {
    SaveStudyConfig: (payload) => {
        return {
            type: 'SAVE_STUDYCONFIG',
            payload: payload,
        };
    },
    SaveFunctions: (payload) => {
        return {
            type: 'SAVE_FUNCTIONS',
            payload: payload,
        };
    },
    SaveEnrollment: (payload) => {
        return {
            type: 'SAVE_ENROLLMENT',
            payload: payload,
        };
    },
    SavePages: (payload) => {
        return {
            type: 'SAVE_PAGES',
            payload: payload,
        };
    },
    SaveRoles: (payload) => {
        return {
            type: 'SAVE_ROLES',
            payload: payload,
        };
    }
}

export const SaveStudyConfig = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    console.log(tenantId , data)
 
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

     console.log(Project)

}

export const SaveFunctions = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    // let Project = state.projectList.Project[tenantId]
    // let org = Project.orgsList.map((item,i)=>{
    //     if (data.id == item.id){
    //         return i;
    //     }
    // })
    // Project = {
    //     ...Project,
    //     [orgsList[org]] : data
    // }
    console.log(tenantId , data)


}
export const SaveEnrollment = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    // let Project = state.projectList.Project[tenantId]
    // let org = Project.orgsList.map((item,i)=>{
    //     if (data.id == item.id){
    //         return i;
    //     }
    // })
    // Project = {
    //     ...Project,
    //     [orgsList[org]] : data
    // }
    console.log(tenantId , data)


}
export const SavePages = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    // let Project = state.projectList.Project[tenantId]
    // let org = Project.orgsList.map((item,i)=>{
    //     if (data.id == item.id){
    //         return i;
    //     }
    // })
    // Project = {
    //     ...Project,
    //     [orgsList[org]] : data
    // }
    console.log(tenantId , data)


}
export const SaveRoles = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    // let Project = state.projectList.Project[tenantId]
    // let org = Project.orgsList.map((item,i)=>{
    //     if (data.id == item.id){
    //         return i;
    //     }
    // })
    // Project = {
    //     ...Project,
    //     [orgsList[org]] : data
    // }
    console.log(tenantId , data)


}