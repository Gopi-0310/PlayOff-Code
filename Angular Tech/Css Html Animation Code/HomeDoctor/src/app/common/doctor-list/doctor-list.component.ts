import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  constructor() { }
   @Input() parantToChild: any;
   @Output() chileToParant : EventEmitter <any> = new EventEmitter();
   name:any;
   company:any;
  ngOnInit(): void {
    this.name="renith";
    this.company="hexacorp";
  }
child(){
  this.chileToParant.emit(this.name)
}
}
