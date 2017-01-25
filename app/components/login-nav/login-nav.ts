import { Component } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"

@Component({
    selector: 'login-nav',
    template: require('./login-nav.html'),
    styles: [require('./login-nav.scss')]
})
export class LoginNavComponent {
    items: any;
    constructor(private aa: AuthActions) {
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })
    }
}
