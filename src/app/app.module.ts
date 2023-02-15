import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonIcon, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { RoomReservationPage } from './services/reservation/room-reservation/room-reservation.page';
import { IonicStorageModule } from '@ionic/storage';
import { LogoutPipe } from './authentification/logout.pipe';
import { RoomReservationService } from './services/reservation/room-reservation/room-reservation.service';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ReservationHistoricalPage } from './services/reservation/reservation-historical/reservation-historical.page';
import { StoreModule } from '@ngrx/store';
import { notificationReducer } from './store/reducers/allreducers';
import { ServicesMenu } from './modules/services-home/services-home.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { HeaderOneComponent } from './components/header-one/header-one.component';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB8EAwtn4Xo1mWWyQmmlPyOYvHre6NeRgE'
    // }),
    GoogleMapsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ notification: notificationReducer }),
  ],
  declarations: [
    AppComponent,
    HomePage,
    RoomReservationPage,
    ReservationHistoricalPage,
    LogoutPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [RoomReservationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ServicesMenu,
    CallNumber],


  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
