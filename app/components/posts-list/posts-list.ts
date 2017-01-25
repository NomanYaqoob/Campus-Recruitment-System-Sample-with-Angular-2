import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { select, Observable, AuthActions } from "../../../store"
import { MaterializeAction } from "angular2-materialize"

@Component({
    selector: 'posts-list',
    template: require('./posts-list.html'),
    styles: [require('./posts-list.scss')]
})
export class PostListComponent implements OnInit {

    @Input() posts: any;
    @Input() companyKey: string;
    @Input() currentUser: any;
    @Output() applyEvent: EventEmitter<any>;
    user;
    tempPostId;
    tempCompanyId;
    constructor() {
        this.applyEvent = new EventEmitter<any>();
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })
    }


    // ngOnChanges(data) {
    //     console.log('ngOnChanges', data);
    //     if (data.currentUser.currentValue) {
    //         this.user = data.currentUser.currentValue;
    //     }
    // }


    ngOnInit() {
        console.log('wwwwwwwwwwww', this.companyKey);
        console.log('wwwwwwwwwwwwpostsss', this.posts);
        console.log('wwwwwwwwwwwwpostsss', this.currentUser);
    }


    keys(list) {
        // console.log('list', list);
        return Object.keys(list);
    }

    modalActions = new EventEmitter<string | MaterializeAction>();
    openModal(postId, companyId) {
        console.log('rugghhhhhhhh')
        this.tempPostId = postId;
        this.tempCompanyId = companyId;
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }
    closeModal(flag) {
        if (flag) { 
            this.apply(this.tempPostId, this.tempCompanyId)
        }
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    apply(args, companyId) {
        console.log('argsss', args);
        this.applyEvent.emit({ postId: args, userId: this.currentUser['$key'], companyId: companyId });
    }
}
