import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Level } from '../../../core/models/level.model';
import { Demande } from '../../../core/models/demande.model';
import { FormGroup, FormControl } from '@angular/forms';
import { LevelService } from '../../../core/services/level/level.service';
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

  dataSource: MatTableDataSource<Level>;
  demandeLevel: Demande <Level> = new Demande<Level>();

  level: Level = new Level();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  resultsLength;

  listOrganization: any;

  levelForm = new FormGroup({
    name: new FormControl(""),
    organization: new FormControl()
  });
  constructor(
    private levelService: LevelService,
    private organizationseService: OrganizationService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
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
    const name = this.levelForm.get("name").value;
    const organization = this.levelForm.get("organization").value;
    console.log("organization", organization);
    this.level.name = name;
    this.level.organization = organization;
    this.demandeLevel.model = this.level;
    this.demandeLevel.page = page;
    this.demandeLevel.size = size;
    this.searchByCritere(this.demandeLevel);
  }

  searchByCritere(demande: Demande<Level>) {
    console.log("demande", demande);
    this.levelService.searchByCritere(demande).subscribe((resp: any) => {
      console.log("levels from database afak ---------------", resp);
      this.resultsLength = resp.count;
      this.dataSource = new MatTableDataSource<Level>(resp.lignes);
      this.paginator.pageIndex = demande.page;
    });
  }
  initPagination() {
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
  }
  reset() {
    this.levelForm.get("name").setValue("");
    this.levelForm.get("organization").setValue(null);
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
    this.levelService.delete(row.id).subscribe(
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
