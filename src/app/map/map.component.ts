import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

//маркеры, в виде капли, которые показывают местоположение
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  latlng: L.LatLng;
  lat: number; //latitude - широта
  lon: number; //longitude - долгота



  constructor() { 
this.latlng  = new L.LatLng(0,0);
this.lat = 0;
this.lon = 0;
  }
//выполняется после того, как html загрузится
  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    //watchPosition muuttaa sijaintia tausta-ajona jos käyttäjä liikkuu
    //sijainta ei tarvitse reffata
    navigator.geolocation.watchPosition((pos) => {
      
      this.latlng = new L.LatLng(pos.coords.latitude, pos.coords.longitude);       


this.lat = pos.coords.latitude;
this.lon = pos.coords.longitude;

      this.map = L.map('map').setView(this.latlng, 13);     

      // add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(this.map);

      // show the scale bar on the lower left corner
      L.control.scale().addTo(this.map);

      // show a marker on the map
      L.marker(this.latlng).bindPopup('The center of the world').addTo(this.map); 
      //jos lat больше чем 59, тогда появляется notificatio
if (this.lat > 59 ) {
  this.notifyMe();
}


     });
}

private notifyMe() {
  // Let's check if the browser supports notifications
  /*if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }*/

  // Let's check whether notification permissions have already been granted
   if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    const no = new Notification("Olet nyt 59 leveyspiirin pohjoispuolella!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const no = new Notification("Olet nyt 59 leveyspiirin pohjoispuolella!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
}
