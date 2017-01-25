import { Component } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"

@Component({
    selector: 'home',
    template: require('./home.html'),
    styles: [require('./home.scss')]
})
export class HomeContainer {
    items: any;
    constructor(private aa: AuthActions) {
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })
    }
}
