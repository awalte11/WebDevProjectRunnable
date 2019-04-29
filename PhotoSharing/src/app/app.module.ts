import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD-CgQk7YyllbGLB6msR_SY186w5yiQ5rk",
      authDomain: "photosharing-82835.firebaseapp.com",
      storageBucket: "photosharing-82835.appspot.com",
      projectId: "photosharing-82835",
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
