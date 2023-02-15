import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as MapwizeUI from 'mapwize-ui'
import { GeneralFunctions } from 'src/app/services/general-functions';

@Component({
  selector: 'app-redirect-to-map',
  templateUrl: './redirect-to-map.page.html',
  styleUrls: ['./redirect-to-map.page.scss'],
})
export class RedirectToMapPage implements OnInit {

   
    constructor(public router : Router,
                public generalFunctions: GeneralFunctions) { }
                 
  currentMap:any;

  ngOnInit() {
    const options = {
      apiKey: '6ee4fd2b3531c7b2609c77ca74ee5add',
      centerOnVenueId: '5d8a191fb99124002d154c93',
      preferredLanguage:'fr',
      container: 'mapwize',
      zoom: 20,
      mainColor: '#ff0000',
    }
    this.currentMap = {
      id: this.router.getCurrentNavigation().extras.state.id,
      mapWizeId: this.router.getCurrentNavigation().extras.state.mapWizeId,
    };
    MapwizeUI.map(options).then((map) => {
      this.generalFunctions.mapCss(map,'/tabs/tab2')
      MapwizeUI.Api.getPlace(this.currentMap.mapWizeId).then((place) => {
        const position = {
          latitude: place.marker.latitude,
          longitude: place.marker.longitude,
          floor: 2,
        };
        map.addMarker(position)
        .then(function(mapInstance){
        })
        .catch((err) => {
          alert('Erreur probème serveur veuillez réssayer plus tard');
        });
      });
    });
  }
}
