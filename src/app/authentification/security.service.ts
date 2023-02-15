import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/model/user';

const TOKEN_KEY='auth_token';

@Injectable({
  providedIn: 'root'
})


export class SecurityService {

  authState = new BehaviorSubject(false);

  constructor(private storage: Storage,private plt: Platform) {
    this.plt.ready().then(()=>{
        this.checkToken();
    });
  }


  login(){
      return this.storage.set(TOKEN_KEY,'admin123').then(res=>{
        this.authState.next(true);
      });
  }


  logout(){
    return this.storage.remove(TOKEN_KEY).then(res=>{
      this.authState.next(false);
    });
  }


  isAuth(){
    return this.authState.value;
  }


  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res=>{
      if(res){
        this.authState.next(true);
      }
    });
  }





}

