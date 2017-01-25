import { AuthActions } from "../actions";

interface IInitialState {
    status: boolean,
    user: Object,
    isLoading: boolean,
    err: string,
    isLoggedIn: boolean
}

const initialState: IInitialState = {
    status: false,
    user: {},
    isLoading: false,
    err: "",
    isLoggedIn: false
}

export const authReducer = function (state: IInitialState = initialState, action: { type: string, payload?: any }) {
    let newState = null;
    switch (action.type) {
        case AuthActions.LOGIN_REQUEST:
            return Object.assign(state, { isLoading: true, isLoggedIn: false });
        case AuthActions.LOGIN_SUCCESS:
            return Object.assign(state, { isLoading: false, isLoggedIn: true });
        case AuthActions.USER_ONLINE:
            newState = state;
            newState.user = Object.assign({}, action.payload.val, { $key: action.payload.key });
            newState.isLoggedIn = true;
            console.log("newState", newState);
            return Object.assign(state, newState);
        case AuthActions.USER_ONLINE_FAIL:
            return Object.assign(state, { isLoading: false, isLoggedIn: false });
        case AuthActions.LOGIN_FAIL:
            return Object.assign(state, { isLoading: false, isLoggedIn: false });
        case AuthActions.REGISTER_USER:
            return Object.assign(state, { isLoading: true, status: false })
        case AuthActions.REGISTER_SUCCESS:
            return Object.assign(state, { isLoading: false, status: true })
        case AuthActions.REGISTER_FAIL:
            return Object.assign(state, { isLoading: false, err: action.payload.err, status: false })
        case AuthActions.LOGOUT_SUCCESS:
            return Object.assign(state, { user: {}, isLoggedIn: false, status: false })

        default:
            return state;
    }
}

