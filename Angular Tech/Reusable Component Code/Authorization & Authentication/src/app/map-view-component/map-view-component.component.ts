import { Component, OnInit } from '@angular/core';
import { GeocodingServiceService } from './Geo-service/geocoding-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-map-view-component',
  templateUrl: './map-view-component.component.html',
  styleUrls: ['./map-view-component.component.scss']
})
export class MapViewComponentComponent implements OnInit {  
  searchText        : any;
  panelOpenState    = false;
  pageNumber        = 1;
  expand            :any;
  
  constructor( public geoService   : GeocodingServiceService) { }

  ngOnInit() { this.geoService.getUserData(); }

   
  getMethod(data:any){ 
    this.expand = data.id;
    this.geoService.getLocationDetails(data.locationLatitude,data.locationLongitude)
  }
   

  
  some(data:any){
    if(data && data.id == this.expand){
      return true;
    }
      return false;
  }
 
}

