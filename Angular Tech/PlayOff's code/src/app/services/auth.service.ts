import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, timeout } from 'rxjs';
import { Shared } from '../shared/shared';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from "ngx-toastr";
import { AppConstants } from 'src/environments/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  changeTopbar: true;
  httpstatuscode:HttpStatusCode
  spinnerElement : any;
  constructor(private http: HttpClient, private localStorageService:LocalStorageService, private router: Router, private shared :Shared, private toastr:ToastrService) {
   }
  ngOnInit(): void {
  }

  showSpinner(){
    if(this.shared.isNetworkConnected){
    console.log('This is network status' + this.shared.isNetworkConnected)
    let ele = document.getElementById('my-spinner');
    if(ele){
      ele.classList.remove('hide');
    }
  }else{
    this.toastr.info("Please check your Internet connection"," ",AppConstants.toastMessage);
  }
  }

  hideSpinner(){
    let ele = document.getElementById('my-spinner');
    if(ele){
      ele.classList.add('hide');
      
    }
  }
/**
 * 
 * @param apiEndpointRequst = dynamically getting from component
 * @param model = dynamically getting from component
 * @param header = auth tocken
 * @returns 
 */

  postDataToServiceWithToken(apiEndpointRequst: any, model?: any, header?: any) {
    if(this.shared.isNetworkConnected){
    return this.http.post<any>(apiEndpointRequst, model, this.getToken()).pipe(timeout(AppConstants.apiTimeout.timeOut),
      catchError((err) => {
        if(err.status == 401){
          this.localStorageService.clearAllLocalStorage(); 
          this.router.navigateByUrl('');
          this.hideSpinner()
        }
        else if(err.status == 400){
          this.hideSpinner()
        }
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })    
    )   
  }
  else{
    return throwError('');
  }
  }

  postDataToService(apiEndpointRequst: any, model: any, header?: any) {
    if(this.shared.isNetworkConnected){
    return this.http.post<any>(apiEndpointRequst, model).pipe(timeout(AppConstants.apiTimeout.timeOut),
      catchError((err) => {
        if(err.status == 401){
          this.localStorageService.clearAllLocalStorage(); 
          this.router.navigateByUrl('');
          this.hideSpinner()
        }
        else if(err.status == 400){
          this.hideSpinner()
        }
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
    }else{
      return throwError('');
    }
    
  }

/**
 * 
 * @param apiEndpointRequst = dynamically getting from component
 * @param model = dynamically getting from component
 * @param header = auth tocken
 * @returns 
 */
  
  getDataFromService(apiEndpointRequst: any, queryParams?: HttpParams) {
    if(this.shared.isNetworkConnected){
    return this.http.get<any>(apiEndpointRequst, { params: queryParams }).pipe(timeout(AppConstants.apiTimeout.timeOut),
      catchError((err) => {
        if(err.status == 401){
          this.localStorageService.clearAllLocalStorage(); 
          this.router.navigateByUrl('');
          this.hideSpinner()
        }
        else if(err.status == 400){
          this.hideSpinner()
        }
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
    }
    else{
      return throwError('');
    }
  }
  getListOfData(apiEndpointRequst: any, header?: any) {
    if(this.shared.isNetworkConnected){
    return this.http.get<any>(apiEndpointRequst, this.getToken()).pipe(timeout(AppConstants.apiTimeout.timeOut),
      catchError((err) => {
        if(err.status == 401){
          this.localStorageService.clearAllLocalStorage(); 
          this.router.navigateByUrl('');
          this.hideSpinner()
        }
        else if(err.status == 400){
          this.hideSpinner()
        }
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    )
    }
    else{
      return throwError('');
    }
  }

  getUserName() {
    return localStorage.getItem('userName') ? localStorage.getItem('userName') : "";
  }
  getTeamId() {
    return localStorage.getItem('currentTeamId') ? localStorage.getItem('currentTeamId') : "";
  }
  getTeamName() {
    return localStorage.getItem('currentTeamName') ? localStorage.getItem('currentTeamName') : "";
  }
  getMemberId() {
    return localStorage.getItem('memberId') ? localStorage.getItem('memberId') : "";
  }

  getEditScheduleId(){
    return localStorage.getItem('editScheduleId') ? localStorage.getItem('editScheduleId') : "";
  }
  getToken() {
    let token = localStorage.getItem('authToken')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers: headers };
  }

}
