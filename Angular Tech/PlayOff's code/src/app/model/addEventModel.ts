export interface AddEvent {
    eventName: string
    teamId: string
    eventId?:string
    notifyTeam: string
    eventDate: string
    eventTime: string
    eventTimeToBeDecide: string
    eventLocation: string
    eventLocationDetails: string
    eventAssignments: string[]
    eventRepeats: string
    eventDurationHours: string
    eventDurationMinutes: string
    arriveEarlyInfo: string
    userName?: string
    customEventAssignments: string[]
    eventTimeZone: string
    eventNotes: string
    removedAssignments?:string[]
}
