import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { UserDisplayPage } from "../user-display/user-display";

// for auth
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
// Rxjs Imports
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

export interface User {
  fName: string;
  lName: string;
  age: Number;
  address: string;
  eContact: string;
  mConditions: string;
  prescriptions: string;
}

/**
 * Generated class for the UserFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-user-form",
  templateUrl: "user-form.html"
})
export class UserFormPage {
  public user: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private db: AngularFirestore
  ) {
    this.user = this.formBuilder.group({
      fname: ["", Validators.required],
      lname: [""],
      age: [""],
      address: [""],
      econtact: [""],
      mconditions: [""],
      prescriptions: [""]
    });
  }

  logForm() {
    debugger;
    let data = this.user.value;
    this.db.collection('patients').add({
      'fName': data.fname,
      'lName': data.lname,
      'age': data.age,
      'address': data.address,
      'eContact': data.econtact,
      'mConditions': data.mconditions,
      'prescriptions': data.prescriptions
    });
    this.goToDisplayPage();
  }

  goToDisplayPage() {
    let data = this.user.value;
    this.navCtrl.push(UserDisplayPage, data);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserFormPage");
  }
}
