import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable"
import { CompaniesActions } from "../actions/"
import { AngularFire } from 'angularfire2'
import * as fb from 'firebase';
@Injectable()
export class CompaniesEpic {
    constructor(private af: AngularFire) {

    }


    requestCompanies = (action$: ActionsObservable<any>) =>
        action$.ofType(CompaniesActions.COMPANIES)
            .switchMap(({payload}) => {
                console.log('in comapnies epic')
                return this.af.database.list('companies')
                    .mergeMap(companies => {
                        console.log("companies List", companies);
                        return companies.map(company => {
                            return {
                                type: CompaniesActions.COMPANIES_SUCCESS, 
                                payload: company
                            }
                        })
                    });
            })


    requestPostStudents = (action$: ActionsObservable<any>) =>
        action$.ofType(CompaniesActions.POST_STUDENTS_COMPANIES)
            .switchMap(({payload}) => {
                console.log('requestPostStudent epic')
                return this.af.database.list('posts-students')
                    .mergeMap(companies => {
                        console.log("companies List", companies);
                        return companies.map(company => {
                            console.log("companyyyyyyyyyyyyy", company);
                            return (company)
                            // return {
                            //     type: CompaniesActions.COMPANIES_SUCCESS,
                            //     payload: company
                            // }
                        })
                    })

            })



    getCompany = (action$: ActionsObservable<any>) =>
        action$.ofType(CompaniesActions.GET_COMPANY)
            .switchMap(({obj}) => {
                console.log('111111111111', obj);
                let companyId = obj['$key']
                delete obj['$key']
                delete obj['$exists']
                // if (obj) {
                if (obj) {
                    console.log(';zzzzzzzzzzzzzzzzzzzzzz', obj, companyId)
                    Observable.fromPromise(fb.database().ref(`companies/${companyId}`).once("value"))
                        .map(snapshot => {
                            console.log('snapshotttttt', snapshot);
                            Object.keys(obj).map(post => {
                                console.log('postsssss', post);
                                return {
                                    type: CompaniesActions.COMPANIES_POSTS,
                                    payload: { companyId: snapshot, post: post }
                                }
                            })
                        })
                    // .catch(err => {
                    //     return Observable.of({

                    //     })
                    // })
                }
                else {
                    return Observable.of({
                        type: CompaniesActions.NULL,
                    })
                }
            })



    companyPosts = (action$: ActionsObservable<any>) =>
        action$.ofType(CompaniesActions.COMPANIES_POSTS)
            .switchMap(({payload}) => {
                return Observable.fromPromise(firebase.database().ref(`posts`).once("value"))
                    .mergeMap(companies => {
                        console.log("companies List", companies);
                        return companies.map(company => {
                            return {
                                type: CompaniesActions.COMPANIES_POSTS_SUCCESS,
                                payload: company
                            }
                        })
                    });
            })
}