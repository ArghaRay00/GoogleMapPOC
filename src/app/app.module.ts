import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Geolocation } from "@ionic-native/geolocation";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { MapPage } from "../pages/map/map";
import { AddressPage } from "../pages/address/address";
@NgModule({
  declarations: [MyApp, HomePage, MapPage, AddressPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, MapPage, AddressPage],
  providers: [StatusBar, SplashScreen, Geolocation]
})
export class AppModule {}
