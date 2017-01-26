import { Component } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"
import { Router } from "@angular/router"

@Component({
    selector: 'signin',
    template: require('./signin.html'),
    styles: [require('./signin.scss')]
})
export class SigninContainer {
    items: any;
    user: any = {};

    @select(['auth', 'user']) user$: Observable<boolean>;
    constructor(private aa: AuthActions, private router: Router) {
        // this.items = "";
        this.user$.subscribe((resUser: any) => {
            console.log('resUser', resUser)
            if (resUser.type == 1 || resUser.type == 3)
                this.router.navigate(['dashboard', resUser.username]);
            else if (resUser.type == 2)
                this.router.navigate(['dashboard', resUser.compId]);

        })
    }

    onSubmit(valid, form) {
        console.log('valid', valid);
        if (!valid) return

        console.log('form', form)
        this.aa.requestLogin(form.email, form.password);
    }
}
