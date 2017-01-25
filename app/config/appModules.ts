import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootContainer } from './root';
import { ReduxStoreModule } from "../../store"
import { FormsModule } from '@angular/forms';
import { NgReduxModule } from 'ng2-redux';
import { RouterModule } from "@angular/router"
import { ApplicationComponents } from "./routes"
import { AppRoutes } from "./routes"
import { AngularFireModule, AuthMethods, AuthProviders } from "angularfire2"
import { ImageCropperComponent } from 'ng2-img-cropper';
import { MaterializeDirective } from "angular2-materialize";
const myFirebaseConfig = {
  apiKey: "AIzaSyCnaeajCvUlSe_dtsp5KmDowstSvcnqwVA",
  authDomain: "exaple-deploy.firebaseapp.com",
  databaseURL: "https://exaple-deploy.firebaseio.com",
  storageBucket: "exaple-deploy.appspot.com",
  messagingSenderId: "807105921955"
};


const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

import { providers } from "../providers"
@NgModule({
  imports: [BrowserModule,
    NgReduxModule,
    ReduxStoreModule,
    FormsModule,
    // MaterializeModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [RootContainer, ImageCropperComponent, MaterializeDirective, ...ApplicationComponents],
  bootstrap: [RootContainer],
  providers: [...providers]
})
export class AppModule { }
