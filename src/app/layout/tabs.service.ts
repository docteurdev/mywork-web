import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  serviceValue: Subject<boolean> = new Subject<boolean>();
  constructor()  {}
  public status: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public activePopups: BehaviorSubject<any> = new BehaviorSubject<any>(false);


  changeData(value: any) {
    this.status.next(value);
  }

  getStatusOfSplashScreen(value: any){
      this.activePopups.next(value);
  }
}
