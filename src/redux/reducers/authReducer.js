const initialState = {
    isAuthenticated: false,
    userRole: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                userRole: action.payload.role,
            };
        case "SET_ROLE":
            return {
                ...state,
                userRole: action.payload.role,
            };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
