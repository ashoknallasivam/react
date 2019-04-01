import { authHeaderFinal } from '../helpers';
import { API_URL, BACKEND_URL } from '../config';
import axios from 'axios';
import { type } from 'os';


let finalToken = localStorage.getItem('finaltoken');
var config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
};

const actions = {
    GetAllTenantsSuccess: (payload) => {
        return {
            type: 'FETCH_ALL_TENANTS_SUCCESS',
            payload: payload,
        };
    },
    GetAllTenantsError: (payload) => {
        return {
            type: 'FETCH_ALL_TENANTS_ERROR',
            payload: payload,
        };
    }
   

}

export const fetchAllTenants = () => (dispatch, getState) => {
    let state = getState();
     if(state.projectList.length >0 ){

        return state;

     }else{
        axios.get(`${BACKEND_URL}/dashboard_data`, { headers: authHeaderFinal() }).then(response => {
            if(response.status === 200){
             return  dispatch(actions.GetAllTenantsSuccess(response.data));
            }
            else{
              return  dispatch(action.GetAllTenantsError(response.message))
            }
        })

     }
}
