import { AfterViewInit, Component, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { createAnimation } from "@ionic/core";
import { Services } from 'src/mocks/services.mocks';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { NavigationEnd, NavigationExtras, NavigationStart, Router } from '@angular/router';
import * as Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import { TabsService } from 'src/app/layout/tabs.service';
import * as Bowser from "bowser";

@Component({
  selector: 'app-tab1',
  templateUrl: 'services-home.page.html',
  styleUrls: ['services-home.page.scss']
})

export class ServicesMenu implements AfterViewInit, OnInit {

  servicesMocks = [];
  toogle: boolean = false;
  services: any = [];
  currentService;
  disabled: boolean = false;

  constructor(private servicesArray: Services,
    public alertController: AlertController,
    public navController: NavController,
    public tabsService: TabsService,
    private router: Router,) { }


  serviceList(service) {
    if (service.link === 'false') {
      this.demoAlert();
    } else if (!service.link) {
      // this.toogleMode();
      if (service.id == 'gestion_espace') {
        console.log(service)
        this.toogleMode(service.id);
      } else {
        this.toogleMode();
      }
    }
    this.services = service.modules;

    this.tabsService.changeData(service.id)
    this.currentService = service.id
    if (!this.toogle) {
      this.services = []
    }
  }

  openBottomSheet() {
    const animation = createAnimation()
      .addElement(document.querySelector(".bottomSheet"))
      .easing("ease-in-out")
      .duration(400)
      .direction("alternate")
      .keyframes([
        { height: "0px", transform: "scale(1)", opacity: "1", },
        { height: "17rem", transform: "scale(1)", opacity: "1" },
      ]);
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.display = "block";
    animation.play();

  }

  closeBottomSheet() {
    const animation = createAnimation()
      .addElement(document.querySelector(".bottomSheet"))
      .easing("ease-in-out")
      .duration(200)
      .direction("alternate")
      .keyframes([
        { height: "17rem", transform: "scale(1)", opacity: "1", },
        { height: "0px", transform: "scale(1)", opacity: "0", },
      ]);
    animation.play();
  }

  toogleMode(service?) {
    if (!this.toogle) {
      this.toogle = true;
      this.openBottomSheet();
    } else {
      this.toogle = false;
      this.closeBottomSheet();
    }
  }

  async demoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-popup',
      subHeader: '',
      message: 'Fonctionnalité non activée en mode Démo',
      buttons: [
        {
          text: 'Ok',
          handler: (alertData) => {
            (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.display = "none";
          }
        }
      ],
    });
    await alert.present();
  }

  ngAfterViewInit() {
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.display = "none";
    this.servicesMocks = this.servicesArray.getAll();
  }

  ngOnInit() { }
}
