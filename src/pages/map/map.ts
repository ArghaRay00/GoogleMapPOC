import { Component, NgZone } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation";
import { LoadingController, NavController } from "ionic-angular";
import { AddressPage } from "./../address/address";
declare var google: any;
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  map: any;
  markers: any;
  autoComplete: any;
  googleAutoComplete: any;
  geocoder: any;
  autoCompleteItems: any;
  loading: any;
  currentLatitude: any;
  currentlongitude: any;
  buildAddress: any;

  constructor(
    public zone: NgZone,
    public geoLocation: Geolocation,
    public loadingController: LoadingController,
    public navController: NavController
  ) {
    this.geocoder = new google.maps.Geocoder();
    this.googleAutoComplete = new google.maps.places.AutocompleteService();
    this.autoComplete = {
      input: ""
    };
    this.autoCompleteItems = [];
    this.markers = [];
    this.loading = this.loadingController.create();
    this.currentLatitude = 12.9716; //By default I have given Bangalore Lat long .
    this.currentlongitude = 77.5946;
  }
  ionViewWillEnter() {
    this.tryGeolocation();
  }
  ionViewDidEnter() {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.currentLatitude, lng: this.currentlongitude },
      zoom: 15
    });
  }

  tryGeolocation() {
    this.loading.present();
    this.clearMarkers();
    this.geoLocation
      .getCurrentPosition()
      .then(response => {
        this.currentLatitude = response.coords.latitude;
        this.currentlongitude = response.coords.longitude;
        // let pos = {
        //   lat: response.coords.latitude,
        //   lng: response.coords.longitude
        // };
        let pos = {
          lat: this.currentLatitude,
          lng: this.currentlongitude
        };

        let marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: "Your Current Location"
        });
        this.markers.push(marker);
        this.map.setCenter(pos);

        this.buildAddress =
          "https://www.google.com/maps/search/?api=1&query=" + // browse the address to check if its working
          this.currentLatitude +
          "," +
          this.currentlongitude;

        this.loading.dismiss();

        console.log(this.buildAddress);
      })
      .catch(error => {
        console.log("Error getting your current location", error);
        this.loading.dismiss();
      });
  }

  updateSearchResults() {
    if (this.autoComplete.input == "") {
      this.autoCompleteItems = [];
      return;
    }
    this.googleAutoComplete.getPlacePredictions(
      {
        input: this.autoComplete.input
      },
      (predictions, status) => {
        this.autoCompleteItems = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach(element => {
              this.autoCompleteItems.push(element);
            });
          });
        }
      }
    );
  }

  selectSearchResult(item) {
    this.clearMarkers();
    this.autoCompleteItems = [];
    this.geocoder.geocode(
      {
        placeId: item.place_id
      },
      (results, status) => {
        if (status === "OK" && results[0]) {
          let marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map
          });
          this.currentLatitude = results[0].geometry.location.lat(); // Current lat long is updated if set from searchBAr
          this.currentlongitude = results[0].geometry.location.lng();

          this.buildAddress =
            "https://www.google.com/maps/search/?api=1&query=" + //building the searchLink
            this.currentLatitude +
            "," +
            this.currentlongitude;

          console.log(this.buildAddress); // browse the address to check if its working
          this.markers.push(marker);
          this.map.setCenter(results[0].geometry.location);
        }
      }
    );
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i]); //for logging whether markers getting removed
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  pushCurrentAddress(buildAddress) {
    //create a url object here.
    // buildAddress is of the format:-
    // https://www.google.com/maps/search/?api=1&query=<lat>,<lng>
    this.buildAddress = buildAddress || "buildAddress is empty";
    this.navController.push(AddressPage, {
      data: this.buildAddress
    });
  }
}
