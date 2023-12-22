import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/model/EventModel';
import { GameModel } from 'src/app/model/GameModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-event-banner',
  templateUrl: './teams-event-banner.component.html',
  styleUrls: ['./teams-event-banner.component.css']
})
export class TeamsEventBannerComponent implements OnInit {

  eventModel: EventModel = new EventModel();
  gameModel: GameModel = new GameModel();
  constructor(public localStorageService: LocalStorageService, public auth: AuthService) { }


  /**
  **** View Event details  ****
  * @param apiEndpointRequst = environment.apiGetEventDetailsById,apiGetGameDetailsById
  * @param header = auth tocken
  * @param queryParams = eventParams,gameParams
  * @param apicall = getListOfData() 
  */
  ngOnInit(): void {
    this.auth.showSpinner();
    if (this.localStorageService.getUserActionData().data.type == "event" && this.localStorageService.getUserActionData().data.eventid != "") {
      var eventParams = `?eventId=${this.localStorageService.getUserActionData().data.eventid
        }`;
      this.auth
        .getListOfData(
          environment.apiGetEventDetailsById + eventParams,
          Headers
        ).subscribe((res) => {
          this.auth.hideSpinner();
          this.eventModel = res.responseData.eventDetails;
        });
    }
    else {
      var gameParams = `?gameId=${this.localStorageService.getUserActionData().data.gameid}`;
      this.auth
        .getListOfData(
          environment.apiGetGameDetailsById + gameParams,
          Headers
        ).subscribe((res) => {
          this.auth.hideSpinner();
          this.gameModel = res.responseData.gameDetails;
        });
    }
  }
}