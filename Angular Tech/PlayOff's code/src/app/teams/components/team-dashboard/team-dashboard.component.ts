import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { AppConstants } from "src/environments/AppConstants";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-team-dashboard",
  templateUrl: "./team-dashboard.component.html",
  styleUrls: ["./team-dashboard.component.css"],
})
export class TeamDashboardComponent {
  tabName = "home";
  constructor(
    public auth: AuthService,
    public localStorageService: LocalStorageService,
    private toastr:ToastrService
  ) {
     if(localStorageService.getActionMessage() == AppConstants.createEventSignup){
    this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
    localStorageService.setActionMessage("");
    }
   else if(localStorageService.getActionMessage() == AppConstants.createGameSignup){
    this.toastr.success(localStorageService.getActionMessage(),"",AppConstants.toastMessage);
    localStorageService.setActionMessage("");
    }
  else{
    localStorageService.getActionMessage();
  }
}

  ngOnInit(): void {
    let userDetailsQuerParams = `?userName=${this.localStorageService.getUserName()}`;
    this.auth
      .getListOfData(environment.apiUserDeatil + userDetailsQuerParams, Headers)
      .subscribe((response) => {
        var firstName = response.responseData.userDetails.firstName;
        if(response.responseData.userDetails.lastName != null){
          var lastName = response.responseData.userDetails.lastName;
          this.localStorageService.setUserFirstAndLastName(firstName, lastName);
        }
        else{
            var lastNameEmpty = ""
            this.localStorageService.setUserFirstAndLastName(firstName, lastNameEmpty);
        }
        
      });
  }
}
