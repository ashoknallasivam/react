
import { API_URL, BACKEND_URL } from '../config';
import { authHeaderFinal } from '../helpers';

import axios from 'axios';
import { debug } from 'util';
import objectUtil from '../utils/objectUtil';


let finalToken = localStorage.getItem('finaltoken');
var config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
};

const actions = {
    GetSingleTenantSuccess: (payload) =>{
        return{
            type:"FETCH_SINGLE_TENANT_SUCCESS",
            payload : payload
        };
    },
    GetSingleTenantError: (payload) => {
        return {
            type: 'FETCH_SINGLE_TENANT_ERROR',
            payload: payload,
        };
    }
    
}


export const fetchSingleTenant = (id) => (dispatch, getState) => {
    const state = getState();
    
//    if(state.projectList.Projects[id])
//    {
//     return true   
//    }
//    else {
       return axios.get(`${BACKEND_URL}/dashboard_data/${id}`, config).then(response => {
            if(response.status === 200){
                console.log(response.data)
                 dispatch(actions.GetSingleTenantSuccess(response.data))
                 return true
                }
             
        })
    // }
}

    
export const fetchMenuList = () => (dispatch, getState) => {
   
        return axios.get(`${BACKEND_URL}/menu`, config).then(response => {
           
                return  (response.data)
             
        })
}

      
export const fetchResourceList = () => (dispatch, getState) => {
   
   return  axios.get(`${BACKEND_URL}/resource`, config).then(response => {
        if(response.status === 200){
           
            return  (response.data)
            }
         
    })
}


export const SaveProject = (tenantId) => (dispatch, getState) => {
    let state = getState(); 
    let newProject = state.projectList.Projects[tenantId];

   
    let saveProject= {
      id :newProject.id,
      name : newProject.name,
      orgsList : list_to_tree(newProject.orgsList),
      statusFlag: newProject.statusFlag
    }
    console.log(saveProject)
// function calling 
// let orgsList = list_to_tree(orgsList);// need to move separate flow
console.log('before api call')
    return  axios.post(`${BACKEND_URL}/publish`, saveProject, config).then(response => {
        console.log('api called')

        if(response.status === 200){
           console.log(response)
            return true
            }
            else{
           console.log(response)

            }
        })
    }
    

// // list to tree conversion function and todo orgsList need pass
function list_to_tree(list) {
    var map = {}, node, roots = [], i;
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
    
