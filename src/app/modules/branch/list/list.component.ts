import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Branch } from '../../../core/models/branch.model';
import { Demande } from '../../../core/models/demande.model';
import { FormGroup, FormControl } from '@angular/forms';
import { BranchService } from '../../../core/services/branch/branch.service';
import { OrganizationService } from '../../../core/services/organization/organization.service';
import { SaveOrUpdateComponent } from '../save-or-update/save-or-update.component';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ["name", "organization", "action"];

  dataSource: MatTableDataSource<Branch>;
  demandeBranch: Demande <Branch> = new Demande<Branch>();

  branch: Branch = new Branch();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength;

  listOrganization: any;

  branchForm = new FormGroup({
    name: new FormControl(""),
    organization: new FormControl()
  });
  constructor(
    private branchService: BranchService,
    private organizationseService: OrganizationService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    console.log('this is branches')
    this.organizationseService.findAll().subscribe(res => {
      console.log("organizations in database -------------------------------", res);
      this.listOrganization = res;
      this.search(false);
    });
  }

  search(bool) {
    if (!bool) {
      this.initPagination();
    }
    const page = this.paginator.pageIndex;
    const size = this.paginator.pageSize;
    const name = this.branchForm.get("name").value;
    const organization = this.branchForm.get("organization").value;
    console.log("organization", organization);
    this.branch.name = name;
    this.branch.organization = organization;
    this.demandeBranch.model = this.branch;
    this.demandeBranch.page = page;
    this.demandeBranch.size = size;
    this.searchByCritere(this.demandeBranch);
  }

  searchByCritere(demande: Demande<Branch>) {
    console.log("demande", demande);
    this.branchService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("branchs from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Branch>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.branchForm.get("name").setValue("");
    this.branchForm.get("organization").setValue(null);
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
    this.branchService.delete(row.id).subscribe(
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
