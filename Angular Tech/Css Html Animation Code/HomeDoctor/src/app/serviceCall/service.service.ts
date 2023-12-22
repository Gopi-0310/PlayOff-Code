import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isLogged:boolean=false;
  localstorage:any;
  auth_storage:boolean=false;
  constructor(private http:HttpClient) { 
    
   this.localstorage = localStorage.getItem('accessBoolean_check_Out')
   if(this.localstorage == 'check_Out'){
      this.auth_storage;
   }
   
  }
  
  
  servicePostMethod(data:any,apiEndpoint:any){
    return  this.http.post<any>(data,apiEndpoint)
   
     
  }
  serviceGetMethod(apiEndpoint:any,data?:any,){
    return  this.http.get<any>(apiEndpoint,data)
     
  }

}
