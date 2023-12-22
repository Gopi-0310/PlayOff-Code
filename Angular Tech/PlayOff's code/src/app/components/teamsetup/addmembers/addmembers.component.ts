import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '@capacitor-community/contacts';
import { ToastrService } from 'ngx-toastr';
import { NavigationModel } from 'src/app/model/NavigationModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { AppConstants } from 'src/environments/AppConstants';

@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.css']
})
export class AddmembersComponent implements OnInit {
  navigationModel: NavigationModel = new NavigationModel();
  contactOpenCount = 0
  var: any
  action: string;
  constructor(
    private router: Router, 
    private shared: Shared,
    public localStorageService: LocalStorageService,
    private toastr:ToastrService
    
    ) { 
    this.navigationModel.heading = 'Add Members';
    this.navigationModel.skipURL = '/teamsetup/addschedule';
    
    if(this.localStorageService.getUserActionData().actionName && this.localStorageService.getUserActionData().actionName == AppConstants.createAnotherAction){
      this.action = AppConstants.createAnotherAction;
    }

    if(localStorageService.getActionMessage() == AppConstants.messageMyTeam){
      this.toastr.success(localStorageService.getActionMessage(),"Success",AppConstants.toastMessage);
     localStorageService.setActionMessage("");
    }else{
      localStorageService.setActionMessage("");
    } 
  }

  ngOnInit(): void {
    this.shared.setTitle('Team Setup')
    this.shared.setSkipUrl("/teamsetup/addschedule")
    localStorage.setItem("localValue", "addMember")
    
  }

  addManually() {
    this.router.navigateByUrl('teamsetup/addmember-manually')
  }
  addPhone() {
    this.router.navigateByUrl('teamsetup/select-player')
  }
  clickBack(){
    this.router.navigateByUrl("/teams/teammembers")
  }
  async openContacts() {
    const premission = await Contacts.getPermissions();
    if (premission.granted) {
      this.router.navigateByUrl('teamsetup/select-player');
    } else {
      if (premission.granted == undefined && this.contactOpenCount < 2) {
        this.contactOpenCount++;
        this.openContacts();
      } else {
        alert('Please provide permission to access contacts');
      }
    }
  }
}