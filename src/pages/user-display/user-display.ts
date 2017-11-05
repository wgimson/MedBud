import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  writePatientInfo() {
    this.fname = this.navParams.get("fname");
    this.lname = this.navParams.get("lname");
    this.age = this.navParams.get("age");
    this.address = this.navParams.get("address");
    this.econtact = this.navParams.get("econtact");
    this.mconditions = this.navParams.get("mconditions");
    this.prescriptions = this.navParams.get("prescriptions");
    debugger;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserDisplayPage");
    this.writePatientInfo();
  }
}
