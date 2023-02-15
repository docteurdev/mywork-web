import { TodoActionTypes } from "../actions/todo-actions";
import { ActionParent } from "../actions/notification-action";
import { Notification } from "../models/notification";


export const initialNotificationState : Notification [] = [
  
];

export function notificationReducer(state=initialNotificationState,action:ActionParent){
    switch(action.type){
        case TodoActionTypes.Add:
            return [...state,action.payload]
        case TodoActionTypes.Remove:
            [...state.splice(action.payload,1)]
            return [...state]
        default : return state
    }
}
