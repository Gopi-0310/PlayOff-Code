import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-teamdetails',
  templateUrl: './teams-teamdetails.component.html',
  styleUrls: ['./teams-teamdetails.component.css']
})
export class TeamsTeamdetailsComponent implements OnInit {
  data={timeZone:'', country:'', zipCode:''};
  constructor(private auth :AuthService,public localStorageService: LocalStorageService) { }



  /**
  **** view team details ****
  * @param apiEndpointRequst = environment.apiSingleTeamData
  * @param header = auth tocken
  * @param queryparams = teamDetailsQuerParams
  * @param apicall = getListOfData() 
  In teamDetailsQuerParams is used for getting  the team details  and make a getListOfData() with the help of auth token service call
  */
  ngOnInit(): void {
    let teamDetailsQuerParams = `?teamId=${this.localStorageService.getUserActionData().data.teamId}`
    this.auth.showSpinner();
    this.auth.getListOfData(environment.apiSingleTeamData+teamDetailsQuerParams,Headers).subscribe(response=>{
      this.auth.hideSpinner();
      this.data = response.responseData.teamData
    })
  }

}
