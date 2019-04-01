
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

    
