import { Component, Input, ChangeDetectionStrategy, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { select, Observable } from "../../../store"

@Component({
    selector: 'user-profile',
    template: require('./user-profile.html'),
    styles: [require('./user-profile.scss')],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
    semesters = [
        { name: "Semester 1", value: 1 },
        { name: "Semester 2", value: 2 },
        { name: "Semester 3", value: 3 },
        { name: "Semester 4", value: 4 },
        { name: "Semester 5", value: 5 },
        { name: "Semester 6", value: 6 },
        { name: "Semester 7", value: 7 },
        { name: "Semester 8", value: 8 },
    ]

    // @Input() companies: any;
    @Input() user: any
    @Input() displayOnly: boolean;
    @Output() updateEvent: EventEmitter<any>
    selectedSrc: any;
    items: any;
    isShown: boolean = false;
    constructor() {
        this.updateEvent = new EventEmitter<any>();
        // this.items = "";
        // this.aa.requestLogin({ name: "noman" })
    }


    ngOnInit() {
    }

    apply(args) {

    }


    CroppedImageHandler(image) {
        // this.image = true;
        // console.log("image", image);
        this.selectedSrc = image;
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


    update() {
        console.log("user", this.user);
        if (this.selectedSrc)
            this.updateEvent.emit({ image: this.selectedSrc, user: this.user })
        else {
            this.updateEvent.emit({ user: this.user })
        }
    }
}
