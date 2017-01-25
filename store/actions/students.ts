import { Injectable } from "@angular/core"
import { NgRedux } from "ng2-redux"
import { IAppState } from "../"


@Injectable()
export class StudentsActions {

    static STUDENTS: string = "STUDENTS";
    static STUDENTS_SUCCESS: string = "STUDENTS_SUCCESS";
    constructor(private ngRedux: NgRedux<IAppState>) {

    }



    requestStudents() {
        console.log("requestCompanies action")
        return this.ngRedux.dispatch({
            type: StudentsActions.STUDENTS,
        })
    }
}