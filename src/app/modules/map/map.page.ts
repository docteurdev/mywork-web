import { Component, ElementRef, OnInit, AfterViewInit, Renderer2,  } from '@angular/core';
import * as VisioWebRemote  from '../../../assets/js/visioweb.js';
import { Router } from '@angular/router';
import * as MapwizeUI from 'mapwize-ui'
import { NavController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { GeneralFunctions } from 'src/app/services/general-functions';


@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})

export class Map implements OnInit, AfterViewInit {

  class: any;
  isMapBottomSheetOpened: boolean = false;
  observer: Observable<any>;
  isUniverseOpened:boolean=false;


  constructor(
    private elem: ElementRef,
    private navController: NavController,
    public router : Router,
    public elRef : ElementRef,
    public generalFunctions: GeneralFunctions){}

  ngOnInit(){
    // var visioweb = new VisioWebRemote.VisioWebRemote(
    //   document.getElementById('visioweb'),
    //   {hash:'k8002ae3c8a43d9a4c43960838f1fdcd1f83ea5d9'}
    // );
    // document.addEventListener('DOMContentLoaded', function() {
    //   new VisioWebRemote(document.getElementById('visioweb'), {
    //     hash: 'md3b51e0f7a32e4d44322fcf99f5676e1b1b4ac88'
    //   });
    // });
  }

  mapWazeInstance(){
    const options = {
      apiKey: '6ee4fd2b3531c7b2609c77ca74ee5add',
      centerOnVenueId: '5d8a191fb99124002d154c93',
      preferredLanguage:'fr',
      container: 'mapwize',
      mainColor: '#ff0000',
    }
    MapwizeUI.map(options).then((map) => {
    var universeContainer = map._container.parentElement.children[1].shadowRoot.children[1].childNodes[1].childNodes[0].childNodes[0];
    universeContainer.addEventListener('click',()=>{
      this.generalFunctions.changeUniverseIndoorBackground(map)
    })
    const leftContainer = map._container.parentElement.children[1].shadowRoot.children[1].childNodes[1].childNodes[1].children[1].children;
    this.observer = new Observable((observer)=>{
      setInterval(() => {
        observer.next(
          leftContainer.forEach(element => {
            if(element.classList.length > 1){
              element.style.backgroundColor=GeneralFunctions.primaryColor
            }else{
              element.style.backgroundColor=GeneralFunctions.ligthColor
            }
          })
        )
      }, 100);
    });
    this.observer.subscribe((result)=>{});
    let searchBar = map._container.parentElement.children[1].shadowRoot.children[1].childNodes[0].childNodes[0].childNodes[1];
    searchBar.style.paddingLeft='1rem';
    const mapwizeMap = map;
    mapwizeMap.on('mapwize:universechange', function (e) {
      if(e.target.getUniverse().alias === 'default_universe') {
        e.target.setFloor(2);
      } else if(e.target.getUniverse().alias === 'marketingsuite') {
        e.target.setFloor(3);
      }
    });
    this.elem.nativeElement.querySelectorAll('.mapboxgl-control-container').forEach(el => el.remove());
    });
  }

  // ngOnInit(){
    // this.class = (<HTMLStyleElement>document.querySelector("#mapwize"));
    // this.mapWazeInstance();
  // }

  public loadScript(url) {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    console.log(node);
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/visioweb/js/mapviewer.js');
    // new VisioWebRemote(document.getElementById('visioweb'), {
    //   hash: 'md3b51e0f7a32e4d44322fcf99f5676e1b1b4ac88'
    // });
    // document.addEventListener('DOMContentLoaded', function() {
    //   new VisioWebRemote(document.getElementById('visioweb'), {
    //     hash: 'md3b51e0f7a32e4d44322fcf99f5676e1b1b4ac88'
    //   });
    // });
  }
  ionViewDidLeave(){
    // var clas = (<HTMLStyleElement>document.querySelector(".map"));
    // clas.removeChild((<HTMLStyleElement>document.querySelector("#mapwize")))
  }

  ionViewWillEnter(){
    // var clas = (<HTMLStyleElement>document.querySelector(".map"));
    // if(clas.childNodes.length === 0){
    //    clas.insertAdjacentHTML('beforeend','<div id="mapwize"></div>');
    //    (<HTMLStyleElement>document.querySelector("#mapwize")).style.height='100%';
    //    (<HTMLStyleElement>document.querySelector("#mapwize")).style.width='100%';
    //    (<HTMLStyleElement>document.querySelector("#mapwize")).style.position='absolute';
    //    setTimeout(() => {
    //      this.mapWazeInstance();
    //    }, 10);
    // }
  }
}
