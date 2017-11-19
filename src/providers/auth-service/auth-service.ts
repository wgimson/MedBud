import { Injectable } from "@angular/core";

import { NavController } from "ionic-angular";

import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";

export class User {
  uid: any;
  displayName: string;
  photoURL: string;
  email: string;

  constructor(name: string, email: string) {
    this.displayName = name;
    this.email = email;
  }
}
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {}

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  public getUserByUid(uid) {
    debugger;
    return this.afs
      .collection("users", ref => ref.where("uid", "==", uid))
      .valueChanges();
  }

  public getPatientByUid(uid) {
    debugger;
    return this.afs
      .collection("patients", ref => ref.where("uid", "==", uid))
      .valueChanges();
  }

  public signOut() {
    return this.afAuth.auth.signOut();
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data);
  }
}
