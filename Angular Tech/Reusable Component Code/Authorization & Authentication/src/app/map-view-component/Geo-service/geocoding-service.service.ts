import { Injectable } from '@angular/core';
import { ApiInteractionsService } from 'src/app/secured-login/services/api-interactions.service';

@Injectable({
  providedIn: 'root'
})

export class GeocodingServiceService {
  locationResponse   : any;
  locationDetails!   : any;
  state!             : string;
  city!              : string;
  country!           : string;
  street!            : string;
  
  constructor(private api  : ApiInteractionsService,) { }

  async getUserData(){ 
    this.locationResponse = await this.api.getLoginInfo().toPromise(); 
   
  }

 getLocationDetails(lat:number,lng:number): Promise<any> {
  return new Promise((reject) => {
    this.state   = "";
    this.country = "";
    this.city    = "";
    this.street  = "";
    const geocoder   =  new google.maps.Geocoder();
    const latlng     =  new google.maps.LatLng(lat, lng);

    geocoder.geocode({ 'location': latlng },  (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {

          const addressComponents = results[0].address_components;
            console.log(addressComponents)
          for (let i = 0; i < addressComponents.length; i++) {
               const types = addressComponents[i].types;
               console.log("types",types)
                
              if (types.indexOf('administrative_area_level_1') !== -1)
                 {   this.state  = addressComponents[i].long_name; }
 
              if (types.indexOf('locality') !== -1)
                 {   this.city   = addressComponents[i].long_name; }
              
             if (types.indexOf('country') !== -1) 
                 {   this.country = addressComponents[i].long_name; }

             if (types.indexOf('sublocality_level_1') !== -1) 
                 {   this.street = addressComponents[i].long_name; }
             
          }
        
        } else { reject('No results found'); }

      } else { reject('Geocoder failed due to: ' + status); }

    });
  });
}
}
