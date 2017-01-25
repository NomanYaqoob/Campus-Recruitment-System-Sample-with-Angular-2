import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable"
import { CompaniesActions } from "../actions/"
import { AngularFire } from 'angularfire2'
@Injectable()
export class CompaniesEpic {
    constructor(private af: AngularFire) {

    }


    requestCompanies = (action$: ActionsObservable<any>) =>
        action$.ofType(CompaniesActions.COMPANIES)
            .switchMap(({payload}) => {
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
}