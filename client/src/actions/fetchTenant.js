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
    //  if(state.projectList.length >0 ){

    //     return state;

    //  }else{
      return  axios.get(`${BACKEND_URL}/dashboard_data`, { headers: authHeaderFinal() }).then(response => {
            if(response.status === 200){
               dispatch(actions.GetAllTenantsSuccess(response.data));
               return false
            }
            else{
                dispatch(action.GetAllTenantsError(response.message))
                return false
            }
        })

    //  }
}


    
export const exportProject = (id) => (dispatch, getState) => {
   const state = getState();
   let project =  state.projectList.Projects[id];

     return axios.get(`${BACKEND_URL}/dashboard_data/${id}?export=true`,  { headers: authHeaderFinal() }).then(response => {
        if(response.status == 200){
           const url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${response.data.name}.json`); //or any other extension
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return false;
}else{
  return false;
}
    
})
}
