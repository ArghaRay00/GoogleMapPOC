import { Component } from "@angular/core";
import { MapPage } from "../map/map";
import { AddressPage } from "../address/address";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  tab1Root: any;
  constructor() {
    this.tab1Root = MapPage;
    // this.tab2Root = AddressPage;
  }
}
