import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ActionTypes {
    
    createTeam: 'createTeam'
    editTeam: 'editTeam'
    teamDetails: 'teamDetails'

    constructor(){
    }
}
