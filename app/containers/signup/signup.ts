import { Component } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"
import { Router } from "@angular/router"
@Component({
    selector: 'signup',
    template: require('./signup.html'),
    styles: [require('./signup.scss')]
})
export class SignupContainer {
    items: any;
    user: any = { type: '' };
    @select(['auth', 'status']) status$: Observable<boolean>;
    constructor(private aa: AuthActions, private router: Router) {
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })


        this.status$.subscribe(flag => {
            console.log("flat", flag);
            if (flag) {
                this.router.navigate(['signin']);
            }
        })
    }


    onSubmit(valid, form) {
        console.log('valid', valid)
        console.log("form", form);

        if (form.type == 'company')
            form.type = 2
        else {
            form.status = 0; form.type = 1
        }
        this.aa.register(form);
    }
}
