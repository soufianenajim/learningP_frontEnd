import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { UserService } from "../../../core/services/user/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Organization } from "../../../core/models/organization.model";
import { Demande } from "../../../core/models/demande.model";
import { OrganizationService } from "../../../core/services/organization/organization.service";
import { DetailComponent } from "../detail/detail.component";
import { SaveOrUpdateComponent } from "../save-or-update/save-or-update.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ["name",  "actions"];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Organization>;

  demandeOrganization: Demande<Organization> = new Demande<Organization>();

  organization: Organization = new Organization();
  resultsLength;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listProfessor;
  organizationForm = new FormGroup({
    name: new FormControl(""),
   
  });
  constructor(
 
    private organizationService: OrganizationService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
   this.search(false);
  }
  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.organizationForm.get("name").value;
   
    this.organization.name = name;
    

    this.demandeOrganization.model = this.organization;
    this.demandeOrganization.page = page;
    this.demandeOrganization.size = size;

    this.searchByCritere(this.demandeOrganization);
  }

  searchByCritere(demande: Demande<Organization>) {
    console.log("demandeOrganization --------", demande);
    this.organizationService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("organizations from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Organization>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.organizationForm.get("name").setValue("");
   
    this.search(false);
  }
  refreshDataTable() {
    console.log("this.paginator", this.paginator);

    this.search(true);
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
  openDialog(data) {
    console.log("data", data);
    const dialogRef = this.dialog.open(SaveOrUpdateComponent, {
      width: "60%",
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
   delete(row) {
    this.organizationService.delete(row.id).subscribe(
      response => {
        console.log("response", response);
        this.search(true);
      },
      error => {
        console.log("error", error);
      }
    );
  }
}

