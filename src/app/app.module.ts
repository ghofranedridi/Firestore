import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD2GlAq6UlBIQcshAM57FrM5tx4CRr67lw",
  authDomain: "firetest-dd391.firebaseapp.com",
  projectId: "firetest-dd391",
  storageBucket: "firetest-dd391.appspot.com",
  messagingSenderId: "1060594505586",
  appId: "1:1060594505586:web:95832951e6213b2bd66feb"
};


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
