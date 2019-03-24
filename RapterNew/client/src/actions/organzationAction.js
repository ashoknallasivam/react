const ORGANIZATION_FETCH_SUCCESS = 'ORGANIZATION_FETCH_SUCCESS';
export function getOrganization(dispatch,data){
                console.log(data);
        dispatch({
            type: ORGANIZATION_FETCH_SUCCESS,
            payload: data
        })      
      
}

// export const AddOrganizationValue=(data)=>(dispatch,getstate) =>{
//     const state = getstate();
//     console.log('${"caled"}'+state);
//     // dispatch({
//     //     type: ORGANIZATION_ADD_VALUE,
//     //     payload: data
//     // })    
// }