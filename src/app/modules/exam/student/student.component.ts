import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
exam;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<StudentComponent>,) { 
    this.exam=data;
  }

  ngOnInit() {
  }
  cancel(event){
    if(event){
      this.dialogRef.close();
    }
  }
}
