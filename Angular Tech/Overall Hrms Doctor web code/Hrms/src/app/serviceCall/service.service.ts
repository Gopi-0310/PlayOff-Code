import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService implements OnInit{
  isLogged:boolean=false;
  login_data:any;
  departMent:string ='';
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
     
  }
  display_post_method(apiEndPoints:string,data:any){
  return this.http.post<any>(apiEndPoints,data);
  }
  display_get_method(apiEndPoints:string,queryParams?: HttpParams){
    return this.http.get<any>(apiEndPoints, { params: queryParams });
  }
  display_put_method(apiEndPoints:string,drname?:any){
    return this.http.put<any>(apiEndPoints,drname)
  }
}
