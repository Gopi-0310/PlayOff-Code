import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-event-availability',
  templateUrl: './teams-event-availability.component.html',
  styleUrls: ['./teams-event-availability.component.css']
})
export class TeamsEventAvailabilityComponent implements OnInit {

  scheduleTabName = "availability";
  availabilityList: any
  acceptList: any
  rejectList: any
  maybeList: any

  constructor(public localStorageService: LocalStorageService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getAvailabilityList()
  }
  

  /**
  **** View Event AvailabilityList  ****
  * @param apiEndpointRequst = environment.apiEventAvailability
  * @param header = auth tocken
  * @param queryParams = eventAvailabilityParams
  * @param apicall = getListOfData() 
  In getAvailabilityList() method is used for getting  eventavailablity list and make a getListOfData() with the help of auth token service call
  */
  getAvailabilityList() {
    this.auth.showSpinner();
    if (this.localStorageService.getUserActionData().data.type == "event" && this.localStorageService.getUserActionData().data.eventid != "") {
    var eventAvailabilityParams = `?eventId=${this.localStorageService.getUserActionData().data.eventid}`
    this.auth
      .getListOfData(
        environment.apiEventAvailability + eventAvailabilityParams,
        Headers
      )
      .subscribe((response) => {
        this.auth.hideSpinner();
        this.availabilityList = response.responseData.eventDetails;
        this.acceptList = response.responseData.eventDetails.acceptedDetails
        this.rejectList = response.responseData.eventDetails.rejectedDetails
        this.maybeList = response.responseData.eventDetails.mayBeDetails
      });
    }
    else{
      this.auth.hideSpinner();
    }
  }
  

}
