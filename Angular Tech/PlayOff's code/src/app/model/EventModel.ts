export class EventModel {
    eventName: string
    teamId: string
    eventId?:string
    notifyTeam: string = 'yes';
    eventDate: any
    eventTime: string
    eventTimeToBeDecide: string
    eventLocation: string
    eventLocationDetails: string
    eventAssignments: string[]
    eventRepeats: string = 'never';
    eventDurationHours: string
    eventDurationMinutes: string
    
    arriveEarlyInfo: string
    userName?: string
    customEventAssignments: string[]
    eventTimeZone: string
    eventNotes: string
    removedAssignments:string[]
    eventDurationHoursId: string
    eventDurationMinutesId: string
    eventLatitude:string
    eventLongitude:string
    eventAssignmentsData?: [
        {
            eventAssignmentId: string
            eventAssignmentName: string
            eventId: string
            defaultAssignment: boolean
        }
    ]
}
