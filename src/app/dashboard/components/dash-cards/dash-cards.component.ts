import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dash-cards',
  templateUrl: './dash-cards.component.html',
  styleUrls: ['./dash-cards.component.css']
})
export class DashCardsComponent implements OnInit {

  @Input() cardName: any;
  @Input() cardData: any;
  @Input() cardDataClass: any;
  @Input() cardDataIcon: any;
  @Input() styleHeader: any;
  @Input() ClassHeaderName: any;
  @Input()isStudent=false;
  @Input()isTeacher=false;
  @Input() isClientAdmin=false;
  @Input() isTechnicalAdmin=false;
  @Input()listGroup;
  @Output() changeEvent = new EventEmitter<any>();

  searchForm = new FormGroup({
    group: new FormControl(null),
  });
  constructor() { }

  ngOnInit() {

    console.log('carName',this.cardName)
  }
  onChangeGroup(){
    const group=this.searchForm.get('group').value;
    if(group){
      this.changeEvent.emit(group.id);
    }
    else{
      this.changeEvent.emit(0);   
    }
  
  }
  onClear(){
    this.changeEvent.emit(0);

  }

}
