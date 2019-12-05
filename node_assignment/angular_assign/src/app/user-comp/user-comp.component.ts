import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms';
@Component({
  selector: 'app-user-comp',
  templateUrl: './user-comp.component.html',
  styleUrls: ['./user-comp.component.css']
})
export class UserCompComponent implements OnInit {
val="";
  constructor() { }
    profileform=new FormGroup({name:new FormControl('name')});
  onSubmit(data) {
    this.val=data.name;
    alert(data.name);
    
  }
  ngOnInit() {}
}
