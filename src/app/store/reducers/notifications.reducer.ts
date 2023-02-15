/** import { Action } from "@ngrx/store";

export function notifications(state:string,action:Action){
    console.log(state)
    switch (action.type){
        case 'hello':
            return state = 'english'
        case 'hola':
            return state = 'espagnol'
        default:
            return state;
    }

}
import { Action } from "@ngrx/store";
import { createStore } from 'redux'

 interface RoomReservation {
    message:string,
    currentRoom:{}
  }
const intialState = {roomReservation:[]}

 //REDUCER 
export function notificationReducer(state = intialState,action:Action){
    switch (action.type) {
        default:
          return state
        }
   
}
*/