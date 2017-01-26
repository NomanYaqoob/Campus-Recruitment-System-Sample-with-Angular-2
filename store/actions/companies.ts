import { Injectable } from "@angular/core"
import { NgRedux } from "ng2-redux"
import { IAppState } from "../"


@Injectable()
export class CompaniesActions {

    static COMPANIES: string = "COMPANIES";
    static COMPANIES_SUCCESS: string = "COMPANIES_SUCCESS";

    static POST_STUDENTS_COMPANIES: string = "POST_STUDENTS_COMPANIES";
    static POST_STUDENTS_COMPANIES_SUCCESS: string = "POST_STUDENTS_COMPANIES_SUCCESS";

    static COMPANIES_POSTS: string = "COMPANIES_POSTS";
    static COMPANIES_POSTS_SUCCESS: string = "COMPANIES_POSTS_SUCCESS";
    static COMPANIES_POSTS_FAIL: string = "COMPANIES_POSTS_FAIL";

    static GET_COMPANY: string = "GET_COMPANY";
    static GET_COMPANY_SUCCESS: string = "GET_COMPANY_SUCCESS";

    static NULL: string = "NULL";
    constructor(private ngRedux: NgRedux<IAppState>) {

    }



    requestCompanies() {
        console.log("requestCompanies action")
        return this.ngRedux.dispatch({
            type: CompaniesActions.COMPANIES,
        })
    }

    requestPostStudents() {
        console.log('requestPostStudent action')
        return this.ngRedux.dispatch({
            type: CompaniesActions.POST_STUDENTS_COMPANIES
        })
    }
}