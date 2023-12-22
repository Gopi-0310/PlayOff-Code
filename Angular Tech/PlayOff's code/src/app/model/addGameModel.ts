
export interface AddGame {
    teamId: string
    gameId?: string
    userName?: string
    notifyTeam: string
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
    gameDurationTotal?:string
    arriveEarlyInfo: string
    gameOpponentData:{
        teamId?: string
        gameId?: string
        contactPersonName: string
        emailAddress: string
        mobileNo: string
        teamName: string
    }
    customGameAssignments: string[]
    removedAssignments?:string[]
    gameNotes: string

}