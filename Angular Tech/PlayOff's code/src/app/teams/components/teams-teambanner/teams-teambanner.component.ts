import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-teambanner',
  templateUrl: './teams-teambanner.component.html',
  styleUrls: ['./teams-teambanner.component.css']
})
export class TeamsTeambannerComponent implements OnInit {

  data={teamName:'',sportsTypeData:{sportName:''}};
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
    this.auth.getListOfData(environment.apiSingleTeamData+teamDetailsQuerParams,Headers).subscribe(response=>{
      this.data = response.responseData.teamData
    })
  }
 
}
