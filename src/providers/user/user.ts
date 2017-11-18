import { Injectable } from '@angular/core';

import { AngularFirestore } from "angularfire2/firestore";

import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserProvider {

  constructor(public afs: AngularFirestore) {}

  public getPatientByUID(uid) {
    return this.afs
    .collection("patients", ref => ref.where("uid", "==", uid))
    .valueChanges();
  }

}
