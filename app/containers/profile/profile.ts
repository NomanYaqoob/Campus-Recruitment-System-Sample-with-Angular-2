import { Component } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"
import { FirebaseService } from "../../providers"
import { Router } from "@angular/router"

@Component({
    selector: 'profile',
    template: require('./profile.html'),
    styles: [require('./profile.scss')]
})

export class ProfileContainer {
    items: any;
    @select(['auth', 'user']) user$: Observable<any>;
    constructor(private router: Router, private fbService: FirebaseService) {
        // this.items = "";
    }

    updateUserEventHandler(user) {
        console.log("userrrrrrrrr", user);
        let multipath = {};
        // console.log(this.image_text);
        let base64 = user.image.split(',');
        this.fbService.uploadFile(`profile/${user.user.username}.png`, base64[1]).then(url => {
            if (user.user.type == 1) {
                let key = user.user['$key'];
                delete user.user['$key'];
                user.user.status = 0;
                if (url) {
                    user.user['profile-image'] = url;
                }
                console.log('after delete', user.user);
                multipath[`students/${key}`] = user.user;
                this.fbService.saveMultipath(multipath).then(res => {
                    console.log("multipath Saved", res);
                })
            }
        });
    }

}
