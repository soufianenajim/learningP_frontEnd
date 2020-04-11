import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  levelDetail;
  constructor( public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.levelDetail=data;
    }

  ngOnInit() {}
  cancel(){
    this.dialogRef.close("laaaaaaaaaaah yr7m lik lwalidin");
  }

}
