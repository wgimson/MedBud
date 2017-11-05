import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UserFormPage } from '../pages/user-form/user-form';
import { UserDisplayPage } from '../pages/user-display/user-display';
import { LoginPage } from '../pages/login/login';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import {AngularFireModule} from 'angularfire2';
// for auth
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import { AngularFirestoreModule } from 'angularfire2/firestore';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDk_lNkfHuzk66qkUpio_zjDf_hhigu2Rw",
  authDomain: "medbud-c6b5b.firebaseapp.com",
  databaseURL: "https://medbud-c6b5b.firebaseio.com",
  projectId: "medbud-c6b5b",
  storageBucket: "medbud-c6b5b.appspot.com",
  messagingSenderId: "1067946597419"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    UserFormPage,
    UserDisplayPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    UserFormPage,
    UserDisplayPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
