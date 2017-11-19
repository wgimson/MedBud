import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { LoginPage } from "../login/login";

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the UserDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-user-display",
  templateUrl: "user-display.html"
})
export class UserDisplayPage {
  fname: string;
  lname: string;
  age: string;
  address: string;
  econtact: string;
  mconditions: string;
  prescriptions: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider
  ) {}

  writePatientInfo() {
    this.fname = this.navParams.get("fName");
    this.lname = this.navParams.get("lName");
    this.age = this.navParams.get("age");
    this.address = this.navParams.get("address");
    this.econtact = this.navParams.get("eContact");
    this.mconditions = this.navParams.get("mConditions");
    this.prescriptions = this.navParams.get("prescriptions");
  }

  logout() {
    this.authService.signOut().then(data => {
      debugger;
      this.navCtrl.push(LoginPage);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserDisplayPage");
    this.writePatientInfo();
  }
}
