export class PlayerModel {
    inviteToJoinStatus : string = 'yes'
    notifyTeam: string = "yes";
    userName:string
    teamId:string
    memberId: string
    firstName:string
    lastName:string
    emailAddress:string
    mobileNumber:string
    countryCode:string = '91-';
    mobileNumberWithoutCountryCode:string
    street:string
    city:string
    dateOfBirth:any  = '';
    gender:string
    jerseyNumber:number
    nonPlayerStatus:string
    playerPosition:number
    state:string
    memberRole:string ="player"
    isManager:boolean = false;
    zipOrPostalCode:string

    constructor(){
    }
}
