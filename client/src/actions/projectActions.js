import { authHeaderFinal } from "../helpers";
import { API_URL, BACKEND_URL } from "../config";
import axios from "axios";
import { type } from "os";
import uuid from "uuid";

let finalToken = localStorage.getItem("finaltoken");
var config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + finalToken
  }
};

const actions = {
  cloneProject: payload => {
    return {
      type: "CLONE_PROJECT",
      payload: payload
    };
  },
  RemoveProject: payload => {
    return {
      type: "REMOVE_PROJECT",
      payload: payload
    };
  },
  GetSingleTenantSuccess: payload => {
    return {
      type: "FETCH_SINGLE_TENANT_SUCCESS",
      payload: payload
    };
  },
  GetSingleTenantError: payload => {
    return {
      type: "FETCH_SINGLE_TENANT_ERROR",
      payload: payload
    };
  },
  PublishProjectError: payload => {
    return {
      type: "PUBLISH_PROJECT_ERROR",
      payload: payload
    };
  },
  DeleteSavedProjectError: payload => {
    return {
      type: "DELETE_SAVED_PROJECT_ERROR",
      payload: payload
    };
  },
  SaveProjectError: payload =>{
    return {
      type: "DELETE_SAVED_PROJECT_ERROR",
      payload: payload
    };
  }

};

export const fetchSingleTenant = id => (dispatch, getState) => {
  const state = getState();
  if (id != "") {
    // Check if data is in store
    if (
      state.projectList.Projects[id] != undefined &&
      state.projectList.Projects[id].isFetched != undefined
    ) {
      if (state.projectList.Projects[id].isFetched == true) {
        let response = {
          status: 200
        };
        return Promise.resolve(response);
      }
    }
    // If the data is not in the store call api to fetch the data
    else {
      return axios
        .get(`${BACKEND_URL}/dashboard_data/${id}`, {
          headers: authHeaderFinal()
        })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            let newData = {
              ...response.data,
              isFetched: true
            };
            dispatch(actions.GetSingleTenantSuccess(newData));
            return response;
          } else {
            return response;
          }
        })
        .catch(error => {
            dispatch(actions.GetSingleTenantError(error));
            return Promise.resolve( error.response);
        });
    }
  }
};

export const publishProject = tenantId => (dispatch, getState) => {
  let state = getState();
  let newProject = state.projectList.Projects[tenantId];
  //Creating structure of data to be stored
  let saveProject = {
    id: newProject.id,
    name: newProject.name,
    orgsList: list_to_tree(newProject.orgsList),
    statusFlag: newProject.statusFlag == undefined ? "" : newProject.statusFlag,
    projectStatus: "publish",
    // isFetched : false,
    userId: state.projectList.userId
  };
  // calling api to publish the porject
  return axios
    .post(`${BACKEND_URL}/publish`, saveProject, { headers: authHeaderFinal() })
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        return response;
      }
    })
    .catch(error => {
     dispatch(actions.PublishProjectError(error))
     return error.response;
    });
};

// list to tree conversion function and todo orgsList need pass
function list_to_tree(list) {
  var map = {},
    node,
    roots = [],
    i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

export const saveProject = id => (dispatch, getState) => {
  const state = getState();
  let saveProject = iterationCopy(state.projectList.Projects[id]);
  //creating the structure for saving the project
  saveProject = {
    ...saveProject,
    projectStatus: "save"
  };

  //calling api to save the project
  return axios
    .post(`${BACKEND_URL}/publish`, saveProject, { headers: authHeaderFinal() })
    .then(response => {
      if (response.status === 200) {
        return response.data.savedProjectId;
      } else {
        return true;
      }
    })
    .catch(error =>{
      console.log(error)
      return error.message
		// dispatch(actions.SaveProjectError(error.message));
	})
};

export const cloneProject = id => (dispatch, getState) => {
  const state = getState();
  // console.log('clone action')
  // 1.fetch recspective project
  // 2.copy the project & 3.Create New id
  let cloneProject = iterationCopy(state.projectList.Projects[id]);
  cloneProject = {
    ...cloneProject,
    id: uuid.v4(),
    name: cloneProject.name + "_Copy",
    statusFlag : "new"
    // ProjectStatus: "save"
  };
  // 5.add new flags to all  entitites
  let orgsList = cloneProject.orgsList;
  orgsList.map((item, i) => {
    orgsList[i] = {
      ...orgsList[i],
      statusFlag: "new"
    };
    //raconfig
    for (let key in orgsList[i].raConfig) {
      orgsList[i].raConfig[key] = {
        ...orgsList[i].raConfig[key],
        statusFlag: "new"
      };
    }
    //enrollmentTargets
    for (let key in orgsList[i].enrollmentTargets) {
      orgsList[i].enrollmentTargets[key] = {
        ...orgsList[i].enrollmentTargets[key],
        statusFlag: "new"
      };
    }
    //pages
    for (let key in orgsList[i].pages) {
      orgsList[i].pages[key] = {
        ...orgsList[i].pages[key],
        statusFlag: "new"
      };
    }
    //roles
    for (let key in orgsList[i].roles) {
      orgsList[i].roles[key] = {
        ...orgsList[i].roles[key],
        statusFlag: "new"
      };
      //menu
      for (let index in orgsList[i].roles[key].menus) {
        orgsList[i].roles[key].menus[index] = {
          ...orgsList[i].roles[key].menus[index],
          statusFlag: "new"
        };
      }
      //resource
      for (let index in orgsList[i].roles[key].resources) {
        orgsList[i].roles[key].resources[index] = {
          ...orgsList[i].roles[key].resources[index],
          statusFlag: "new"
        };
      }
    }
  });

  // console.log(cloneProject)
  // 6.dispatch action to add it to store
  dispatch(actions.cloneProject(cloneProject));
  // 7.return the new id to the calling component
  return cloneProject.id;
};

export const exportProject = id => (dispatch, getState) => {
  return axios
    .get(`${BACKEND_URL}/dashboard_data/${id}?export=true`, {
      headers: authHeaderFinal()
    })
    .then(response => {
      if (response.status == 200) {
        let exprtProj = {
          ...response.data,
          statusFlag: "new"
        }

        const url = window.URL.createObjectURL(
          new Blob([JSON.stringify(exprtProj)])
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${response.data.name}.json`); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return false;
      } else {
        return false;
      }
	})
	.catch(error =>{
		dispatch(actions.ExportProjectError(error.message));
	});
};

export const importProject = id => (dispatch, getState) => {
  const state = getState();
};

export const removeProject = id => (dispatch, getState) => {
  dispatch(actions.RemoveProject(id));
};


export const deleteSavedProject = id => (dispatch, getState) => {
  // console.log(id)
  if(id) {
  return axios
    .delete(`${BACKEND_URL}/saveProject/${id}`)
    .then(response => {
      // console.log(response)
      if (response.status == 200) {
        return response;
      } else {
        // console.log(response)
        return response;
      }
    })
    .catch(error => {
      // console.log(response)
     dispatch(actions.DeleteSavedProjectError(error))
     return error.response;
    });
  }
};


export const fetchSingleSavedTenant = id => (dispatch, getState) => {
    if(id) {
    return axios
      .get(`${BACKEND_URL}/saveProject/${id}`)
      .then(response => {
        // console.log(response)
        if (response.status == 200) {
          dispatch(actions.GetSingleTenantSuccess(response.data))
          return response;
        } else {
          // console.log(response)
          return response;
        }
      })
      .catch(error => {
        // console.log(response)
       return error.response;
      });
    }
  };


//deep copying objects
function iterationCopy(src) {
  var target = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
  }
  return target;
}
