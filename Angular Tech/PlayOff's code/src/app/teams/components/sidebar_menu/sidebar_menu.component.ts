import { Component, HostListener, OnInit, TemplateRef } from '@angular/core'; 
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Shared } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'sidebar_menu',
  templateUrl: './sidebar_menu.component.html',
  styleUrls: ['./sidebar_menu.component.css']
})
export class SideBarManuComponent implements OnInit  {
  isManager:boolean=false;
  constructor(private matdialog: MatDialog,private router: Router, public auth:AuthService,public localStorageService: LocalStorageService) { }
  ngOnInit(): void {
    this.isManager = this.localStorageService.getIsManager();
  }
  

  isSticky: boolean = true;

  @HostListener('window:scroll', ['$event'])
  
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }
  
  logout(){
    this.localStorageService.clearAllLocalStorage(); 
    this.router.navigateByUrl('');

}
openDialogTemplateRef(templateRef: TemplateRef<any>) {
  this.matdialog.open(templateRef,{
    disableClose:true
  });
}
}
