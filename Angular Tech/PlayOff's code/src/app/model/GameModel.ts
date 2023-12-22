
export class GameModel {
    teamId?: string
    gameId?: string
    userName?: string
    notifyTeam: string = '';
    gameTimeZone: string
    gameDate: any
    gameTime: string
    gameTimeToBeDecide: string
    location: string
    locationDetails: string
    gameAssignments: string[]
    gameTeamType: string
    gameDurationHours: string
    gameDurationMinutes: string
    gameDurationTotal?:string = '';
    arriveEarlyInfo: string
    gameLatitude:string
    gameLongitude:string
    gameOpponentData?: {
        teamId?: string
        gameId?: string
        contactPersonName: string
        emailAddress: string
        mobileNo: string
        countryCode: string
        mobileNoForDisplay: string
        teamName?: string
    }
    gameAssignmentsData?: [
        {
            gameAssignmentId: string
            gameAssignmentName: string
            gameId: string
            defaultAssignment: boolean
        }
    ]
    customGameAssignments: string[]
    removedAssignments:string[]
    gameNotes: string

    constructor(){
        this.notifyTeam = "yes";
        this.gameOpponentData = {
            teamId: '',
            gameId: '',
            contactPersonName: '',
            emailAddress: '',
            mobileNo: '',
            countryCode: '91-',
            mobileNoForDisplay: '',
            teamName: ''
        };
    }

}