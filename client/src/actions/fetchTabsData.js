
import { API_URL, BACKEND_URL } from '../config';
import { authHeaderFinal } from '../helpers';

import axios from 'axios';
import { debug } from 'util';
import objectUtil from '../utils/objectUtil';


let finalToken = localStorage.getItem('finaltoken');
var config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
};



    
export const fetchMenuList = () => (dispatch, getState) => {
        return axios.get(`${BACKEND_URL}/menu`, { headers: authHeaderFinal() }).then(response => {
                return  (response.data)
        }).catch(error=>{
            // console.log(error)
        })
    
}

      
export const fetchResourceList = () => (dispatch, getState) => {
   
   return  axios.get(`${BACKEND_URL}/resource`, { headers: authHeaderFinal() }).then(response => {
        if(response.status === 200){
            return  (response.data)
            }
         
    }).catch(error=>{
        // console.log(error)
    })
}


