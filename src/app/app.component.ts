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
import { LoginPage } from "../pages/login/login";

import { AuthServiceProvider } from "../providers/auth-service/auth-service";

export interface UserParam {
  displayName: string,
  email: string,
  photoURL: string
};

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

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthServiceProvider,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage },
      { title: "List", component: ListPage },
      { title: "Form", component: UserFormPage }
    ];

    this.authService.afAuth.authState.subscribe(
      (user) => {
        if (user == null) {
          console.log("Logged out");
          this.isLoggedIn = false;
          this.userParam = { displayName: '', email: '', photoURL: '' };
          this.nav.push(LoginPage);
        } else {
          this.isLoggedIn = true;
          this.userParam = { displayName: user.displayName, email: user.email, photoURL: user.photoURL };
          console.log("Logged in");
          this.nav.push(UserFormPage, this.userParam);
        }
      }
    );
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
