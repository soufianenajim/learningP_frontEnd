import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { DetailSuggestionComponent } from "./detail-suggestion/detail-suggestion.component";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  questionDetail;
  displayedColumns: string[] = ["content", "correct", "actions"];
  dataSource;
  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log("data", data);
    this.questionDetail = data;

    this.dataSource = data.suggestions;
  }

  ngOnInit() {}
  cancel() {
    this.dialogRef.close("laaaaaaaaaaah yr7m lik lwalidin");
  }
  openDialogDetail(row) {
    const dialogRef = this.dialog.open(DetailSuggestionComponent, {
      width: "50%",
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
}
