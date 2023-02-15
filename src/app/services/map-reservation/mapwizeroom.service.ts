import { Injectable } from '@angular/core';
import { MapWizeRooms } from 'src/mocks/mapWizeRooms';
import { MapWizeRoom } from 'src/model/roomType';

@Injectable({
  providedIn: 'root'
})
export class MapwizeroomService {

  constructor(private mapwizeRoom : MapWizeRooms) { }

  getAllRooms(){
   return this.mapwizeRoom.getmapWizeRooms();
  }
}
