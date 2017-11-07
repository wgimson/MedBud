import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  Loading
} from "ionic-angular";

import { HomePage } from "../home/home";
import { UserFormPage } from "../user-form/user-form";

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: "", password: "" };
  userData: any;

  constructor(
    private nav: NavController,
    public auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  public createAccount() {
    this.nav.push("RegisterPage");
  }

  googleLogin() {
    this.auth.googleLogin().then((data) => {
      this.nav.push(UserFormPage)
    });
  }

  logout() {
    this.auth.signOut().then((data) => {
      this.nav.push(LoginPage);
    })
  }

  // TO SPIN UP OUR OWN LOGIN ONE DAY
  public login() {
    /*
    this.showLoading()
    let creds = this.registerCredentials;
    this.auth.googleLogin().subscribe(allowed => {
      if (allowed) {
        this.nav.setRoot('HomePage');
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      }); */
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: "Fail",
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present(prompt);
  }
}
