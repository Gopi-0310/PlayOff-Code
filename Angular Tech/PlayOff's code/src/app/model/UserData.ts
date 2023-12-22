export class UserData {
  userName: string;
  userFirstName: string;
  userLastName: string;
  memberId:string;
  currentTeam: { teamName: string; teamID: string };
  currentURL: string;
  lastURL: string;
  actionData: {actionName: string, data: any};
  isManager: boolean = false;
  actionMessage: string = "";
  memberRole:string;

  constructor() {
    this.userName = "";
  }

  getUserName(): string {
    return this.userName;
  }
  setUserName(userName: string): void {
    this.userName = userName;
  }

  setUserRole(memberRole:string) {
    this.memberRole = memberRole;
  }

  getUserRole():string {
     return this.memberRole;
  }

  getUserFirstName(): string {
    return this.userFirstName;
  }
  setUserFirstName(userFirstName: string): void {
    this.userFirstName = userFirstName;
  }

  getUserLastName(): string {
    return this.userLastName;
  }
  setUserLastName(userLastName: string): void {
    this.userLastName = userLastName;
  }

  getCurrentTeam(): { teamName: string; teamID: string } {
    return this.currentTeam;
  }
  setCurrentTeam(currentTeam: { teamName: string; teamID: string }): void {
    this.currentTeam = currentTeam;
  }
  getCurrentURL(): string {
    return this.currentURL;
  }
  setCurrentURL(currentURL: string): void {
    this.currentURL = currentURL;
  }
  getLastURL(): string {
    throw new Error("Method not implemented.");
  }
  setLastURL(lastURL: string): void {
    throw new Error("Method not implemented.");
  }

  getActionData(): {actionName: string, data: any} {
    return this.actionData;
  }
  setActionData(actionData: {actionName: string, data: any}): void {
    this.actionData = actionData;
  }

  getIsManager(): boolean {
    return this.isManager;
  }
  setIsManager(isManager: boolean): void {
    this.isManager = isManager;
  }
}
