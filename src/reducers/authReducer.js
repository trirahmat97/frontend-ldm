import { SIGN_IN, SIGN_OUT } from '../actions/type';

const INITIAL_STATE = {
    isAuthenticated: localStorage.getItem("isAuthenticated") ? localStorage.getItem("isAuthenticated") : false,
    user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    tokenExpires: localStorage.getItem("tokenExpires") ? localStorage.getItem("tokenExpires") : 0,
    role: localStorage.getItem("role") ? localStorage.getItem("role") : null
};

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            localStorage.setItem("user", action.payload.userId);
            localStorage.setItem("token", action.payload.access_token);
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("tokenExpires", action.payload.expires);
            localStorage.setItem("role", action.payload.role);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.userId,
                token: action.payload.access_token,
                tokenExpires: action.payload.expires,
                role: action.payload.role
            }
        case SIGN_OUT:
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                tokenExpires: 0,
                role: 0
            }
        default:
            return state;
    }
}

export default AuthReducer;