import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable"
import { StudentsActions } from "../actions/"
import { AngularFire } from 'angularfire2'
@Injectable()
export class StudentsEpic {
    constructor(private af: AngularFire) {

    }


    requestStudents = (action$: ActionsObservable<any>) =>
        action$.ofType(StudentsActions.STUDENTS)
            .switchMap(({payload}) => {
                return this.af.database.list('students')
                    .mergeMap(students => {
                        console.log("companies List", students);
                        return students.map(student => {
                            return {
                                type: StudentsActions.STUDENTS_SUCCESS,
                                payload: student
                            }
                        })
                    });
            })
}