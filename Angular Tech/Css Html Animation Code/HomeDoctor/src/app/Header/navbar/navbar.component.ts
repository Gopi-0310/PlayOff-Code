import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  home(){ this.router.navigateByUrl(''); }
  doctors(){ this.router.navigateByUrl('information/doctors'); }    
  doctorList(){ this.router.navigateByUrl('information/doctorList'); }
  pationtList(){ this.router.navigateByUrl('information/pationList'); }
  
}
