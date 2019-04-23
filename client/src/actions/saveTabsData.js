
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
    let newProject = state.projectList.Projects[tenantId];
    let index = '';
    newProject.orgsList.map((item, i) => {
        if (data.stratum[0].value == item.id) {
            index = i;
        }
    })
    if (index !== '') {
        newProject.orgsList[index].raConfig = [data];
    }

    dispatch(actions.SaveEnrollment(newProject));

}

export const SaveEnrollment = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    let newProject = state.projectList.Projects[tenantId];
    let index = '';
    let enrollIndex = '';
    newProject.orgsList.map((item, i) => {
        if (data.orgId == item.id) {
            index = i;
        }
    })
    newProject.orgsList[index].enrollmentTargets.map((item, i) => {
        if (data.id == item.id) {
            enrollIndex = i;
        }
    })
    if (enrollIndex !== '') {
        newProject.orgsList[index].enrollmentTargets[enrollIndex] = data;
    }
    else {
        newProject.orgsList[index].enrollmentTargets = [...newProject.orgsList[index].enrollmentTargets, data]
    }
    dispatch(actions.SaveEnrollment(newProject));
}
export const SavePages = (tenantId, data) => (dispatch, getState) => {
	
    //console.log('IntialData:', data);
    let state = getState();
    let newProject = state.projectList.Projects[tenantId];
	//console.log('newProject:', newProject);
    let index = '';
    let pageIndex = '';
	
    newProject.orgsList.map((item, i) => {
        if (data.location == item.id) {
            index = i;
			
        }
    })
	//console.log('Index:', index);
	//console.log('PageIndex:', newProject.orgsList)
	//console.log('dataId:',data._id)
    newProject.orgsList[index].pages.map((item, i) => {
        //console.log('ItemId:',item._id)
        if (data._id === undefined) {
            console.log('it is undefined')
            
        }else if(data._id == item._id) {
            pageIndex = i;
        }
    })
	//console.log('PageIndex:', pageIndex);
    if (pageIndex !== '') {
        //console.log('in Edit')
        //console.log('EditData:', data);
        newProject.orgsList[index].pages[pageIndex] = data;
		
    }
    else {
        //console.log('in new')
		//console.log('AddData:', data);
        newProject.orgsList[index].pages = [...newProject.orgsList[index].pages, data]
		
    }
   
    dispatch(actions.SaveEnrollment(newProject));


}
export const SaveRoles = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    let newProject = state.projectList.Projects[tenantId];
    let index = '';
    let roleIndex = '';
    newProject.orgsList.map((item, i) => {
        if (data.orgId == item.id) {
            index = i;
        }
    })
    newProject.orgsList[index].roles.map((item, i) => {
        if (data.id == item.id) {
            roleIndex = i;
        }
    })
    if (roleIndex !== '') {
        newProject.orgsList[index].roles[roleIndex] = data;
    }
    else {
        newProject.orgsList[index].roles = [...newProject.orgsList[index].roles, data]
    }

    dispatch(actions.SaveEnrollment(newProject));


}
export const SaveTenant = (tenantId, data) => (dispatch, getState) => {
    // let state = getState();

    // console.log(tenantId, data)
    // let newProject = state.projectList.Projects;
    // let proData = newProject[parseInt(tenantId)];
    // if (newProject[tenantId]) {

    //     newProject[tenantId] = {
    //         ...proData,
    //         ...data
    //     }
    //     console.log(newProject)
    // } else {
    //     newProject = {
    //         ...data
    //     }
    // }

    let state = getState();
    let Projects = state.projectList.Projects;
    let index = '';
    Object.keys(Projects).map((item, i) => {
        if (data.id == item) {
            index = data.id;
        }
    })
    if (index !== '') {
        let newProject = Projects[index];
        newProject = {
            ...newProject,
            ...data
        }
        dispatch(actions.SaveTenant(newProject));
    }
    else {
        dispatch(actions.SaveTenant(data));
    }

}

export const SaveOrganization = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    let newProject = state.projectList.Projects[tenantId];
    let index = '';
    newProject.orgsList.map((item, i) => {
        if (item.id == data.id) {
            index = i;
        }
    })
    let neworgsList = newProject.orgsList;
    if(index !== ''){
        newProject.orgs= {
            ...newProject.orgs,
            [data.id] : {...data} }
      
    }else{
        newProject.orgs= {...newProject.orgs, [data.id] : data}
        newProject.orgsList = [...newProject.orgsList, data]
    }
    dispatch(actions.SaveOrganization(newProject));
}

export const SaveLocation = (tenantId, data) => (dispatch, getState) => {
    let state = getState();
    let index = '';
    let newProject = state.projectList.Projects[tenantId]
    newProject.orgsList.map((item, i) => {
        if (item.id == data.id) {
            index = i;
        }
    })

    if (newProject.orgsList[index]) {
        let editloc = newProject.orgsList
        editloc[index] = {
            ...editloc[index],
            ...data
        }
        newProject = {
            ...newProject,
        }
    } else {
        newProject = {
            ...newProject,
            orgsList: [...newProject.orgsList, data]
        }
    }


    dispatch(actions.SaveLocation(newProject));

}


export const SaveFunctions = (tenantId,id, data) => (dispatch, getState) => {
    let state = getState();
    let newProject = state.projectList.Projects[tenantId];
    let functionsData = {
        tenantId : tenantId,
        ttoId :  id,
        functionsList:data
    };
    newProject.orgs[id].functions= functionsData
    newProject.orgsList.map((data, index)=>{
        if(data.id == id){
            data.functions= functionsData
        }
    } )
    dispatch(actions.SaveEnrollment(newProject));
}




    
