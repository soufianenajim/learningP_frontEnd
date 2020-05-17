import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { UserService } from "../../../core/services/user/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ProgressionModule } from "../../../core/models/progression_module.model";
import { Demande } from "../../../core/models/demande.model";
import { ProgressionModuleService } from "../../../core/services/progression_module/progression-module.service";
import { User } from "../../../core/models/user.model";
import { ModuleService } from "../../../core/services/module/module.service";
import { ProgressionCourComponent } from "../progression-cour/progression-cour.component";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { PassExamComponent } from "../pass-exam/pass-exam.component";
import { ExamService } from "../../../core/services/exam/exam.service";
import moment from "moment";
import swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-progression-module-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "startCourse",
    "cour",
    "exam",
    "examFinished",
    "noteExam",
    "noteF",
  ];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<ProgressionModule>;

  demandeProgressionModule: Demande<ProgressionModule> = new Demande<
    ProgressionModule
  >();

  progressionModule: ProgressionModule = new ProgressionModule();
  resultsLength;
  user = new User();

  groupId;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listModule;
  progressionModuleForm = new FormGroup({
    module: new FormControl(null),
  });
  constructor(
    private userService: UserService,
    private examService: ExamService,
    private progressionModuleService: ProgressionModuleService,
    private moduleService: ModuleService,
    private dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private translateService:TranslateService
  ) {}
  ngOnInit() {
    console.log("user", this.tokenStorageService.getUser());
    const user = this.tokenStorageService.getUser();
    this.user.id = user.id;
    this.groupId = user.groups[0].id;

    this.moduleService.findByGroup(this.groupId).subscribe((resp) => {
      this.listModule = resp;
      console.log("module---", resp);
      this.search(false);
    });
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const module = this.progressionModuleForm.get("module").value;

    this.progressionModule.module = module;
    this.progressionModule.student = this.user;
    this.demandeProgressionModule.model = this.progressionModule;
    this.demandeProgressionModule.page = page;
    this.demandeProgressionModule.size = size;

    this.searchByCritere(this.demandeProgressionModule);
  }

  searchByCritere(demande: Demande<ProgressionModule>) {
    console.log("demandeProgressionModule --------", demande);
    this.progressionModuleService
      .searchByCritere(demande)
      .subscribe((resp: any) => {
        console.log(
          "progressionModules from database afak ---------------",
          resp
        );
        this.resultsLength = resp.count;
        this.dataSource = new MatTableDataSource<ProgressionModule>(
          resp.lignes
        );
        this.paginator.pageIndex = demande.page;
      });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.progressionModuleForm.get("module").setValue(null);
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  delete(row) {
    this.progressionModuleService.delete(row.id).subscribe(
      (response) => {
        console.log("response", response);
        this.search(true);
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
  openProgressionCour(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(ProgressionCourComponent, {
      width: "90%",
      data: data,
      disableClose: true,
      autoFocus: false,
      maxHeight: "90vh",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.search(false);
      }

      console.log("The dialog was closed");
    });
  }
  openExam(data) {
    let dialogRef;
    this.examService.findByModule(data.module.id).subscribe((resp: any) => {
      data.module.exams = resp;
      const availableToBeStarted = moment().isSameOrAfter(resp.startDateTime);
      if (availableToBeStarted) {
        dialogRef = this.dialog.open(PassExamComponent, {
          width: "90%",
          data: data,
          disableClose: true,
          autoFocus: false,
          maxHeight: "90vh",
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log("result", result);
          if (result) {
            this.search(false);
          }
        });
      } else {
        this.openDialogLaunch(resp[0]);
      }
    });
  }
  openDialogLaunch(quiz) {
    swal({
      title: this.getI18n("EXAM.AVAILABLE"),
      text:
        this.getI18n("EXAM.AVAILABLE_TIME") +
        this.getFormaterDate(quiz.startDateTime),
      type: "warning",
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      reverseButtons: false,
      focusCancel: true,
    }).then();
  }

  getI18n(name): string {
    let i18;
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
  getFormaterDate(date) {
    const lang = this.translateService.getLangs();
    const length=lang.length-1
    moment.locale(lang[length]);
    return  moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }
}
