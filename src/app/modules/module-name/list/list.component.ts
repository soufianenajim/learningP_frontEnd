import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Demande } from '../../../core/models/demande.model';
import { FormGroup, FormControl } from '@angular/forms';
import { OrganizationService } from '../../../core/services/organization/organization.service';
import { SaveOrUpdateComponent } from '../save-or-update/save-or-update.component';
import { DetailComponent } from '../detail/detail.component';
import { TokenStorageService } from '../../../core/services/token_storage/token-storage.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ModuleName } from '../../../core/models/module_name.model';
import { ModuleNameService } from '../../../core/services/module_name/module-name.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ["name", "action"];

  dataSource: MatTableDataSource<ModuleName>;
  demandeModuleName: Demande <ModuleName> = new Demande<ModuleName>();

  moduleName: ModuleName = new ModuleName();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength;

  listOrganization: any;

  moduleNameForm = new FormGroup({
    name: new FormControl(""),
    organization: new FormControl()
  });
  constructor(
    private moduleNameService: ModuleNameService,
    private dialog: MatDialog,
    private tokenStorageService:TokenStorageService,
    private translateService:TranslateService
  ) {}
  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.moduleNameForm.get("organization").setValue(user.organization);
   this.search(false);
  }

  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.moduleNameForm.get("name").value;
    const organization = this.moduleNameForm.get("organization").value;
    console.log("organization", organization);
    this.moduleName.name = name;
    this.moduleName.organization = organization;
    this.demandeModuleName.model = this.moduleName;
    this.demandeModuleName.page = page;
    this.demandeModuleName.size = size;
    this.searchByCritere(this.demandeModuleName);
  }

  searchByCritere(demande: Demande<ModuleName>) {
    console.log("demande", demande);
    this.moduleNameService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("moduleNames from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<ModuleName>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.moduleNameForm.get("name").setValue("");
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
  }

  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "80%",
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.search(false);
      }
      
      console.log("The dialog was closed");
    });
  }
  openDialogDetail(row){
    const dialogRef = this.dialog.open(DetailComponent, {
      width: "60%",
      data: row,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
     console.log('result mn dialog detail afakom rkzo m3ana   -----------',result);
  
    });
  }
  
  delete(row) {
    this.moduleNameService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
  openDialogDelete(module) {
    let actionDeleted=this.getI18n("ACTION.DELETED");
    let userDeleted= this.getI18n("BRANCH.DELETED");
    swal({
      title: this.getI18n("BRANCH.DELETE"),
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
      .then(() => this.delete(module))
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
    this.translateService.get(name).subscribe((value: string) => {
      i18 = value;
    });
    return i18;
  }
 

}
