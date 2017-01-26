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


    @select(['posts', 'posts']) posts$: Observable<any>; //getting the latest posts from post reducer
    @select(['auth', 'user']) user$: Observable<any>; // getting current user from auth reducer
    @select(['companies', 'companies']) companies$: Observable<any>; //getting the latest companies from company reducer
    @select(['students', 'students']) students$: Observable<any>; //getting the latest students from post reducer
    constructor(private fbService: FirebaseService, private pa: PostsActions, private ca: CompaniesActions, public sa: StudentsActions) {
        this.ca.requestCompanies();
        // this.ca.requestPostStudents();
        this.sa.requestStudents();
        this.user$.subscribe(user => {
            this.user = user;
        })
    }


    // Event Used in Modal Actions MATERIALIZE LIB ------ START
    modalActions = new EventEmitter<string | MaterializeAction>();
    openModal() {
        this.isShown = true;
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }
    closeModal() {
        this.isShown = false;
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }
    // Event Used in Modal Actions MATERIALIZE LIB ------ END



    //getting image from cropper in profile setting
    CroppedImageHandler(image) {
        this.image = true;
        // console.log("image", image);
        this.selectedSrc = image;
    }



    // upload() {
    //     console.log(this.image_text);
    //     let base64 = this.selectedSrc.split(',');
    //     this.fbService.uploadFile('public/image.png', base64[1]).then(url => {
    //         console.log("URL:", url);
    //         let multipath = {};
    //         let pushKey = this.fbService.ref.push().key;
    //         console.log('pushkey', pushKey)
    //         multipath[`posts/${pushKey}`] = {
    //             post: this.image_text,
    //             timestamp: fb.database.ServerValue.TIMESTAMP,
    //             image_url: url
    //         }
    //         this.fbService.saveMultipath(multipath).then(res => {
    //             console.log("multipath Saved", res);
    //         })
    //     });
    // }


    //submitting post to database
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



    //handler for users to post for a job
    approveEventHandler(studentId) {
        let multipath = {};
        multipath[`students/${studentId}/status`] = 1;
        this.fbService.saveMultipath(multipath).then(res => {
            console.log("multipath updated")
        })
        console.log(studentId);
    }


}
