import { Component, ViewEncapsulation } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"
import { Router } from "@angular/router"

@Component({
    selector: 'root',
    template: require('./root.html'),
    styles: [require('./root.scss')]
    
})
export class RootContainer {
    items: any;
    user;
    @select(['auth', 'user']) user$: Observable<any>;
    constructor(private aa: AuthActions, private router: Router) {
        // this.items = "";
        this.user$.subscribe(user => {
            if (user) {
                this.user = user;
            }
        })
    }


    signOut() {
        this.aa.requestLogout();

        this.router.navigate(['signin'])
    }

    goHome() {
        if (this.user.username)
            this.router.navigate(['dashboard', this.user.username])
        else
            this.router.navigate(['dashboard', this.user.compId])
    }

}
