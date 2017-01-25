import { Injectable, Inject } from "@angular/core"
import { FirebaseApp } from "angularfire2"

@Injectable()
export class HelperService {
    @Inject(FirebaseApp) fbApp: any;
    constructor() {

    }

   
}