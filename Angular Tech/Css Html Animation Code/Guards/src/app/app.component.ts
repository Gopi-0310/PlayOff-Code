import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public role_access: any;
  title = 'guards';

  ngOnInit(): void {
    //store the backend response role 
    this.role_access = localStorage.setItem("your key", "your role");//your role "admin" , "user" , "admin access", "manager","employee" , 
    //get the role from localstorage
    this.role_access = localStorage.getItem("your key");
  }
 


}
