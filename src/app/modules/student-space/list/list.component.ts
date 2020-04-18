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


@Component({
  selector: "app-progression-module-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name", "professeur","cour","exam", "noteF"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<ProgressionModule>;

  demandeProgressionModule: Demande<ProgressionModule> = new Demande<ProgressionModule>();
 
  progressionModule: ProgressionModule = new ProgressionModule();
  resultsLength;
  user=new User();
  levelId;
  branchId;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listModule;
  progressionModuleForm = new FormGroup({
    module: new FormControl(null),
   
  });
  constructor(
    private userService: UserService,
    private progressionModuleService: ProgressionModuleService,
    private moduleService:ModuleService,
    private dialog: MatDialog,
    private tokenStorageService:TokenStorageService
  ) {}
  ngOnInit() {
    console.log('user',this.tokenStorageService.getUser());
    const user=this.tokenStorageService.getUser();
    this.user.id=user.id;
    this.levelId=user.level.id;
    this.branchId=user.branch.id   
    this.moduleService.findByLevelAndBranch(this.levelId,this.branchId).subscribe(resp=>{
      this.listModule=resp;
      console.log('module---',resp);
      this.search(false);
    })
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const module = this.progressionModuleForm.get("module").value;

    this.progressionModule.module = module;
    this.progressionModule.student=this.user;
    this.demandeProgressionModule.model = this.progressionModule;
    this.demandeProgressionModule.page = page;
    this.demandeProgressionModule.size = size;

    this.searchByCritere(this.demandeProgressionModule);
  }

  searchByCritere(demande: Demande<ProgressionModule>) {
    console.log("demandeProgressionModule --------", demande);
    this.progressionModuleService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("progressionModules from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<ProgressionModule>(resp.lignes);
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
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
  openProgressionCour (data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(ProgressionCourComponent, {
      width: "90%",
      data: data,
      disableClose: true,
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

