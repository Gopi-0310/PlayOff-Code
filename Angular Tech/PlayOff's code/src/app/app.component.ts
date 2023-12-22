import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Network } from '@capacitor/network';
import { Shared } from './shared/shared';
import { ToastrService } from "ngx-toastr";
import { App } from '@capacitor/app';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/environments/AppConstants';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'v1';
  @ViewChild('exit') exitDialog: any;
  @ViewChild('quit') quitDialog: any;
  @ViewChild('exitToLogin') exitToLogin: any;
  
  constructor(private shared :Shared, private toastr:ToastrService, private _location: Location, private router:Router, private matdialog: MatDialog,
    private ngZone:NgZone, private localStorageService:LocalStorageService,){

  }
  ngOnInit(): void {
    
    Network.addListener('networkStatusChange', status => {
      this.shared.isNetworkConnected = status.connected;
      if(!this.shared.isNetworkConnected){
        this.toastr.info("Please check your Internet connection","",AppConstants.toastMessage);
      }
    });
    Network.getStatus().then(status => {
      this.shared.isNetworkConnected = status.connected;
    })
   
      App.addListener('backButton', () => {
        console.log(" ###  BACK BUTTON PRESSES ###  " + this._location.path());
        if(this._location.path() == "/createteam"){
          this.openDialogWithTemplateRef(this.exitDialog);
        }else if(this._location.path() == "" || this._location.path() == "/teams/teamdashboard"){
            this.openDialogWithTemplateRef(this.quitDialog);
        }else if(this._location.path() == "/teamlist"){
          this.openDialogWithTemplateRef(this.exitToLogin);
        }
        else{
          this._location.back();
        }
      });
    
  }
  
  openDialogWithTemplateRef(temmplateDialog: any) {
    if(this.matdialog.openDialogs.length ==0){
      this.matdialog.open(temmplateDialog);
    }
      
  }

  exitApp(){
    console.log('this is esit app')
    this.ngZone.run(() => {
    this.router.navigateByUrl("/login");
    });
  }

  quitApp(){
    App.exitApp();
  }
  closeDialog(){
    this.ngZone.run(() => {
      this.matdialog.closeAll()
    });
    
  }
  logout(){
    this.ngZone.run(() => {
    this.localStorageService.clearAllLocalStorage(); 
    this.router.navigateByUrl('');
    });
}
}
