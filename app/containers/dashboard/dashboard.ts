import { Component, EventEmitter } from '@angular/core';
import { select, Observable } from "../../../store"
import { MaterializeAction } from 'angular2-materialize';
import { FirebaseService } from "../../providers"
import { PostsActions, CompaniesActions, StudentsActions } from "../../../store"
import * as fb from 'firebase';
@Component({
    selector: 'dashboard',
    template: require('./dashboard.html'),
    styles: [require('./dashboard.scss')]
})
export class DashboardContainer {
    items: any;
    user: Object = {};
    isShown: boolean = false;
    image: boolean = false;
    selectedSrc: any;
    image_text: string = "";
    post: Object = {};
    @select(['posts', 'posts']) posts$: Observable<any>;
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['companies', 'companies']) companies$: Observable<any>;
    @select(['students', 'students']) students$: Observable<any>;
    constructor(private fbService: FirebaseService, private pa: PostsActions, private ca: CompaniesActions, public sa: StudentsActions) {
        // this.pa.addPost();
        this.ca.requestCompanies();
        this.sa.requestStudents();
        this.user$.subscribe(user => {
            this.user = user;
        })
        // const myInterval = Observable.interval(1000);
        // //Create an observable that emits every time document is clicked
        // const bufferBy = Observable.fromEvent(document, 'click');
        // /*
        // Collect all values emitted by our interval observable until we click document. This will cause the bufferBy Observable to emit a value, satisfying the buffer. Pass us all collected values since last buffer as an array.
        // */
        // const myBufferedInterval = bufferBy.bufferTime(3000);
        // //Print values to console
        // //ex. output: [1,2,3] ... [4,5,6,7,8]
        // const subscribe = myBufferedInterval.subscribe(val => console.log(' Buffered Values:', val));
    }

    modalActions = new EventEmitter<string | MaterializeAction>();
    openModal() {
        this.isShown = true;
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }
    closeModal() {
        this.isShown = false;
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    CroppedImageHandler(image) {
        this.image = true;
        // console.log("image", image);
        this.selectedSrc = image;
    }


    upload() {
        console.log(this.image_text);
        let base64 = this.selectedSrc.split(',');
        this.fbService.uploadFile('public/image.png', base64[1]).then(url => {
            console.log("URL:", url);
            let multipath = {};
            let pushKey = this.fbService.ref.push().key;
            console.log('pushkey', pushKey)
            multipath[`posts/${pushKey}`] = {
                post: this.image_text,
                timestamp: fb.database.ServerValue.TIMESTAMP,
                image_url: url
            }
            this.fbService.saveMultipath(multipath).then(res => {
                console.log("multipath Saved", res);
            })
        });
    }

    onSubmit(valid, post) {
        this.closeModal();
        console.log("valid", valid);
        console.log("form", post);
        if (!valid) return;
        let multipath = {};
        let pushKey = this.fbService.ref.push().key;
        post.timestamp = this.fbService.fbTimestamp;
        post.companyUid = this.user['$key'];
        multipath[`posts/${this.user['compId']}/${pushKey}`] = post;
        this.fbService.saveMultipath(multipath).then(mul => {
            console.log("udpdated", mul);
            this.post = {};
        })

    }


}
