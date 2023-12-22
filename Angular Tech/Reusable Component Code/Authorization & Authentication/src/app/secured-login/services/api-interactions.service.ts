import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../modals/login-form.modal';
import { environment } from 'src/environments/environment';
import { ErrorHandling } from '../modals/error-handling.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiInteractionsService {

  constructor(private http : HttpClient) { }

  postData          : any;
  putId             : number = 0;
  putData           : any;
  deleteId          : any;
  errorHandlerModel!: ErrorHandling;
  location          : any;
  locationLatitude  : any;
  locationLongitude : any;

  getLoginInfo()    { return this.http.get<LoginForm>(`${environment.login_url}/GetInfo`)}
  putLoginInfo()    { return this.http.put<LoginForm>(`${environment.login_url}/UpdateInfo?id=`+this.putId,this.putData)}
  deleteLoginInfo() { return this.http.delete<LoginForm>(`${environment.login_url}/DeleteInfo?id=`+this.deleteId)}

  postRegInfo()  { return this.http.post<LoginForm>(`${environment.login_url}/CreateInfo`,this.postData) }

  postHandledErrors() { return this.http.post<ErrorHandling>(`${environment.login_url}/error`, this.errorHandlerModel)}
}
