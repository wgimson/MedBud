import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserDisplayPage } from '../user-display/user-display';

/**
 * Generated class for the UserFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserFormPage {
  public todo: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: [''],
      age: [''],
      address: [''],
      econtact: [''],
      mconditions: [''],
      prescriptions: [''],
    });
  }

  logForm(){
    console.log(this.todo.value);
    console.log('The patients name is ' + this.todo.value.fname + ' ' + this.todo.value.lname +
                ' andhe /she suffers from ' + this.todo.value.mconditions);
    this.goToDisplayPage();
  }

  goToDisplayPage() {
    let data = this.todo.value;
    this.navCtrl.push(UserDisplayPage, data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserFormPage');
  }

}
