
const store = (state = {}, action) => {
    switch (action.type) {
        case 'TENANT_FETCH_SUCCESS':
            state = {...state,
                ...action.payload.data
            };
            return state;
        default:
            return {};
    }
};

export default store;