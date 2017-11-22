import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
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

import { LoginPage } from '../login/login';

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

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
  public loggedInUser: string;
  public loggedInUserPhoto: string;
  public patientDisplay: User;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    public auth: AuthServiceProvider,
    public toastCtrl: ToastController


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
    this.nav.push(UserDisplayPage, data);
  }

  logout() {
    this.auth.signOut().then((data) => {
      this.nav.push(LoginPage);
    })
  }

  displayUserWelcome() {
    this.loggedInUser = this.navParams.get('displayName');
    this.loggedInUserPhoto = this.navParams.get('photoURL');
    let toast = this.toastCtrl.create({
      message: 'Welcome, ' + this.loggedInUser,
      duration: 5000
    });
    toast.present();
  }

  private isEditDisplay() {
    let _navprms = this.navParams;
    if (_navprms.get('fName')) {
      this.patientDisplay = {
        fName: _navprms.get('fName'),
        lName: _navprms.get('lName'),
        age: _navprms.get('age'),
        address: _navprms.get('address'),
        eContact: _navprms.get('eContact'),
        mConditions: _navprms.get('mConditions'),
        prescriptions: _navprms.get('prescriptions')
      }
      return true;
    }
    return false;
  }

  ionViewDidLoad() {
    //this.displayUserWelcome();
    let _isEditDisplay = this.isEditDisplay();
    console.log("ionViewDidLoad UserFormPage");
  }
}
