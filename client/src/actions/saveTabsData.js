
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
    },
    SaveTenant: (payload) => {
        return {
            type: 'SAVE_TENANT',
            payload: payload,
        };
    },
    SaveOrganization: (payload) => {
        return {
            type: 'SAVE_ORGANIZATION',
            payload: payload,
        };
    },
    SaveLocation: (payload) => {
        return {
            type: 'SAVE_LCOATION',
            payload: payload,
        };
    }
    
    
    
    
}

export const SaveStudyConfig = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    console.log(tenantId , data)
 
    // let Project = state.projectList.Project[tenantId]
    // let org = Project.orgsList.map((item,i)=>{
    //     if (data.id == item.id){
    //         return i;
    //     }
    // })

    // Project = {
    //     ...Project,
    //     [orgsList[org]] : data
    //  }

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
    // console.log('test')
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
export const SaveTenant = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    
    let newProject = state.projectList.Projects
    if(newProject[tenantId]){

        newProject[tenantId] = {
            ...data
        }
    }else{
            newProject ={
                    ...data
                     }}
        

    
    dispatch(actions.SaveTenant( newProject ));
}

export const SaveOrganization= (tenantId, data) => (dispatch, getState) => {
    let state = getState();
 
    let newProject = state.projectList.Projects[tenantId]
    // console.log(newProject)
    newProject = {
        ...newProject,
         orgs:{ ...newProject.orgs,
             [data.id]: { ...data}},
         orgsList : [...newProject.orgsList, data]
    }
    dispatch(actions.SaveTenant( newProject ));


}

export const SaveLocation = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    let newProject = state.projectList.Projects[tenantId]
    newProject = {
        ...newProject,
         orgs:{ ...newProject.orgs,
             [data.parentId]: { ...data}},
         orgsList : [...newProject.orgsList, data]
    }
    console.log(tenantId , data)
    dispatch(actions.SaveTenant( newProject ));

}