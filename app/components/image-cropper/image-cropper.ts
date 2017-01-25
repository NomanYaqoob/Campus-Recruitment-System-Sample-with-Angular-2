import { Component, NgZone, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from "ng2-img-cropper";

@Component({
    selector: 'image-crop',
    template: require('./image-cropper.html'),
    styles: [require('./image-cropper.scss')],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCropComponent implements OnInit {
    @Input() settings: any;
    @Input() setDefault: any;
    @Output() getCropImage = new EventEmitter<any>();
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
    @ViewChild('inputElement') inputElement;
    cropperSettings: CropperSettings;
    data: any;
    isCropStart: boolean = false;


    constructor(public ref: ElementRef) {
        this.data = {};
        this.cropperSettings = new CropperSettings();
    }

    ngOnInit() {
        this.cropper['cropcanvas'].nativeElement.style.display = 'none';
        this.cropperSettings.width = this.cropperSettings.croppedWidth = this.settings.cropperWidth;
        this.cropperSettings.height = this.cropperSettings.croppedHeight = this.settings.cropperHeight;
        this.cropperSettings.canvasWidth = this.settings.canvasWidth;
        this.cropperSettings.canvasHeight = this.settings.canvasWidth;
        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;
        this.cropperSettings.rounded = this.settings.isRound;
        this.cropperSettings.cropperDrawSettings.strokeColor = this.settings.strokeColor;
        this.cropperSettings.cropperDrawSettings.strokeWidth = this.settings.strokeWidth;
        this.cropperSettings.noFileInput = this.settings.noFileInput;
    }

    cropped(bounds: Bounds) {
        // console.log("bounds", this.data);
        this.isCropStart = true;
        this.cropper['cropcanvas'].nativeElement.style.display = 'block';
        this.getCropImage.emit(this.data.image);
    }


    // ngAfterViewInit(){
    //     let context = this.cropper['cropcanvas'].nativeElement.getContext('2d');
    //     let image = document.createElement('img');
    //     image.src = this.setDefault;
    //     context.drawImage(image, 0, 0);
    // }

    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }

    uploadImage() {
        this.inputElement.nativeElement.click();
    }
}