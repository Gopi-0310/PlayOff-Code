import { Component, OnInit } from '@angular/core';
import PlaceResult = google.maps.places.PlaceResult;
import { ApiInteractionsService } from '../../services/api-interactions.service';
import {Location} from "@angular-material-extensions/google-maps-autocomplete";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(public service : ApiInteractionsService) { }

  ngOnInit(): void {
  }
//map
onAutocompleteSelected(result: PlaceResult) {
  this.service.location = result.name + "," + result.formatted_address
  }

onLocationSelected(location: Location) {
  this.service.locationLatitude   =  location.latitude;
  this.service.locationLongitude  =  location.longitude;
  console.log(this.service.locationLatitude);
  console.log(this.service.locationLongitude);
 }
}
