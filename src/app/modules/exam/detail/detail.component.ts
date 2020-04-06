import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { QuestionService } from "../../../core/services/question/question.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  examDetail;
  displayedColumns: string[] = ["name", "code", "correctComment"];
  dataSource = null;
  constructor(
    public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService
  ) {
    console.log('data',data);
    this.questionService.findByExam(data.id).subscribe((resp) => {
      console.log("resp", resp);
      this.examDetail = data;

      this.dataSource = resp;
      console.log('dataSource',this.dataSource)
    });
  }

  ngOnInit() {}
  cancel() {
    this.dialogRef.close("laaaaaaaaaaah yr7m lik lwalidin");
  }
}
