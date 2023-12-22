import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SaveMemberForAssignments } from "src/app/model/SaveMemberForAssignmentModel";
import { AuthService } from "src/app/services/auth.service";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { AppConstants } from "src/environments/AppConstants";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-teams-event-assignments",
  templateUrl: "./teams-event-assignments.component.html",
  styleUrls: ["./teams-event-assignments.component.css"],
})
export class TeamsEventAssignmentsComponent implements OnInit {
  scheduleTabName = "assignments";
  gameAssignmentList: any = null;
  eventAssignmentList: any = null;
  teamMembersList: {
    [x: string]:
    | {
      teamId: string;
      memberId: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      mobileNumber: string;
      jerseyNumber: number;
      playerPosition: number;
      memberInvitationStatus: number;
      isManager: boolean;
      memberActiveStatus: number;
      memberRole?: undefined;
    }
  } = {};

  dialogAssignmentName: string;
  dialogAssignmentId: string;
  dialogMemberAssigned: string;

  saveMemberForm: FormGroup;
  saveMemberModel: SaveMemberForAssignments;

  isManager: boolean = false;

  constructor(
    private matdialog: MatDialog,
    public localStorageService: LocalStorageService,
    public auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.saveMemberForm = this.formBuilder.group({
      selectedMember: ["", Validators.required],
    });
    this.isManager = localStorageService.getIsManager();
  }
  ngOnInit(): void {
    this.getAssignedDetails();
  }

   /**
  **** AssignedDetails  ****
  * @param apiEndpointRequst = environment.apiGetAssignmentsForEvent,apiGetAssignmentsForGame
  * @param header = auth tocken
  * @param queryparams = eventAssignmentParams,gameAssignmentParams
  * @param apicall = getListOfData() 
  In getAssignedDetails() method is used for getting the game and event AssignedDetails and make a getListOfData() with the help of auth tocken service call
  */
  getAssignedDetails() {
    this.auth.showSpinner();
    if (
      this.localStorageService.getUserActionData().data.type == "event" &&
      this.localStorageService.getUserActionData().data.eventid != ""
    ) {
      var eventAssignmentParams = `?eventId=${this.localStorageService.getUserActionData().data.eventid
        }`;
      this.auth
        .getListOfData(
          environment.apiGetAssignmentsForEvent + eventAssignmentParams,
          Headers
        )
        .subscribe((res) => {
          this.auth.hideSpinner();
          this.eventAssignmentList = res.responseData.eventAssignments;
          let memberList = res.responseData.teamMembersList;
          memberList.forEach((member: any) => {
            this.teamMembersList[member.mobileNumber] = member;
          });
        });
    } else {
      var gameAssignmentParams = `?gameId=${this.localStorageService.getUserActionData().data.gameid
        }`;
      this.auth
        .getListOfData(
          environment.apiGetAssignmentsForGame + gameAssignmentParams,
          Headers
        )
        .subscribe((res) => {
          this.auth.hideSpinner();
          this.gameAssignmentList = res.responseData.gameAssignments;
          let memberList = res.responseData.teamMembersList;
          memberList.forEach((member: any) => {
            this.teamMembersList[member.mobileNumber] = member;
          });
        });
    }
  }

  openDialogWithTemplateRef(
    templateRef: TemplateRef<any>,
    assignmentName?: string,
    assignmentId?: string,
    memberAssigned?: string
  ) {
    this.saveMemberForm.markAsUntouched();
    this.matdialog.open(templateRef,
      {
        disableClose: true,
      }
      );
    this.dialogAssignmentName = assignmentName;
    this.dialogAssignmentId = assignmentId;
    this.dialogMemberAssigned = memberAssigned;
  }

