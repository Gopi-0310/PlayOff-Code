import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isSpinner : boolean = false;

  enableSpinner() { return this.isSpinner; }
  constructor() { }
}
