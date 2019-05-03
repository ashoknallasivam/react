import { API_URL, BACKEND_URL } from '../config';
import createHistory from '../helpers/history'



const actions = {
    GetRouteSuccess: (payload) => {
        return {
            type: 'ROUTE_SUCCESS',
            payload: payload,
        };
    }

};


export const routeTo = (id) => (dispatch, getState) => {
    const history = createHistory;

    history.push({path:'/viewedit', state:{id :id}});
    history.go()
//     return dispatch => {
      
//         dispatch({type: 'ROUTE_SUCCESS', payload: location })
//         history.push(location);
    
// }
};