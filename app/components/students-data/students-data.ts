import { Component, Input } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"

@Component({
    selector: 'students-data',
    template: require('./students-data.html'),
    styles: [require('./students-data.scss')]
})
export class StudentDataComponent {
    items: any;
    @Input() students: any;
    constructor(private aa: AuthActions) {
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })
    }

    keys(list) {
        // console.log('list', list);
        return Object.keys(list);
    }
}
