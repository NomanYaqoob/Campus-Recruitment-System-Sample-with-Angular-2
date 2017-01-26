import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"

@Component({
    selector: 'companies-list',
    template: require('./companies-list.html'),
    styles: [require('./companies-list.scss')],
    // changeDetection: ChangeDetectionStrategy.OnPush

})
export class CompanyListComponent {

    @Input() companies: any;
    @Input() user: any
    items: any;
    constructor(private aa: AuthActions) {
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })
    }


    keys(list) {
        // console.log('list', list);
        return Object.keys(list);
    }

    apply(args) {

    }
}
