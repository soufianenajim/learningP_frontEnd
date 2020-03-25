import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.findById(1).subscribe(resp=>{
      console.log('resp',resp);
    })
  }

}
