import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserService } from "../../../core/services/user/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ProgressionCour } from "../../../core/models/progression_cour.model";
import { Demande } from "../../../core/models/demande.model";
import { ProgressionCourService } from "../../../core/services/progression_cour/progression-cour.service";
import { User } from "../../../core/models/user.model";
import { CourseService } from "../../../core/services/course/course.service";
import { ReadCourComponent } from "./read-cour/read-cour.component";


@Component({
  selector: "progression-cour",
  templateUrl: "./progression-cour.component.html",
  styleUrls: ["./progression-cour.component.css"]
})
export class ProgressionCourComponent implements OnInit {
  displayedColumns: string[] = ["name", "progression","courFinished","tdFinished","quizFinished","startCour","scorQuiz"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<ProgressionCour>;

  demandeProgressionCour: Demande<ProgressionCour> = new Demande<ProgressionCour>();
 
  progressionCour: ProgressionCour = new ProgressionCour();
  resultsLength;
  user=new User();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listCour;
  progressionCourForm = new FormGroup({
    cour: new FormControl(null),
   
  });
  dataFromDialog;
  constructor(
    private progressionCourService: ProgressionCourService,
    private courService:CourseService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ProgressionCourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataFromDialog=data;
  }
  ngOnInit() {
    this.progressionCour.moduleId=this.dataFromDialog.module.id;
    this.progressionCour.student=this.dataFromDialog.student;
    this.courService.findByModule(this.progressionCour.moduleId).subscribe(resp=>{
      this.listCour=resp;
      this.search(false);
    })
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const cour = this.progressionCourForm.get("cour").value;

    this.progressionCour.cour = cour;
    this.demandeProgressionCour.model = this.progressionCour;
    this.demandeProgressionCour.page = page;
    this.demandeProgressionCour.size = size;

    this.searchByCritere(this.demandeProgressionCour);
  }

  searchByCritere(demande: Demande<ProgressionCour>) {
    console.log("demandeProgressionCour --------", demande);
    this.progressionCourService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("progressionCours from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<ProgressionCour>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.progressionCourForm.get("cour").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }



   delete(row) {
    this.progressionCourService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
  cancel(){
    this.dialogRef.close()
  }
  openCour (data) {
    const dialogRef = this.dialog.open(ReadCourComponent, {
      width: "90%",
      data: data,
     // disableClose: true,
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.search(false);
      }
      
      console.log("The dialog was closed");
    });

  }
  
}

