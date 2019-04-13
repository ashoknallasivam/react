import { authHeaderFinal } from '../helpers';
import { API_URL, BACKEND_URL } from '../config';
import axios from 'axios';
import { type } from 'os';
import uuid from 'uuid';

let finalToken = localStorage.getItem('finaltoken');
var config = {
	headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + finalToken }
};

const actions = {
	cloneProject: (payload) => {
		return {
			type: 'CLONE_PROJECT',
			payload: payload
		};
	},
	RemoveProject: (payload) => {
		return {
			type: 'REMOVE_PROJECT',
			payload: payload
		};
	},
	GetSingleTenantSuccess: (payload) => {
		return {
			type: 'FETCH_SINGLE_TENANT_SUCCESS',
			payload: payload
		};
	},
	GetSingleTenantError: (payload) => {
		return {
			type: 'FETCH_SINGLE_TENANT_ERROR',
			payload: payload
		};
	}
};

export const fetchSingleTenant = (id) => (dispatch, getState) => {
	const state = getState();
    if(id){
	//    if(state.projectList.Projects[id])
	//    {
	//     return true
	//    }
	//    else {


	return axios
		.get(`${BACKEND_URL}/dashboard_data/${id}`, { headers: authHeaderFinal() })
		.then((response) => {
			console.log(response)

			if (response.status === 200) {
				// console.log(response)
				dispatch(actions.GetSingleTenantSuccess(response.data));
				return response;
			} else {
				return response;
			}
		})
		.catch((error) => {
            
            let response = {
                status : 111,
                statusText :   error.response   
            }
			return response ;
		});
    // }
}
};

export const publishProject = (tenantId) => (dispatch, getState) => {
	let state = getState();
	let newProject = state.projectList.Projects[tenantId];

	let saveProject = {
		id: newProject.id,
		name: newProject.name,
		orgsList: list_to_tree(newProject.orgsList),
		statusFlag: newProject.statusFlag == undefined ? '' : newProject.statusFlag,
		projectStatus: 'publish',
		userId: state.projectList.userId
	};
	return axios
		.post(`${BACKEND_URL}/publish`, saveProject, { headers: authHeaderFinal() })
		.then((response) => {
			console.log(response);
			if (response.status === 200) {
				return response;
			} else {
				// console.log(response.data)
				return response;
			}
		})
		.catch((error) => {
			return error.response;
			// dispatch(actions.GetAttractionsError({ message: error.messages }));
		});
};

// // list to tree conversion function and todo orgsList need pass
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

export const saveProject = (id) => (dispatch, getState) => {
	const state = getState();
	let saveProject = iterationCopy(state.projectList.Projects[id]);
	saveProject = {
		...saveProject,
		projectStatus: 'save'
	};
	return axios
		.post(`${BACKEND_URL}/publish`, saveProject, { headers: authHeaderFinal() })
		.then((response) => {
			if (response.status === 200) {
				return response.data.savedProjectId;
			} else {
				return true;
			}
		})
		.catch((error) => {
			// console.log(error)
			return false;
		});
};

export const cloneProject = (id) => (dispatch, getState) => {
	const state = getState();
	// console.log('clone action')
	// 1.fetch recspective project
	// 2.copy the project & 3.Create New id
	let cloneProject = iterationCopy(state.projectList.Projects[id]);
	cloneProject = {
		...cloneProject,
		id: uuid.v4(),
		name: cloneProject.name + '_Copy'
		// ProjectStatus: "save"
	};
	// 5.add new flags to all  entitites
	let orgsList = cloneProject.orgsList;
	orgsList.map((item, i) => {
		orgsList[i] = {
			...orgsList[i],
			statusFlag: 'new'
		};
		//raconfig
		for (let key in orgsList[i].raConfig) {
			orgsList[i].raConfig[key] = {
				...orgsList[i].raConfig[key],
				statusFlag: 'new'
			};
		}
		//enrollmentTargets
		for (let key in orgsList[i].enrollmentTargets) {
			orgsList[i].enrollmentTargets[key] = {
				...orgsList[i].enrollmentTargets[key],
				statusFlag: 'new'
			};
		}
		//pages
		for (let key in orgsList[i].pages) {
			orgsList[i].pages[key] = {
				...orgsList[i].pages[key],
				statusFlag: 'new'
			};
		}
		//roles
		for (let key in orgsList[i].roles) {
			orgsList[i].roles[key] = {
				...orgsList[i].roles[key],
				statusFlag: 'new'
			};
			//menu
			for (let index in orgsList[i].roles[key].menus) {
				orgsList[i].roles[key].menus[index] = {
					...orgsList[i].roles[key].menus[index],
					statusFlag: 'new'
				};
			}
			//resource
			for (let index in orgsList[i].roles[key].resources) {
				orgsList[i].roles[key].resources[index] = {
					...orgsList[i].roles[key].resources[index],
					statusFlag: 'new'
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

export const exportProject = (id) => (dispatch, getState) => {
	return axios
		.get(`${BACKEND_URL}/dashboard_data/${id}?export=true`, { headers: authHeaderFinal() })
		.then((response) => {
			if (response.status == 200) {
				const url = window.URL.createObjectURL(new Blob([ JSON.stringify(response.data) ]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${response.data.name}.json`); //or any other extension
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				return false;
			} else {
				return false;
			}
		});
};

export const importProject = (id) => (dispatch, getState) => {
	const state = getState();
	// console.log('import action')
	//     let project =  state.projectList.Projects[id];

	//       return axios.get(`${BACKEND_URL}/dashboard_data/${id}?export=true`,  { headers: authHeaderFinal() }).then(response => {
	//          if(response.status == 200){
	//              return false;
	//  }else{
	//    return false;
	//  }

	//  })
};
export const removeProject = (id) => (dispatch, getState) => {
	dispatch(actions.RemoveProject(id));
};

//deep copying objects
function iterationCopy(src) {
	let target = {};
	for (let prop in src) {
		if (src.hasOwnProperty(prop)) {
			target[prop] = src[prop];
		}
	}
	return target;
}
