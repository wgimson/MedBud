// ANGULAR IMPORTS
import { Component, ViewChild } from "@angular/core";
// IONIC IMPORTS
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
// FIREBASE IMPORTS
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
// RXJS IMPORTS
import { Observable } from "rxjs/Observable";
// PAGES
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { UserFormPage } from "../pages/user-form/user-form";
import { UserDisplayPage } from "../pages/user-display/user-display";
import { LoginPage } from "../pages/login/login";
// SERVICES
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { UserProvider } from "../providers/user/user";

// INTERFACES
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

// COMPONENT
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string; component: any }>;
  public isLoggedIn: Boolean;
  public userParam: UserParam;
  public patient: Patient;

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
        this.clearUserObject();
      } else {
        this.isLoggedIn = true;
        this.userParam = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        };
        authService.getPatientByUid(this.userParam.uid).subscribe(patient => {
          let _uid = "";
          if (patient[0]["uid"]) {
            _uid = patient[0]["uid"];
          }
          let _correctlyRegistered = this.patientIsCorrectlyRegistered(_uid);
          if (_correctlyRegistered) {
            let _patientParam = this.buildPatientParamObject(patient[0]);
            this.nav.push(UserDisplayPage, _patientParam);
          } else {
            this.nav.push(UserFormPage, this.userParam);
          }
        });
      }
    });
  }

  // PUBLIC FUNCTIONS
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

  // PRIVATE FUNCTIONS
  private buildPatientParamObject(patient) {
    return (this.patient = {
      age: patient.age,
      address: patient.address,
      eContact: patient.eContact,
      fName: patient.fName,
      lName: patient.lName,
      mConditions: patient.mConditions,
      prescriptions: patient.prescriptions,
      uid: patient.uid
    });
  }

  private patientIsCorrectlyRegistered(uid) {
    return this.userParam.uid === uid ? true : false;
  }

  private clearUserObject() {
    this.isLoggedIn = false;
    this.userParam = { displayName: "", email: "", photoURL: "", uid: "" };
  }
}
