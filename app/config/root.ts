import { Component, ViewEncapsulation } from '@angular/core';
import { select, Observable, AuthActions } from "../../store"

@Component({
    selector: 'my-app',
    template: require('./root.html'),
    styles: [require('./root.scss')],
    // encapsulation: ViewEncapsulation.Native
})
export class RootContainer {
    items: any;
    constructor(private aa: AuthActions) {
        this.items = "";
    }
}
