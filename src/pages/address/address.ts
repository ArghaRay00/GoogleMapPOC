import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-address",
  templateUrl: "address.html"
})
export class AddressPage {
  buildAddress: any;

  constructor(
    public navController: NavController,
    public navParams: NavParams
  ) {
    this.buildAddress = navParams.get("data");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddressPage");
  }
}