  /**
  **** add Assignment  ****
  * @param apiEndpointRequst = environment.apiSaveMemberForEventAssignments,apiSaveMemberForGameAssignments
  * @param header = auth tocken
  * @param model = saveMemberModel
  * @param apicall = postDataToServiceWithToken() 
  In saveAssignment() method is used for submit the saveMemberModel data and make a postDataToServiceWithToken() with the help of auth tocken service call
  */
  saveAssignment() {
    this.auth.showSpinner();
    if (!this.saveMemberForm.invalid) {
      if (
        this.localStorageService.getUserActionData().data.type == "event" &&
        this.localStorageService.getUserActionData().data.eventid != ""
      ) {
        this.saveMemberModel = {
          teamId: this.localStorageService.getUserTeamID(),
          eventId: this.localStorageService.getUserActionData().data.eventid,
          assignmentId: this.dialogAssignmentId,
          userName: this.localStorageService.getUserName(),
          memberId:
            this.teamMembersList[this.saveMemberForm.value.selectedMember]
              .memberId,
        };
        this.auth
          .postDataToServiceWithToken(
            environment.apiSaveMemberForEventAssignments,
            this.saveMemberModel,
            Headers
          )
          .subscribe((apiResponse: any) => {
            this.auth.hideSpinner();
            if (apiResponse.apiStatus.statusCode == 200) {
              this.toastr.success(AppConstants.editAssignment, '', AppConstants.toastMessage)
              this.matdialog.closeAll();
              this.getAssignedDetails();
            }
          });
      } else {
        this.saveMemberModel = {
          teamId: this.localStorageService.getUserTeamID(),
          gameId: this.localStorageService.getUserActionData().data.gameid,
          assignmentId: this.dialogAssignmentId,
          userName: this.localStorageService.getUserName(),
          memberId:
            this.teamMembersList[this.saveMemberForm.value.selectedMember]
              .memberId,
        };
        this.auth
          .postDataToServiceWithToken(
            environment.apiSaveMemberForGameAssignments,
            this.saveMemberModel,
            Headers
          )
          .subscribe((apiResponse: any) => {
            this.auth.hideSpinner();
            if (apiResponse.apiStatus.statusCode == 200) {
              this.toastr.success(AppConstants.editAssignment, '', AppConstants.toastMessage)
              this.matdialog.closeAll();
              this.getAssignedDetails();
            }
          });
      }
    }
  }

  /**
  **** delete Assignment  ****
  * @param apiEndpointRequst = environment.apiDeleteAssignmentForEvent,apiDeleteAssignmentForGame
  * @param header = auth tocken
  * @param queryParams = deleteEventAssignmentParams,deleteGameAssignmentParams
  * @param apicall = postDataToServiceWithToken() 
  In deleteAssignment() method is used for deleting  event/game assignment and make a postDataToServiceWithToken() with the help of auth token service call
  */
  deleteAssignment() {
    this.auth.showSpinner();
    if (
      this.localStorageService.getUserActionData().data.type == "event" &&
      this.localStorageService.getUserActionData().data.eventid != ""
    ) {
      var deleteEventAssignmentParams = `?eventId=${this.localStorageService.getUserActionData().data.eventid
        }&teamId=${this.localStorageService.getUserTeamID()}&assignmentId=${this.dialogAssignmentId
        }&userName=${this.localStorageService.getUserName()}`;
      this.auth
        .postDataToServiceWithToken(
          environment.apiDeleteAssignmentForEvent + deleteEventAssignmentParams,
          Headers
        )
        .subscribe((res) => {
          this.auth.hideSpinner();
          if (res.apiStatus.statusCode == 200) {
            this.toastr.info(res.apiStatus.message, '', AppConstants.toastMessage)
            this.matdialog.closeAll();
            this.getAssignedDetails();
          }
        });
    } else {
      var deleteGameAssignmentParams = `?gameId=${this.localStorageService.getUserActionData().data.gameid
        }&teamId=${this.localStorageService.getUserTeamID()}&assignmentId=${this.dialogAssignmentId
        }&userName=${this.localStorageService.getUserName()}`;
      this.auth
        .postDataToServiceWithToken(
          environment.apiDeleteAssignmentForGame + deleteGameAssignmentParams,
          Headers
        )
        .subscribe((res) => {
          this.auth.hideSpinner();
          if (res.apiStatus.statusCode == 200) {
            this.toastr.info(res.apiStatus.message, '', AppConstants.toastMessage)
            this.matdialog.closeAll();
            this.getAssignedDetails();
          }
        });
    }
  }
}
