import { Component, Input, EventEmitter, Output } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"
import { MaterializeAction } from "angular2-materialize"

@Component({
    selector: 'students-applied',
    template: require('./students-applied.html'),
    styles: [require('./students-applied.scss')]
})
export class StudentsAppliedComponent {
    items: any;
    @Input() students: any;
    @Input() currentUser: Object;


    modalStudent: any = {};
    modalActions = new EventEmitter<string | MaterializeAction>();
    constructor(private aa: AuthActions) {
        // this.approveEvent = new EventEmitter<any>();
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })
    }



    keys(list) {
        // console.log('list', list);
        return Object.keys(list);
    }

    openModal(student) {
        console.log('student', student);
        this.modalStudent = student;
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }
    closeModal() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    approve(studentId) {
        // this.approveEvent.emit(studentId);
    }
}
