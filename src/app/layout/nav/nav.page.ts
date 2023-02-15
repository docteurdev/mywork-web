import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { read } from 'fs';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.page.html',
  styleUrls: ['./nav.page.scss'],
})
export class NavPage implements OnInit {

  notification;


  constructor(private navCtrl: NavController,
    private router: Router,
    private tabsPage: TabsPage,
    public alertController: AlertController) { }

  redirectNotif() {
    this.navCtrl.navigateRoot('/notification');
  }

  redirect() {
    this.navCtrl.navigateRoot('/login');
  }

  redirectToParam() {
    this.navCtrl.navigateRoot('/settings');
  }

  async activeDidacticielAlert() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Le Didacticiel est déjà activé',
      subHeader: '',
      message: '',
      buttons: [
        {
          text: 'Ok',
        },
        {
          text: 'Désactiver',
          handler: () => {
            this.tabsPage.isValidated = false;
            window.location.reload();
          }
        },
      ]
    });
    await alert.present();
  }

  activeDidacticiel() {
    if (this.tabsPage.isValidated) {
      this.tabsPage.removeRepeatedAlert();
      this.activeDidacticielAlert();
    } else {
      localStorage.setItem('activeDidacticiel', 'true');
      this.navCtrl.navigateRoot('/');
      this.tabsPage.activePopups();
    }
  }

  ngOnInit() { }
}
