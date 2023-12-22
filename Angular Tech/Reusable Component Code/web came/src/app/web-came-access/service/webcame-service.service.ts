import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebcameServiceService {
  imagetrigger      :boolean = false;
  icons             :boolean = false;
  childComponent    :boolean = false;
  paharantComponent :boolean = true;
  constructor() { }
}
