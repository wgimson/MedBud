import { Component, ViewChild } from "@angular/core";

import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import * as firebase from "firebase/app";

import { AngularFireAuth } from "angularfire2/auth";

import { Observable } from "rxjs/Observable";

import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { UserFormPage } from "../pages/user-form/user-form";
import { UserDisplayPage } from "../pages/user-display/user-display";
import { LoginPage } from "../pages/login/login";

import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { UserProvider } from "../providers/user/user";

export interface UserParam {
  displayName: string;
  email: string;
  photoURL: string;
  uid;
}

export interface Patient {
  address: string;
  age: Number;
  eContact: string;
  fName: string;
  lName: string;
  mConditions: string;
  prescriptions: string;
  uid: string;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string; component: any }>;
  user: Observable<firebase.User>;
  public isLoggedIn: Boolean;
  public userParam: UserParam;
  public patient: Patient;
  public userRegisteredObs: Observable<any>;
  public userRegistered: boolean;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthServiceProvider,
    public userService: UserProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage },
      { title: "List", component: ListPage },
      { title: "Form", component: UserFormPage }
    ];

    this.authService.afAuth.authState.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
        this.userParam = { displayName: "", email: "", photoURL: "", uid: "" };
      } else {
        this.isLoggedIn = true;
        this.userParam = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        };
        authService
          .userHasRegistered(this.userParam.email)
          .subscribe(userIsRegistered => {
            let _email = '';
            if (userIsRegistered[0]['email']) {
              _email = userIsRegistered[0]['email']
            }
            let _userRegistered =
              userIsRegistered.length > 0 ? _email === this.userParam.email ? (this.userRegistered = true) : (this.userRegistered = false) : (this.userRegistered = false);
            if (_userRegistered) {
              this.userService
                .getPatientByUID(this.userParam.uid)
                .subscribe(patient => {
                  let curPatient: any = patient[0];
                  this.patient = {
                    age: curPatient.age,
                    address: curPatient.address,
                    eContact: curPatient.eContact,
                    fName: curPatient.fName,
                    lName: curPatient.lName,
                    mConditions: curPatient.mConditions,
                    prescriptions: curPatient.prescriptions,
                    uid: curPatient.uid
                  };
                  this.nav.push(UserDisplayPage, this.patient);
                });
            } else {
              this.nav.push(UserFormPage, this.userParam);
            }
          });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
