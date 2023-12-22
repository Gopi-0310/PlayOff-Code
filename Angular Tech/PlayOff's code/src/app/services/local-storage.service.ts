import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageRefService } from "./local-storage-ref.service";
import { UserData } from "../model/UserData";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  private _localStorage: Storage;
  private _userData$ = new BehaviorSubject<UserData>(null);
  public userData$ = this._userData$.asObservable();

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = this._localStorageRefService.localStorage;
    if(this._localStorageRefService.localStorage.getItem("userData") && this._localStorageRefService.localStorage.getItem("userData") != 'null'){
      this._userData$.next(JSON.parse(this._localStorageRefService.localStorage.getItem("userData")));
    }else{
      //Temp 
        let userData = new UserData();
        this. _localStorageRefService.localStorage.setItem("userData", JSON.stringify(userData));
      this._userData$.next(userData);
    };
    this.userData$.subscribe({
      next(userData) {
        const jsonData = JSON.stringify(userData);
        _localStorageRefService.localStorage.setItem("userData", jsonData);
      },
    });

  }

  getUserFirstName() {
    const userData = this.getUserData();
    return userData ? userData.userFirstName : '';
  }

  getUserLastName() {
    const userData = this.getUserData();
    return userData ? userData.userLastName : '';
  }

  setUserFirstAndLastName(userFirstName: string, userLastName: string) {
    const userData = this.getUserData();
    userData.userFirstName = userFirstName;
    userData.userLastName = userLastName;
    this._userData$.next(userData); 
  }

  setUserName(userName: string) {
    const userData = this.getUserData();
    userData.userName = userName;
    this._userData$.next(userData);
    
  }
  setUserRole(memberRole: string) {
    const userData = this.getUserData();
    userData.memberRole = memberRole;
    this._userData$.next(userData);
  }

  getUserRole() {
    const userData = this.getUserData();
    return userData ? userData.memberRole : '';
  }

  getUserName() {
    const userData = this.getUserData();
    return userData ? userData.userName : '';
  }

  setUserData(userData:UserData) {
    this._userData$.next(userData);
  }

  getUserData(): UserData {
    return this._userData$ && this._userData$.value ? this._userData$.value : new UserData();
  }

  
  setUserTeam(currentTeam: { teamName: string; teamID: string }) {
    const userData = this.getUserData();
    userData.currentTeam = currentTeam;
    this._userData$.next(userData);
  }
  

  getUserTeamID(): string {
    const userData = this.getUserData();
    return userData.currentTeam ? userData.currentTeam.teamID : '';
  }

  getUserTeamName(): string {
    const userData = this.getUserData();
    return userData.currentTeam ? userData.currentTeam.teamName : '';
  }

  getUserActionData(): {actionName: string, data: any} {
    const userData = this.getUserData();
    return userData.actionData ? userData.actionData : {actionName: '', data: {}};
  }

  setUserActionData(actionData:{actionName: string, data: any}) {
    const userData = this.getUserData();
    userData.actionData = actionData;
    this._userData$.next(userData);
  }

  getIsManager(): boolean {
    const userData = this.getUserData();
    return userData ? userData.isManager : false;
  }

  setIsManager(isManager:boolean = false) {
    const userData = this.getUserData();
    userData.isManager = isManager ? true : false;
    this._userData$.next(userData);
  }

  getActionMessage(): string {
    const userData = this.getUserData();
    return userData ? userData.actionMessage : "";
  }

  setActionMessage(message: string) {
    const userData = this.getUserData();
    userData.actionMessage = message;
    this._userData$.next(userData);
  }


  clearUserInfo() {
    this._localStorage.removeItem("userData");
    this._userData$.next(null);
  }

  clearAllLocalStorage() {
    this._localStorage.clear();
    this._userData$.next(null);
  }
}
