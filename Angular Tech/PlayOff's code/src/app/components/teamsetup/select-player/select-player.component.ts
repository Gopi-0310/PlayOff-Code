import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddPlayerModel } from "src/app/model/addPlayerModel";
import { AuthService } from "src/app/services/auth.service";
import { Shared } from "src/app/shared/shared";
import { environment } from "src/environments/environment";
import { Contacts } from "@capacitor-community/contacts";
import { NavigationModel } from "src/app/model/NavigationModel";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { AppConstants } from "src/environments/AppConstants";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-select-player",
  templateUrl: "./select-player.component.html",
  styleUrls: ["./select-player.component.css"],
})
export class SelectPlayerComponent implements OnInit {
  @ViewChild('sendinvite') public templateRef : TemplateRef<any>;
  navigationModel: NavigationModel = new NavigationModel();
  contactList: any[]= [];
  contactListFilter = new Array();
  addPlayerModel: AddPlayerModel[] = [];
  selectPlayerForm: FormGroup;
  constructor(
    private shared: Shared,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private matdialog:MatDialog,
    public localStorageService: LocalStorageService,
    private toastr:ToastrService
  ) {
    this.navigationModel.backURL = "/teamsetup/addmembers";
    this.navigationModel.heading = "Select Players";
    this.navigationModel.function = this.onSubmit;
  }

  ngOnInit(): void {
    this.openContacts();
    console.log("This is ngInit of select player" + this.contactList);
  }
  onCheckboxChange(e: any) {
    const check: FormArray = this.selectPlayerForm.get(
      "selectedPlayer"
    ) as FormArray;
    if (e.target.checked) {
      check.push(new FormControl(e.target.value));
    } else {
      const index = check.controls.findIndex((x) => x.value === e.target.value);
      check.removeAt(index);
    }
  }

  async openContacts(): Promise<any> {
    let countrycode = this.localStorageService
      .getUserName()
      .substring(0, this.localStorageService.getUserName().indexOf("-")  + 1);
    let contacts = null;
    const premission = await Contacts.getPermissions();
    console.log("Contacts permission response: ", premission.granted);
    if (premission.granted) {
      console.log("Granted permissions for contacts");
      Contacts.getContacts().then((result: any) => {
        if (result && result.contacts) {
          console.log("Contacts Received:" + result.contacts);
          //this.contactList = result.contacts;
          console.log("====1======" + JSON.stringify(result.contacts));
          //Remove the contact list If don't have number
          
          for (let i = 0; i < result.contacts.length; i++) {
            let isValidContact = false;
            if (result.contacts[i].phoneNumbers) {
              for (let k = 0; k < result.contacts[i].phoneNumbers.length; k++) {
                let number = result.contacts[i].phoneNumbers[k] && result.contacts[i].phoneNumbers[k].number ? result.contacts[i].phoneNumbers[k].number.replace(/\(/g, "").replace(/\)/g,"").replace(/-/g,"") : "";
                console.log("number 1 = " + number);
                let numberCountryCode = "";
                if(number.indexOf("+1") == 0){
                  numberCountryCode = "1-"
                  number = number.substring(2);
                }else if(number.indexOf("+91") == 0){
                  numberCountryCode = "91-"
                  number = number.substring(3);
                }
                
                if(number.length > 10){
                  if(number.indexOf("1") == 0 && numberCountryCode == ""){
                    numberCountryCode = "1-"
                    number = number.substring(1);
                  }else if(number.indexOf("91") == 0 && numberCountryCode == ""){
                    numberCountryCode = "91-"
                    number = number.substring(2);
                  }
                }

                if(numberCountryCode == ""){
                  numberCountryCode = countrycode;
                }
                number = number.replace(/ /, "");
                console.log("Updated number  = " + number);
                console.log("Updated numberCountryCode  = " + numberCountryCode);
                if (number != "" && number.length == 10) {
                  isValidContact = true;
                  console.log("Updated isValidContact   = " + number);
                  result.contacts[i].phoneNumbers = numberCountryCode + number;
                  console.log("Final Number = " + numberCountryCode + number);
                  this.contactList.push(result.contacts[i]);
                }
              }
            }
          }
         

          console.log("this.contactList" + this.contactList);

          console.log("this.contactList String " + JSON.stringify(this.contactList));
          this.contactList.sort(
            (a: { displayName: string }, b: { displayName: any }) =>
              a.displayName.localeCompare(b.displayName)
          );
          this.selectPlayerForm = this.formBuilder.group({
            selectedPlayer: this.formBuilder.array([]),
          });
        }
      });
    } else {
      alert("Please provide permission to access contacts");
    }
    return contacts;
  }

  onSubmit(data: any) {
    let component = data.selectPlayer;
    component.matdialog.open(component.templateRef,
      {
        disableClose: true,
      });
  }

  onSubmitConfirmation() {

    this.addPlayerModel = [];
    console.log("form value: " + JSON.stringify(this.selectPlayerForm.value.selectedPlayer));

    if(this.selectPlayerForm && this.selectPlayerForm.value.selectedPlayer && this.selectPlayerForm.value.selectedPlayer.length > 0)
    {
      this.selectPlayerForm.value.selectedPlayer.forEach((selectedIndex: any) => {
        this.addPlayerModel.push({
        emailAddress: "",
        firstName: this.contactList[selectedIndex].displayName,
        lastName: "",
        isManager: false,
        mobileNumber: this.contactList[selectedIndex].phoneNumbers,
        teamId: this.localStorageService.getUserTeamID(),
        userName: this.localStorageService.getUserName(),
        memberRole: "player",
      });
      });

      this.auth.showSpinner();
      this.auth
        .postDataToServiceWithToken(
          environment.apiAddPlayer,
          this.addPlayerModel,
          Headers
        )
        .subscribe((apiResponse: any) => {
          this.auth.hideSpinner();
          if (apiResponse.apiStatus.statusCode == 200) {
            this.toastr.success(AppConstants.addTeamMember,"",AppConstants.toastMessage);
            this.matdialog.closeAll();
            this.router.navigateByUrl("teamsetup/addschedule");
          }
        });
    }
      
     }
}
