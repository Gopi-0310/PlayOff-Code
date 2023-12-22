
import {Component, Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'my-progress-spinner',
  templateUrl: 'mat-progress-spinner.component.html',
  styleUrls: ['./mat-progress-spinner.component.css']
})

export class MatSpinnerOverlayComponent {
  displayStatus: string = 'hide'

  public showSpinner(){
    this.displayStatus = "show"
  }

  public hideSpinner(){
    this.displayStatus = "hide"
  }
}
