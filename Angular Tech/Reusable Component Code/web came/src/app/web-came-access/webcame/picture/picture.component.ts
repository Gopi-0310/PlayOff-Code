import { Component, Input, OnInit } from '@angular/core';
import { WebcameServiceService } from '../../service/webcame-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  constructor(private service: WebcameServiceService, private router :Router) { }
  @Input() child_component:any;
  ngOnInit(): void {
    console.log("child",this.child_component)
  }
  image(){
    this.service.imagetrigger      = true;
    this.service.icons             = true;
    this.service.childComponent    = false;
    this.service.paharantComponent = true;
    this.router.navigateByUrl('');
  }
}
