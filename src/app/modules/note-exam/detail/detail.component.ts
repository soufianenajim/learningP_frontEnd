import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
 
  exam;
  fullNameUser;
  suggestions=[];
  isShow=false;
  isShowUser=false;
  score=0;
  scale;
    constructor(public dialogRef: MatDialogRef<DetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,) { }
  
    ngOnInit() {
      console.log('this.data',this.data.exam.questions);
      if(this.data!=null){
        this.exam=this.data.exam;
        this.suggestions=this.data.answers;
        this.fullNameUser=this.data.user.firstName+" "+this.data.user.lastName;
        this.score=(this.data.score*this.data.exam.scale)/100;
        this.scale=this.data.exam.scale;
        console.log('score',this.score);

      }
    }
    containsSuggestions(suggestion):boolean{
      for (let sugg of this.suggestions) {
        if(sugg.id===suggestion.id)
        return true;
        
      }
     
      return false;
    }
    cancel(){
      this.dialogRef.close();
    }
    
}
