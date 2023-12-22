import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptographyService } from '../services/cryptography.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  constructor(
    private crypto: CryptographyService,
    private route : Router,
    private toastr:ToastrService
    ){}

  canActivate(): Observable<boolean> {
    return this.crypto.Authorize_Data().pipe(
      map((authorized) => {
        if (authorized && this.crypto.Logged_UserData && (this.crypto.Logged_UserData.role === environment.SuperAdmin)) {
          return true;
        } else {          
          this.toastr.error(environment.unAuthorized,environment.sorry);
          this.route.navigate(['/'])
          return false;
        }
      }),
      catchError((error) => {
        console.error("Authorization error:", error);
        this.toastr.error(environment.unAuthorized,environment.sorry);
        this.route.navigate(['/'])
        return of(false);
      })
    );
  }
}
