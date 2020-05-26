import {Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {cardToggle, cardClose} from './edit-animation';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations: [cardToggle, cardClose],
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements OnInit {
  @Input() forEdit: boolean;
  @Input() headerContent: string;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader = false;
  cardToggle = 'expanded';
  cardClose = 'open';
  @Output() isEdit = new EventEmitter();
  editBoolean = false;
  searchForm = new FormGroup({
    group: new FormControl(null),
  });
  constructor() { }
  ngOnInit() {
  }

  toggleCard() {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  closeCard() {
    this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
  }
  edit() {

      this.editBoolean = true;
      this.isEdit.emit(this.editBoolean);

  }
  

}
