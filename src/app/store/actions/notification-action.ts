import { Action } from "@ngrx/store";
import { TodoActionTypes } from "./todo-actions";

export class ActionParent implements Action{
    type: any;
    payload:any;
}

export class TodoAdd implements Action{
    type =  TodoActionTypes.Add;
    constructor(public payload: any){}
}

export class TodoRemove implements Action{
    type =  TodoActionTypes.Remove;
    constructor(public payload: any){}
}