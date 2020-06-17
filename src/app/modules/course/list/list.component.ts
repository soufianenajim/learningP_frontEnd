import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { Cour } from "../../../core/models/cour.model";
import { Demande } from "../../../core/models/demande.model";
import { FormGroup, FormControl } from "@angular/forms";
import { CourseService } from "../../../core/services/course/course.service";
import { ModuleService } from "../../../core/services/module/module.service";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";
import { DetailComponent } from "../detail/detail.component";
import swal from 'sweetalert2';
import { TranslateService } from "@ngx-translate/core";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
@Component({
  selector: "app-list-cour",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "module", "launch","action"];

  dataSource: MatTableDataSource<Cour>;
  demandeCour: Demande<Cour> = new Demande<Cour>();

  cour: Cour = new Cour();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength;

  listModule: any;

  courForm = new FormGroup({
    name: new FormControl(""),
    module: new FormControl(),
  });
  idTeacher;
  constructor(
    private courService: CourseService,
    private moduleseService: ModuleService,
    private dialog: MatDialog,
    private translate:TranslateService,
    private tokenStorageService:TokenStorageService
  ) {}
  ngOnInit() {
    const user=this.tokenStorageService.getUser();
    this.idTeacher=user.id;
    this.moduleseService.findByProfessor(user.id).subscribe((res) => {
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
    const name = this.courForm.get("name").value;
    const module = this.courForm.get("module").value;
    console.log("module", module);
    this.cour.name = name;
    this.cour.module = module;
    this.cour.idTeacher=this.idTeacher;
    this.demandeCour.model = this.cour;
    this.demandeCour.page = page;
    this.demandeCour.size = size;
    this.searchByCritere(this.demandeCour);
  }

  searchByCritere(demande: Demande<Cour>) {
    console.log("demande", demande);
    this.courService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("cours from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Cour>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.courForm.get("name").setValue("");
    this.courForm.get("module").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    this.search(true);
  }

  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "90%",
      autoFocus: false,
      maxHeight: "90vh",
      data: data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      
        this.search(false);
      

      console.log("The dialog was closed");
    });
  }
  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(
        "result mn dialog detail afakom rkzo m3ana   -----------",
        result
      );
    });
  }

  delete(row) {
    this.courService.delete(row.id).subscribe(
      (response) => {
        console.log("response", response);
        this.search(true);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  launch(cour) {
    this.courService.launch(cour.id).subscribe((resp) => {
     this.search(true)
    });
  }
  openDialogLaunch(cour){
  const  courLanched=this.getI18n('COURSE.LAUNCHED');
  const  courLanchedMSG=this.getI18n('COURSE.LAUNCHED_MESSAGE');
    swal({
      title: this.getI18n('COURSE.LAUNCH'),
      text: this.getI18n('ACTION.CONFIRMATION_MESSAGE'),
      type: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.getI18n('ACTION.CONFIRMATION'),
      cancelButtonText: this.getI18n('ACTION.CANCEL_CONFIRMATION'),
      reverseButtons: false,
      focusCancel: true
    }).then(() => this.launch(cour)).then(function () {
      swal({
        title: courLanched,
        text: courLanchedMSG,
        type: 'success'
      });
    }).catch();
  }
  getI18n(name): string {
    let i18;
    this.translate.get(name).subscribe((value: string) => {

      i18 = value;
    });
    return i18;
  }
  openDialogDelete(course) {
    let actionDeleted=this.getI18n("ACTION.DELETED");
    let userDeleted= this.getI18n("COURSE.DELETED");
    swal({
      title: this.getI18n("COURSE.DELETE"),
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

 
}
