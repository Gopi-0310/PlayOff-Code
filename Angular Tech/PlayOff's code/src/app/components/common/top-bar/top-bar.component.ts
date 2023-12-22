import {
  Component,
  Input,
TemplateRef,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NavigationModel } from "src/app/model/NavigationModel";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { CreateTeamComponent } from "../../create-team/create-team.component";
import { AddeventComponent } from "../../teamsetup/addevent/addevent.component";
import { AddgamesComponent } from "../../teamsetup/addgames/addgames.component";
import { AddmemberManuallyComponent } from "../../teamsetup/addmember-manually/addmember-manually.component";
import { AddmemberComponent } from "../../teamsetup/addmember/addmember.component";
import { SelectPlayerComponent } from "../../teamsetup/select-player/select-player.component";
@Component({
  selector: "app-top-bar[navigationModel]",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent  {


  @Input() navigationModel: NavigationModel;

  constructor(
    // private shared: Shared,
    private addmemberManuallyComponent: AddmemberManuallyComponent,
    private addgamesComponent: AddgamesComponent,
    private addeventComponent: AddeventComponent,
    private selectPlayer: SelectPlayerComponent,
    private createTeamComponent: CreateTeamComponent,
    private matdialog: MatDialog,
    private router:Router,
    private localStorageService:LocalStorageService,
    // private matDialog: MatDialog,
    private addmemberComponent: AddmemberComponent
  ) {}

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.matdialog.open(templateRef);
  }
  exitApp(){
    this.router.navigateByUrl("/login");
  }
  logout(){
    this.localStorageService.clearAllLocalStorage(); 
    this.router.navigateByUrl('');

}

}
