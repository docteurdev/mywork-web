import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SecurityService } from './authentification/security.service';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store'
import { TodoAdd } from './store/actions/notification-action';
import { Notification } from 'src/app/store/models/notification';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  user;
  notification = {
    message :'Bienvenue sur le démonstrateur iViPlay !'
  }

  constructor(
    private platform:Platform,
    private sercurity:SecurityService,
    private router :Router,
    public alertController: AlertController,
    private store : Store<{notification: Notification[]}>
    ) {
      this.inintializeApp();
      // this.addNotification(this.notification)
    }

  inintializeApp(){
   this.platform.ready().then(() =>{
     this.sercurity.authState.subscribe(state =>{
       if(state){
          this.router.navigate(['/splashscreen']);
        }else{
          this.router.navigate(['login']);
        }
      })
    })
  }

  // addNotification(currentRoom ){
  //   const newNotification = new Notification();
  //   newNotification.notification = currentRoom;
  //   this.store.dispatch(new TodoAdd(newNotification))
  // }
}
