import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { PopupMessages } from 'src/mocks/popMessages.mocks';
import { filter } from 'rxjs/operators';
import { ServicesMenu } from 'src/app/modules/services-home/services-home.page';
import { TabsService } from '../tabs.service';
import { GeneralFunctions } from 'src/app/services/general-functions';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  alert;
  allMessages;
  allFilDactualiteMessageMocks: any;
  allServicesMessageMocks: any;
  allCartographieMessageMocks: any;
  isValidated = false;
  isDidacticielActive: any;
  activePopup: boolean = true;
  showpopUp: boolean;
  currentService;
  activeDidacticiel: any = [];
  activeServiciel: boolean = false;
  activeAlert = {
    cssClass: 'popup-container',
    header: `Réactivation du Didacticiel`,
    message: '<p class="paraphPopup" style="text-align:center;">Ce mode réactive toutes les <br> pages du didacticiel</p>',
    backdropDismiss: false,
    buttons: [
      {
        text: 'Valider',
        handler: (e) => {
          setTimeout(() => {
            this.isValidated = true;
            this.didacticielAlert(this.allMessages);
          }, 1000);
        }
      },
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          this.activePopup = false;
          this.isValidated = false;
          localStorage.removeItem('activeDidacticiel');
        }
      },
    ]
  };

  constructor(
    public alertController: AlertController,
    private router: Router,
    public messagesMocks: PopupMessages,
    public serviceMenu: ServicesMenu,
    public tabsService: TabsService,
    public generalFunctions: GeneralFunctions,

  ) {
    router.events.subscribe((val) => {
      if (location.pathname === '/tabs/map') {
        document.getElementsByTagName('ion-toolbar')[0].style.display = 'none';
        document.getElementsByTagName('ion-tab-bar')[0].style.display = 'flex';
      } else if (location.pathname === '/tabs/tab2') {
        document.getElementsByTagName('ion-toolbar')[0].style.display = 'block';
        document.getElementsByTagName('ion-tab-bar')[0].style.display = 'flex';
      } else {
        document.getElementsByTagName('ion-toolbar')[0].style.display = 'block';
        document.getElementsByTagName('ion-tab-bar')[0].style.display = 'flex';
      }
    });
  }

  async didacticielAlert(messageMocks) {
    if (this.isValidated) {
      this.alert = await this.alertController.create({
        cssClass: 'container',
        header: 'Didacticiel',
        message: messageMocks[0].text,
        backdropDismiss: false,
      });
      this.generalFunctions.popupCss();
      this.removeRepeatedAlert();
      this.nextMessage(messageMocks)
      if (location.pathname === "/tabs/tab2") {
        (<HTMLStyleElement>document.querySelector(".alert-head span")).addEventListener("click", (e) => {
          if (messageMocks.length !== 1) {
            messageMocks.shift();
          }
        })
      } else if (location.pathname === "/tabs/tab1") {
        messageMocks = this.allServicesMessageMocks;
        (<HTMLStyleElement>document.querySelector(".alert-head span")).addEventListener('click', () => {
          this.activeServiciel = true;
          this.detectchange(messageMocks);
        })
      }
    } else {
      if (this.activePopup || localStorage.getItem('activeDidacticiel')) {
        this.alert = await this.alertController.create(this.activeAlert);
        this.generalFunctions.popupCss();
        (<HTMLStyleElement>document.querySelector(".alert-head span")).style.color = "";
        (<HTMLStyleElement>document.querySelector(".alert-head span")).style.display = "none";
        if (!this.activePopup) {
          this.removeRepeatedAlert();
        }
      }
    }
    await this.alert.present();
    const { role } = await this.alert.onDidDismiss();
  }

  nextMessage(messageMocks) {
    var compteur = 1;
    (<HTMLStyleElement>document.querySelector(".alert-head span")).addEventListener("click", (e) => {
      console.log(2)
      var htmlText = (<HTMLStyleElement>document.querySelector(".alert-message"));
      if (messageMocks === this.allCartographieMessageMocks) {
        setTimeout(() => {
          this.generalFunctions.popUpCartographieCss();
        }, 1);
      }
      if (messageMocks.length <= compteur) {
        var popUp = (<HTMLStyleElement>document.querySelector(".sc-ion-alert-ios-h"));
        popUp.parentElement.removeChild(popUp);
      } else {
        if (location.pathname === "/tabs/tab2") {
          messageMocks = this.allFilDactualiteMessageMocks;
          var htmlText = (<HTMLStyleElement>document.querySelector(".alert-message"));
          htmlText.innerHTML = messageMocks[compteur++].text;
        }
        else if (location.pathname === "/tabs/map") {
          messageMocks = this.allCartographieMessageMocks;
          htmlText.innerHTML = '<ion-slides><ion-slide class="localisation">' + messageMocks[1].text
            + '</ion-slide> <ion-slide class="guidage">' + messageMocks[2].text +
            '</ion-slide> <ion-slide class="interaction">' + messageMocks[3].text + '</ion-slide> </ion-slides>';
          this.generalFunctions.deleteAlert();
        }
        localStorage.removeItem('activeDidacticiel');
      }
    });
  }

  detectchange(messageMocks) {
    this.tabsService.changeData(null)
    this.tabsService.status.subscribe((val) => {
      this.currentService = val;
      if (this.currentService === "gestion_espace") {
        this.serviceielPopups(messageMocks[2])
      } else if (this.currentService === "travail_collaboratif") {
        this.serviceielPopups(messageMocks[1])
      } else if (this.currentService === "bien_etre") {
        this.serviceielPopups(messageMocks[3])
      } else if (this.currentService === "mobilité") {
        this.serviceielPopups(messageMocks[7])
      } else if (this.currentService === "mission") {
        this.serviceielPopups(messageMocks[8])
      } else if (this.currentService === "securite") {
        this.serviceielPopups(messageMocks[4])
      } else if (this.currentService === "informations") {
        this.serviceielPopups(messageMocks[5])
      } else if (this.currentService === "stats") {
        this.serviceielPopups(messageMocks[6])
      }
    });
  }

  async serviceielPopups(messageMocks?) {
    this.alert = await this.alertController.create({
      cssClass: 'container',
      header: 'Didacticiel',
      message: messageMocks.text,
      backdropDismiss: false,
    });
    this.generalFunctions.popupCss();
    this.removeRepeatedAlert()
    await this.alert.present();
    const { role } = await this.alert.onDidDismiss();
  }

  removeRepeatedAlert() {
    setTimeout(() => {
      var repeatedPopup = document.getElementsByTagName("ion-alert")
      if (repeatedPopup.length > 1) {
        for (var i = 0; i < repeatedPopup.length; i++) {
          var alert = document.querySelector('ion-alert')
          alert.parentElement.removeChild(alert);
        }
        this.generalFunctions.popupCss();
        this.nextMessage(this.messagesMocks)
      }
    }, 1);
  }

  activePopups() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(() => {
        if (location.pathname === "/tabs/tab1") {
          this.allMessages = this.allServicesMessageMocks;
          this.didacticielAlert(this.allMessages);
        } else if (location.pathname === "/tabs/tab2") {
          this.allMessages = this.allFilDactualiteMessageMocks;
          this.didacticielAlert(this.allMessages);
        } else {
          this.allMessages = this.allCartographieMessageMocks;
          this.didacticielAlert(this.allMessages);
        }
      });
  }

  ngOnInit() {
    this.activeDidacticiel = localStorage.getItem('activeDidacticiel');
    var notif = localStorage.getItem('notification');
    this.tabsService.activePopups.subscribe((val) => {
      if (val == true) {
        setTimeout(() => {
          this.allMessages = this.allFilDactualiteMessageMocks;
          this.didacticielAlert(this.allMessages);
          this.activePopups()
        }, 500);
      }
    });
    this.allFilDactualiteMessageMocks = this.messagesMocks.getMessagesFilDactualite();
    this.allServicesMessageMocks = this.messagesMocks.getMessagesServices();
    this.allCartographieMessageMocks = this.messagesMocks.getMessagesCartographie();
  }
}
