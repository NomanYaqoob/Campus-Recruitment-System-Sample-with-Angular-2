import { Injectable, Inject } from "@angular/core"
import { FirebaseApp } from "angularfire2"
import * as fb from 'firebase';
@Injectable()
export class FirebaseService {

    storage: fb.storage.Reference
    public ref: fb.database.Reference
    public fbTimestamp = fb.database['ServerValue'].TIMESTAMP;
    constructor( @Inject(FirebaseApp) private fbApp: any) {
        this.storage = this.fbApp.storage().ref();
        this.ref = this.fbApp.database().ref();
        
    }

    uploadFile(path, file: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.storage.child(path).putString(file, 'base64')
                .then(snapshot => {
                    console.log("uploded", snapshot.downloadURL)
                    resolve(snapshot.downloadURL)
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    saveMultipath(multipath) {
        return this.ref.update(multipath);
    }

}