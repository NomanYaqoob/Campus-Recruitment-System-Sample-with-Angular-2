import { Component } from '@angular/core';
import { select, Observable, PostsActions } from "../../../store"
import { FirebaseService } from "../../providers"
import { Router } from "@angular/router"

@Component({
    selector: 'posts',
    template: require('./posts.html'),
    styles: [require('./posts.scss')]
})
export class PostsContainer {
    companyId: any = "";
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['posts', 'posts']) posts$: Observable<boolean>;
    constructor(private pa: PostsActions, private router: Router, private fbService: FirebaseService) {
        // this.items = "";
        this.companyId = this.router.url.split('/')[2];
        this.pa.addPost(this.companyId);
    }

    applyEventHandler(ev) {
        console.log('ev', ev);
        let multipath = {};
        let pushKey = this.fbService.ref.push().key;
        multipath[`posts-students/${ev.companyId}/${ev.postId}/${pushKey}`] = {
            user: ev.userId,
            timestamp: this.fbService.fbTimestamp
        }
        multipath[`students-posts/${ev.userId}/${ev.companyId}/${pushKey}`] = { post: ev.postId, timestamp: this.fbService.fbTimestamp }
        this.fbService.saveMultipath(multipath).then(res => {
            console.log('multipath updated');
        })
    }
}
