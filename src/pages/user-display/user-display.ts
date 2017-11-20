// ANGULAR IMPORTS
import { Component } from "@angular/core";
// IONIC IMPORTS
import { IonicPage, NavController, NavParams } from "ionic-angular";
// PAGES
import { LoginPage } from "../login/login";
import { UserFormPage } from '../user-form/user-form';
// PROVIDERS
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

// INTERFACES
export interface Patient {
  fName: string;
  lName: string;
  age: string;
  address: string;
  eContact: string;
  mConditions: string;
  prescriptions: string;
}
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
  public patient: Patient;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider
  ) {}

  private writePatientInfo() {
    this.patient = {
      fName: this.navParams.get("fName"),
      lName: this.navParams.get("lName"),
      age: this.navParams.get("age"),
      address: this.navParams.get("address"),
      eContact:this.navParams.get("eContact"),
      mConditions: this.navParams.get("mConditions"),
      prescriptions: this.navParams.get("prescriptions")
    }
  }

  public logout() {
    this.authService.signOut().then(data => {
      this.navCtrl.push(LoginPage);
    });
  }

  public edit() {
    debugger;
    this.navCtrl.push(UserFormPage, this.patient);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserDisplayPage");
    this.writePatientInfo();
  }
}
