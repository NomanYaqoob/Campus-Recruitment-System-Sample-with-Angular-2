import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable"
import { AuthActions } from "../actions/auth"
import { AngularFire } from 'angularfire2'
import * as fb from "firebase";
@Injectable()
export class AuthEpic {
    constructor(private af: AngularFire) {

    }
    //LOGIN_REQUEST
    requestLogin = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN_REQUEST)
            .switchMap(({payload}) => {
                return Observable.fromPromise(this.af.auth.login({ email: payload.email, password: payload.password }))
                    .map(res => {
                        console.log('LOGIN_REQUEST', res);
                        this.setLocalStorage(res.auth);
                        return {
                            type: AuthActions.LOGIN_SUCCESS,
                            payload: { auth: res}
                        }
                    })
                    .catch(err => {
                        console.log("err", err);
                        return Observable.of({
                            type: AuthActions.LOGIN_FAIL
                        })
                    })
            })



    //REGISTER_USER
    register = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.REGISTER_USER)
            .switchMap(({payload}) => {
                return Observable.fromPromise(this.af.auth.createUser({
                    email: payload.email,
                    password: payload.password
                }))
                    .map(res => {
                        console.log("res", res, payload)
                        delete payload.password
                        if (payload.type == 1)
                            fb.database().ref(`/students/${res.uid}`).set(payload)
                        else
                            fb.database().ref(`/companies/${res.uid}`).set(payload)
                        return {
                            type: AuthActions.REGISTER_SUCCESS,
                            payload: payload
                        };
                    })
                    .catch(err => {
                        console.log("err", err);
                        return Observable.of({
                            type: AuthActions.REGISTER_FAIL,
                            payload: { err: err }
                        })
                    })
            })


    //ISLOGGEDIN
    checkLogin = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.IS_LOGGED_IN)
            .switchMap(({payload}) => {
                console.log("ISLOGGEDIN");
                let currentUser = this.getLocalStorage();
                if (currentUser) {
                    return Observable.of({
                        type: AuthActions.LOGIN_SUCCESS,
                        payload: { auth: currentUser, fromLoggedIn: true }
                    })
                }
                else {
                    return Observable.of({
                        type: AuthActions.LOGIN_FAIL
                    })
                }
            })

    //LOGIN_SUCCESS
    loginSuccess = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGIN_SUCCESS)
            .switchMap(({payload}) => {
                // if (payload.fromLoggedIn) {
                    return Observable.fromPromise(fb.database().ref(`students/${payload.auth.uid}`).once("value"))
                        .map(data => {
                            if (data.val()) {
                                console.log("data", data.val(), data.key);
                                return {
                                    type: AuthActions.USER_ONLINE,
                                    payload: { val: data.val(), key: data.key }
                                }
                            }
                            else {
                                console.log('in else');
                                return {
                                    type: AuthActions.GET_USER_FROM_COMPANIES,
                                    payload: payload
                                }
                            }
                        })
                // }
                // else {
                //     console.log("payload", payload);
                //     if (payload.type == '1') {
                //         return Observable.fromPromise(fb.database().ref(`students/${payload.auth.uid}`).once("value"))
                //             .map(data => {
                //                 if (data.val()) {
                //                     console.log("data", data.val());
                //                     return {
                //                         type: AuthActions.USER_ONLINE,
                //                         payload: { val: data.val(), key: data.key }
                //                     }
                //                 }
                //                 else {
                //                     console.log('in else');
                //                     return {
                //                         type: AuthActions.USER_ONLINE_FAIL
                //                     }
                //                 }
                //             })
                //     }
                //     else {
                //         return Observable.of({
                //             type: AuthActions.GET_USER_FROM_COMPANIES,
                //             payload: payload
                //         })
                //     }
                // }
            })


    companiesUser = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.GET_USER_FROM_COMPANIES)
            .switchMap(({payload}) => {
                console.log('GET_USER_FROM_COMPANIES', payload);
                return Observable.fromPromise(fb.database().ref(`companies/${payload.auth.uid}`).once("value"))
                    .map(data => {
                        if (data.val()) {
                            console.log("data", data.val());
                            return {
                                type: AuthActions.USER_ONLINE,
                                payload: { val: data.val(), key: data.key }
                            }
                        }
                        else {
                            console.log('in else');
                            return {
                                type: AuthActions.USER_ONLINE_FAIL
                            }
                        }
                    })
            })



    requestLogout = (action$: ActionsObservable<any>) =>
        action$.ofType(AuthActions.LOGOUT)
            .switchMap(({payload}) => {
                this.af.auth.logout();
                this.clearLocalStorage();
                return Observable.of({
                    type: AuthActions.LOGOUT_SUCCESS
                })
            })



    clearLocalStorage() {
        localStorage.removeItem('ainak-user')
    }

    setLocalStorage(data) {
        localStorage.setItem("ainak-user", JSON.stringify(data));
    }

    getLocalStorage() {
        return JSON.parse(localStorage.getItem('ainak-user'));
    }

}