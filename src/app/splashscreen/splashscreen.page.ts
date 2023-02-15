import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { SecurityService } from '../authentification/security.service';
import { Notification } from '../../model/notification';
import { Renderer2 } from '@angular/core';
import { TabsService } from 'src/app/layout/tabs.service';


@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  activeDidacticiel:boolean;

  constructor(
    private router :Router,
    public alertController: AlertController,
    public tabsService : TabsService) {}

  async welcomeAlert() {
    let  notification:Notification = {
      category : 'Accueil',
      title: 'Message de bienvenue',
      description : 'Bienvenue sur le démonstrateur iViPlay !'
    } as Notification;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-popup',
      subHeader: '',
      message: 'Bienvenue sur le démonstrateur iViPlay !',
      backdropDismiss: false ,
      buttons: [
        {
          text: 'Valider',
          handler: () => {
            this.activeDidacticiel = true;
            localStorage.setItem('notification', JSON.stringify(notification));
            this.tabsService.getStatusOfSplashScreen(this.activeDidacticiel)
          }
        }
      ],
    });
    (<HTMLStyleElement>document.querySelector(".alert-button")).style.fontSize ="100%";
    (<HTMLStyleElement>document.querySelector(".alert-button")).style.fontWeight ="normal";
    await alert.present();
  }

  ngOnInit() {
    const that = this;
    if(!localStorage.getItem('notification')) {
      that.welcomeAlert();
    }
      that.router.navigate(['tabs/tab2']);
  }
}
