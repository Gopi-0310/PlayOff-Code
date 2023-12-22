// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiLoginUrl: "http://44.211.224.182:8090/teammaster/login/getLoginOTP",
  apiLoginOTPUrl: "http://44.211.224.182:8090/teammaster/authenticate",
  apiSignupUrl: "http://44.211.224.182:8090/teammaster/signup/getSignupOTP",
  apiSignupOTPUrl: "http://44.211.224.182:8090/teammaster/signup/validateSignupOtp",
  apiSaveUser: "http://44.211.224.182:8090/teammaster/signup/createUser",
  apiCreateTeam: "http://44.211.224.182:8090/teammaster/team/createTeam",
  apiCountryList: "http://44.211.224.182:8090/teammaster/country/getCountryList",
  apiSportsList: "http://44.211.224.182:8090/teammaster/sports/getSportsTypeList",
  apiAddPlayer: "http://44.211.224.182:8090/teammaster/player/addPlayer",
  apiTimezone: "http://44.211.224.182:8090/teammaster/timeZone/getTimeZones",
  apiGameAssignmets: "http://44.211.224.182:8090/teammaster/gameAssignments/getGameAssignments",
  apiEventAssignments: "http://44.211.224.182:8090/teammaster/eventAssignments/getEventAssignments",
  apiAddGame: "http://44.211.224.182:8090/teammaster/game/addGame",
  apiAddEvent: "http://44.211.224.182:8090/teammaster/event/addEvent",
  apiArriveduration: "http://44.211.224.182:8090/teammaster/gameDurationInfo/getGameDurationandArriveEarlyInfo",
  apiEventduaration: "http://44.211.224.182:8090/teammaster/eventDurationInfo/getEventDurationandArriveEarlyInfo",
  apiTeamList: "http://44.211.224.182:8090/teammaster/team/getTeamList",
  apiLandingscreen: "http://44.211.224.182:8090/teammaster/team/getPostLoginLandingPageData",
  apiteamLanding: "http://44.211.224.182:8090/teammaster/event/listEventsByPlayer",
  apieventacceptance: "http://44.211.224.182:8090/teammaster/event/userEventAcceptance",
  apiteamEventList: "http://44.211.224.182:8090/teammaster/event/listEventsByPlayer",
  apiListMember: "http://44.211.224.182:8090/teammaster/player/getTeamMembersList",
  apiGameAssignments: "http://44.211.224.182:8090/teammaster/getMemberforGameAssignments",
  apiScheduleList: "http://44.211.224.182:8090/teammaster/scheduleList/getScheduleList",
  apiEditTeam: "http://44.211.224.182:8090/teammaster/team/updateTeam",
  apiDeleteTeam: "http://44.211.224.182:8090/teammaster/team/deleteTeam",
  apiDeleteEvent: "http://44.211.224.182:8090/teammaster/event/deleteEvent",
  apiDeleteGame: "http://44.211.224.182:8090/teammaster/game/deleteGame",
  apiDeleteMember: "http://44.211.224.182:8090/teammaster/player/deletePlayer",
  apiGetGameDetailsById: "http://44.211.224.182:8090/teammaster/game/getGameDetails",
  apiGetEventDetailsById: "http://44.211.224.182:8090/teammaster/event/getEventDetails",
  apiViewTeam: "http://44.211.224.182:8090/teammaster/team/getTeamData",
  apieditTeamPlayer: "http://44.211.224.182:8090/teammaster/player/getPlayerDetail",
  apieditTeamNewPlayer: "http://44.211.224.182:8090/teammaster/player/updatePlayer",
  apiUpdateGame: "http://44.211.224.182:8090/teammaster/game/updateGame",
  apiUpdateEvent: "http://44.211.224.182:8090/teammaster/event/updateEvent",
  apiSingleTeamData: "http://44.211.224.182:8090/teammaster/team/getTeamData",
  apiUserDeatil: "http://44.211.224.182:8090/teammaster/login/getUserDetails",
  apiMemberDetails: "http://44.211.224.182:8090/teammaster/player/getPlayerDetail",
  apiMobileNumberUpdate: "http://44.211.224.182:8090/teammaster/login/sendOTPforMobileNoUpdate",
  apiPofileUpdate: "http://44.211.224.182:8090/teammaster/login/updateUserProfileDetails",
  apiEventAvailability: "http://44.211.224.182:8090/teammaster/event/getMemberAvailabilityDetailsforanEvent",
  apiGetAssignmentsForEvent: "http://44.211.224.182:8090/teammaster/eventAssignments/getAssignmentsByEventId",
  apiGetAssignmentsForGame: "http://44.211.224.182:8090/teammaster/gameAssignments/getAssignmentsByGameId",
  apiSaveMemberForGameAssignments: "http://44.211.224.182:8090/teammaster/memberforGameAssignments/saveMemberforGameAssignments",
  apiSaveMemberForEventAssignments: "http://44.211.224.182:8090/teammaster/memberforEventAssignments/saveMemberforEventAssignments",
  apiDeleteAssignmentForGame: "http://44.211.224.182:8090/teammaster/gameAssignments/deleteGameAssignment",
  apiDeleteAssignmentForEvent: "http://44.211.224.182:8090/teammaster/eventAssignments/deleteEventAssignment",
  apiErrorLogger: "http://44.211.224.182:8090/teammaster/error/clientErrorLogger"
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
