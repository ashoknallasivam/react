const organizationStore = (state = {}, action) => {
    switch (action.type) {
        case 'ORGANIZATION_FETCH_SUCCESS':
            state = {
                ...state,
                ...action.payload
            };
            console.log(state);
            return state;
        default:
            return {};
    }
};

export default organizationStore;