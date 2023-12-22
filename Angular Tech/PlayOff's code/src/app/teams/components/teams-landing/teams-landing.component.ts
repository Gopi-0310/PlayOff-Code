import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Acceptance } from "src/app/model/acceptance";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-teams-landing",
  templateUrl: "./teams-landing.component.html",
  styleUrls: ["./teams-landing.component.css"],
})
export class TeamsLandingComponent implements OnInit {
  dashboardData: any;
  acceptModel!: Acceptance;

  constructor(
    private router: Router,
    public auth: AuthService,
    public localStorageService: LocalStorageService
  ) {
    if (this.localStorageService.getUserName() == "" || !this.localStorageService.getUserTeamID()) {
      this.router.navigateByUrl("");
    }
  }

  ngOnInit(): void {
    this.initLandingPage();
  }


  /**
  **** View The Event list ****
  * @param apiEndpointRequst = environment.apiteamEventList
  * @param queryparams = TeamLandingApiQueryParams
  * @param headers = auth tocken
  * @param apicall = getListOfData() 
  * In  initLandingPage() method  used for getting event list and make a getListOfData() with the help of auth token service call
  */
  initLandingPage() {
    let TeamLandingApiQueryParams = `?userName=${this.localStorageService.getUserName()}&teamId=${this.localStorageService.getUserTeamID()}`;
    this.auth.showSpinner();
    this.auth
      .getListOfData(
        environment.apiteamEventList + TeamLandingApiQueryParams,
        Headers
      )
      .subscribe((response) => {
        this.auth.hideSpinner();
        this.dashboardData = response.responseData.eventsList;
        if(this.dashboardData != ''){
        this.localStorageService.setIsManager(this.dashboardData[0].isManager);
        }
      });
  }

  /**
  **** Update the eventy status ****
  * @param apiEndpointRequst = environment.apieventacceptance
  * @param header = auth tocken
  * @param model = acceptModel
  * @param apicall = postDataToServiceWithToken() 
  In updateEventAcceptanceStatus() method is used for submitting the user acceptance staus to the Model  and make a postDataToServiceWithToken() with the help of auth token service call
  */
  updateEventAcceptanceStatus(teamId: string, eventId: string, memberId: string, currenteventUserAcceptanceString: string, eventUserAcceptanceString: string) {
    if(currenteventUserAcceptanceString != eventUserAcceptanceString){
      this.acceptModel = {
        teamId,
        eventId,
        memberId,
        eventUserAcceptanceString
      };
      this.auth
        .postDataToServiceWithToken(
          environment.apieventacceptance,
          this.acceptModel,
          Headers
        )
        .subscribe((apiResponse) => {
          if (apiResponse.apiStatus.statusCode == 200) {
            this.initLandingPage();
          }
        });
    }
  }

  // TODO call updateDashboardData instead of making initLandingPage call again. 
  updateDashboardData(id: string, eventUserAcceptanceString: string) {
    let eventClicked = this.dashboardData.find((evt: any) => evt.eventId == id);
    eventClicked.eventUserAcceptanceData.eventUserAcceptanceString = eventUserAcceptanceString;
  }
}
