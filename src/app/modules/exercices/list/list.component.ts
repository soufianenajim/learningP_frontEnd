import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Demande } from '../../../core/models/demande.model';
import { Exercices } from '../../../core/models/exercices.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ExercicesService } from '../../../core/services/exercices/exercices.service';
import { DetailComponent } from '../detail/detail.component';
import { SaveOrUpdateExComponent } from '../save-or-update/save-or-update.component';
import { ModuleService } from '../../../core/services/module/module.service';
import { PersonalizeComponent } from '../personalize/personalize.component';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name","cour", "module","type","actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Exercices>;

  demandeExercices: Demande<Exercices> = new Demande<Exercices>();

  exercices: Exercices = new Exercices();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listModule: any;
  exercicesForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl()
  });
  constructor(
    private exercicesService: ExercicesService,
    private dialog: MatDialog,
    private moduleService:ModuleService,
    private translate:TranslateService

  ) {}
  ngOnInit() {
    this.moduleService.findAll().subscribe(res => {
      console.log("modules in database -------------------------------", res);
      this.listModule = res;
      this.search(false);
    });
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.exercicesForm.get("name").value;
   

    this.exercices.name = name;
  
   
    this.demandeExercices.model = this.exercices;
    this.demandeExercices.page = page;
    this.demandeExercices.size = size;

    this.searchByCritere(this.demandeExercices);
  }

  searchByCritere(demande: Demande<Exercices>) {
    console.log("demandeExercices --------", demande);
    this.exercicesService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("exercicess from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Exercices>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.exercicesForm.get("name").setValue("");
    this.exercicesForm.get("module").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "80%",
      data: row,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }
  openDialog(data) {
    const dialogRef = this.dialog.open(SaveOrUpdateExComponent, {
      width: "80%",
      data: data,
      disableClose: true,
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  delete(row) {
    this.exercicesService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
  openDialogQuestions(row){
    const dialogRef = this.dialog.open(PersonalizeComponent, {
      width: "80%",
      data: row,
      disableClose: true,
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  openDialogDelete(course) {
    let actionDeleted=this.getI18n("ACTION.DELETED");
    let userDeleted= this.getI18n("EXERCICES.DELETED");
    swal({
      title: this.getI18n("EXERCICES.DELETE"),
      text: this.getI18n("ACTION.CONFIRMATION_MESSAGE"),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.getI18n("ACTION.CONFIRMATION"),
      cancelButtonText: this.getI18n("ACTION.CANCEL_CONFIRMATION"),
      reverseButtons: false,
      focusCancel: true,
    })
      .then(() => this.delete(course))
      .then(function () {
        swal({
          title: actionDeleted,
          text:userDeleted,
          type: "success",
        });
      })
      .catch();
  }
  getI18n(name): string {
    let i18;
    this.translate.get(name).subscribe((value: string) => {

      i18 = value;
    });
    return i18;
  }
}
