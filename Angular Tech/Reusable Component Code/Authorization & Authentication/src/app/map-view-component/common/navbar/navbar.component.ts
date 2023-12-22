import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public route:Router ) { }
  ngOnInit(): void {
  }

  logout()
  { 
    
  }

  partial_logout()
  {
   
  }
  complete_logout()
  {
   
  }
  initialization()
  {
             
  }

  mapView(){
    this.route.navigate(['/map-view-component']);
  }

}
