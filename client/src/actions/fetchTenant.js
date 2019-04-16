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
    },
    GetSavedProjectsSuccess: (payload) => {
        return {
            type: 'SAVED_PROJECTS_SUCCESS',
            payload: payload,
        };
    },
    GetSavedProjectsError: (payload) => {
      return {
          type: 'SAVED_PROJECT_ERROR',
          payload: payload,
      };
  },
    GetUserInfo: (payload) => {
        return {
            type: 'GET_USER_INFO_SUCCESS',
            payload: payload,
        };
    },
    
    GetUserInfoError: (payload) => {
      return {
          type: 'GET_USER_INFO_ERROR',
          payload: payload,
      };
  },
}

export const fetchAllTenants = () => (dispatch, getState) => {
  let state = getState();
  if (state.projectList.isAllFetched == true ){
    let response = {
      status : 200
    }
    return Promise.resolve(response);
  } else {
    return axios
      .get(`${BACKEND_URL}/dashboard_data`, { headers: authHeaderFinal() })
      .then(response => {
        if (response.status == 200) {
          dispatch(actions.GetAllTenantsSuccess(response.data));
          return response;
        } else {
          dispatch(action.GetAllTenantsError(response.message));
          return false;
        }
      })
      .catch(error => {
        dispatch(actions.GetAllTenantsError( error.message));
        return false;
      });
  }
};


export const fetchSavedTenants= () => (dispatch, getState) => {
      return  axios.get(`${BACKEND_URL}/saved_projects`, { headers: authHeaderFinal() }).then(response => {
            if(response.status === 200){
                let project ={};
                 response.data.map((data,index)=>{
                    project = {
                        ...project,
                        [data.id] :{ ...data}
                    }
                })
                dispatch(actions.GetSavedProjectsSuccess(project));
               return false
            }
            else{
                return false
            }
        }) .catch(error => {
          dispatch(actions.GetSavedProjectsError( error.message));
          return false;
        });
}



export const fetchUserInfo= () => (dispatch, getState) => {
const state = getState();
console.log(state.projectList.userId)
if( state.projectList.userId ==""){
  
    return  axios.get(`${BACKEND_URL}/user`, { headers: authHeaderFinal() }).then(response => {
          
        if(response.status == 200){
              let userId = response.data._id;
              dispatch(actions.GetUserInfo(userId));
             return false
          }
      }).catch(error => {
        dispatch(actions.GetUserInfoError( error.message));
        return false;
      });

  }
}

