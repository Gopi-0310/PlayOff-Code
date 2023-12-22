import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NavigationModel } from "src/app/model/NavigationModel";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { AppConstants } from "src/environments/AppConstants";

@Component({
  selector: "app-addschedule",
  templateUrl: "./addschedule.component.html",
  styleUrls: ["./addschedule.component.css"],
})
export class AddscheduleComponent {
  navigationModel: NavigationModel = new NavigationModel();
  constructor(
    public localStorageService: LocalStorageService,
    private toastr :ToastrService
    ) {
    this.navigationModel.heading = "Add Schedule";
    this.navigationModel.skipURL = "/teams/teamdashboard";

    if (
      this.localStorageService.getUserActionData().actionName ==
        AppConstants.editAction
    ) {
      this.navigationModel.skipURL = "";
      this.navigationModel.backURL = "/teams/teamschedule";
    }
    else if(this.localStorageService.getUserActionData().actionName ==
    AppConstants.createAnotherActionFromTopAdd){
      this.navigationModel.skipURL = "";
      this.navigationModel.backURL = "/teams/teamsaddnew";
    }
  }
}
