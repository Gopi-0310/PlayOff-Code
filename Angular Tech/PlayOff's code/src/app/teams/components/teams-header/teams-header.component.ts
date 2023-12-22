import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teams-header[currentTab]',
  templateUrl: './teams-header.component.html',
  styleUrls: ['./teams-header.component.css']
})
export class TeamsHeaderComponent implements OnInit {
  @Input() currentTab = '';
  constructor(private router: Router) { }

btndetailClick() {
    this.router.navigate(['/teams/eventdetails']);
 }
 btnavailabilityClick() {
  this.router.navigate(['/teams/eventavailability']);
}
btnassingmentClick() {
  this.router.navigate(['/teams/eventassignments']);
}

 

  ngOnInit(): void {
  }

}
