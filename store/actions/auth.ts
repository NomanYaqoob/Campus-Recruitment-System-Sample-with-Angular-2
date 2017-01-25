import { Injectable } from "@angular/core"
import { NgRedux } from "ng2-redux"
import { IAppState } from "../"

@Injectable()
export class AuthActions {

    static LOGIN_REQUEST: string = "LOGIN_REQUEST";
    static LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
    static LOGIN_FAIL: string = "LOGIN_FAIL";
    static REGISTER_USER: string = "REGISTER_USER";
    static REGISTER_FAIL: string = "REGISTER_FAIL";
    static REGISTER_SUCCESS: string = "REGISTER_SUCCESS";
    static LOGOUT: string = "LOGOUT";
    static LOGOUT_SUCCESS: string = "LOGOUT_SUCCESS";
    static IS_LOGGED_IN: string = "IS_LOGGED_IN";
    static USER_ONLINE: string = "USER_ONLINE";
    static USER_ONLINE_FAIL: string = "USER_ONLINE_FAIL";

    static GET_USER_FROM_COMPANIES: string = "GET_USER_FROM_COMPANIES"
    static NULL: string = "NULL";
    constructor(private ngRedux: NgRedux<IAppState>) {
        console.log('in constructor');
        this.ngRedux.dispatch({
            type: AuthActions.IS_LOGGED_IN
        })
    }


    register(user: Object) {
        console.log('userrr', user);
        return this.ngRedux.dispatch({
            type: AuthActions.REGISTER_USER,
            payload: user
        })
    }

    requestLogin(email: string, password: string, type: number) {
        return this.ngRedux.dispatch({
            type: AuthActions.LOGIN_REQUEST,
            payload: { email, password, type }
        })
    }

    requestLogout() {
        return this.ngRedux.dispatch({
            type: AuthActions.LOGOUT
        })
    }
}