import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  Image : any;
  Retake :boolean = false;
  constructor(private router :Router) {
    let currentStateExtras = this.router.getCurrentNavigation()?.extras.state;
    this.Image = currentStateExtras;
    console.log("datass",this.Image.Image)
   }
   
  ngOnInit(): void {
   
  }
  image(){
    this.Retake = true
    var data = this.Retake
    let objToSend: NavigationExtras = {};
    objToSend.state = {
      data
    };
   this.router.navigateByUrl('', objToSend);
  }
}
