import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-memberdetails',
  templateUrl: './teams-memberdetails.component.html',
  styleUrls: ['./teams-memberdetails.component.css']
})
export class TeamsMemberdetailsComponent implements OnInit {
  memberDetails ={gender:'',mobileNumber:'',emailAddress:'',city:''};
  navigationModel: NavigationModel = new NavigationModel();
  constructor(private  auth:AuthService,private router :Router,public localStorageService :LocalStorageService) { }


  /**
  **** view player details ****
  * @param apiEndpointRequst = environment.apiMemberDetails
  * @param header = auth tocken
  * @param queryparams = apiQuerParamsMemberDetails
  * @param apicall = getListOfData() 
  In apiQuerParamsMemberDetails is used for getting  the player details  and make a getListOfData() with the help of auth token service call
  */
  ngOnInit(): void {
    let apiQuerParamsMemberDetails = `?playerId=${this.localStorageService.getUserActionData().data.playerId}`
    this.auth.showSpinner();
    this.auth.getListOfData(
    environment.apiMemberDetails +
    apiQuerParamsMemberDetails,
    Headers)
    .subscribe(response=>{
      this.auth.hideSpinner();
      this.memberDetails = response.responseData.playerDetails
   }) 
   }

}
