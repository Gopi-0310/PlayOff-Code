import { Component, OnInit } from '@angular/core';
import { CryptographyService } from './secured-login/services/cryptography.service';
import { SpinnerService } from './secured-login/services/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor( 
    protected crypto: CryptographyService,
    protected spinner : SpinnerService
    ) 
  { }
  ngOnInit(): void {}
  title = 'Authentify';
}