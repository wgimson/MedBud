import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UserFormPage } from "../user-form/user-form";

// for auth
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
// Rxjs Imports
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

export interface Item { fName: string; lName: number }

@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage implements OnInit {
  selectedItem: any;
  icons: string[];
  itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFirestore
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get("item");

    // Let's populate this page with some filler content for funzies
    this.icons = [
      "flask",
      "wifi",
      "beer",
      "football",
      "basketball",
      "paper-plane",
      "american-football",
      "boat",
      "bluetooth",
      "build"
    ];

/*     db
      .collection("items")
      .add({
        fName: "Billy",
        lName: "Gimson"
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      }); */
  }

  ngOnInit() {
    this.itemCollection = this.db.collection('items');
    this.items = this.itemCollection.valueChanges();
  }

  /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    })
  } */
}
