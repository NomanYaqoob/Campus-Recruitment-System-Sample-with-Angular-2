import { Injectable } from "@angular/core"
import { NgRedux } from "ng2-redux"
import { IAppState } from "../"


@Injectable()
export class CompaniesActions {

    static COMPANIES: string = "COMPANIES";
    static COMPANIES_SUCCESS: string = "COMPANIES_SUCCESS";
    constructor(private ngRedux: NgRedux<IAppState>) {

    }



    requestCompanies() {
        console.log("requestCompanies action")
        return this.ngRedux.dispatch({
            type: CompaniesActions.COMPANIES,
        })
    }
}