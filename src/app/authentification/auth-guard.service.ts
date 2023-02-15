import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private AuthService : SecurityService) {}

    canActivate():boolean{
      return this.AuthService.isAuth();
   }







}
