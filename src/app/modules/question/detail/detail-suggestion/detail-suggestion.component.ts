import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-detail-suggestion',
  templateUrl: './detail-suggestion.component.html',
  styleUrls: ['./detail-suggestion.component.css']
})
export class DetailSuggestionComponent implements OnInit {

  suggestionDetail;
  dataSource
  constructor( public dialogRef: MatDialogRef<DetailSuggestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('data',data);
      this.suggestionDetail=data;
     
    }

  ngOnInit() {}
  cancel(){
    this.dialogRef.close("laaaaaaaaaaah yr7m lik lwalidin");
  }

}
