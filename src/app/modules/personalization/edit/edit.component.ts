import { Component, OnInit } from "@angular/core";
import { Organization } from "../../../core/models/organization.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from "@angular/forms";
import { OrganizationService } from "../../../core/services/organization/organization.service";
import { LevelService } from "../../../core/services/level/level.service";
import { BranchService } from "../../../core/services/branch/branch.service";
import { TokenStorageService } from "../../../core/services/token_storage/token-storage.service";
import { Router } from "@angular/router";
import { MatStepper } from "@angular/material";
import { NotifierService } from "angular-notifier";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  idOrganization = null;
  isEdit = false;
  isClickFirstForm = false;
  isClickSecondForm = false;
  isHigherEducation = false;
  totalPercentageBeforeCatchingUp = 0;
  totalPercentageAfterCatchingUp = 0;
  private readonly notifier: NotifierService;
  constructor(
    private organizationService: OrganizationService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router,
    notifierService: NotifierService,
    private translateService: TranslateService
  ) {
    this.notifier = notifierService;
    this.firstForm = this.fb.group({
      name: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      scale: new FormControl("", Validators.required),
      thresholdeSucccess: new FormControl("", Validators.required),
      thresholdeCatchUp: new FormControl("", Validators.required),
    });
    this.secondForm = this.fb.group({
      percentageAbsenceBefore: new FormControl("", Validators.required),
      percentageCourBefore: new FormControl("", Validators.required),
      percentageExamBefore: new FormControl("", Validators.required),
      percentageQuizBefore: new FormControl("", Validators.required),
      percentageAbsenceAfter: new FormControl("", Validators.required),
      percentageCourAfter: new FormControl("", Validators.required),
      percentageExamAfter: new FormControl("", Validators.required),
      percentageQuizAfter: new FormControl("", Validators.required),
    });
  }

  buildForm(data) {
    console.log("data", data);
    this.idOrganization = data.id;
    this.firstForm.get("name").setValue(data.name);
    this.firstForm.get("type").setValue(data.type);
    this.firstForm.get("thresholdeSucccess").setValue(data.thresholdeSucccess);
    this.firstForm.get("thresholdeCatchUp").setValue(data.thresholdeCatchUp);
    this.firstForm.get("scale").setValue(data.scale);
  }

  ngOnInit() {
    const user = this.tokenStorage.getUser();
    const organization = user.organization;
    this.organizationService
      .findById(organization.id)
      .subscribe((resp: any) => {
        this.buildForm(resp);
      });
  }
  save() {
    const name = this.firstForm.get("name").value;
    const type = this.firstForm.get("type").value;
    const thresholdeSucccess = this.firstForm.get("thresholdeSucccess").value;
    const thresholdeCatchUp = this.firstForm.get("thresholdeCatchUp").value;
    const scale = this.firstForm.get("scale").value;
    let organization = new Organization();
    organization.id = this.idOrganization;
    organization.name = name;
    organization.scale = scale;
    organization.thresholdeSucccess = thresholdeSucccess;
    organization.type = type;
    organization.thresholdeCatchUp = thresholdeCatchUp;
    this.organizationService.saveOrUpdate(organization).subscribe((resp) => {
      console.log("response  ----", resp);
      this.router.navigate(["dashboard"]);
    });
  }
  errormptyField(field: string) {
    return (
      this.firstForm.get(field).hasError("required") &&
      (this.firstForm.get(field).touched || this.isClickFirstForm)
    );
  }
  errormptyFieldForm2(field: string) {
    return (
      this.secondForm.get(field).hasError("required") &&
      (this.secondForm.get(field).touched || this.isClickSecondForm)
    );
  }
  cancel() {
    this.router.navigate(["dashboard"]);
  }
  nextForm1(stepper: MatStepper) {
    this.isClickFirstForm = true;
    this.isHigherEducation =
      this.firstForm.get("type").value === "HIGHER_EDUCATION";
    if (this.firstForm.valid) {
      stepper.next();
    }
  }
  nextForm2(stepper: MatStepper) {
    this.onReCalculateTotal1();

    this.isClickSecondForm = true;

    if (this.isHigherEducation) {
      this.onReCalculateTotal2();
    }
    console.log('totalPercentageBeforeCatchingUp',this.totalPercentageBeforeCatchingUp)
    if (this.secondForm.valid) {
      if (this.isHigherEducation) {
        if (this.totalPercentageBeforeCatchingUp == 100) {
          if (this.totalPercentageAfterCatchingUp === 100) {
            stepper.next();
          } else {
            this.erorrNotifaction(
              "PERSONALIZATION.TOTAL_PERCENTAGE_AFTER_CATCHING_UP"
            );
          }
        } else {
          this.erorrNotifaction(
            "PERSONALIZATION.TOTAL_PERCENTAGE_BEFORE_CATCHING_UP"
          );
        }
      } else {
        if (this.totalPercentageBeforeCatchingUp === 100) {
          stepper.next();
        } else {
          this.erorrNotifaction("MODULE.TOTAL_PERCENTAGE");
        }
      }

     
    }
  }
  erorrNotifaction(msg) {
    this.translateService.get(msg).subscribe((value: string) => {
      this.showNotification("error", value);
    });
  }
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
  onReCalculateTotal1() {
    const percentageAbsence = this.secondForm.get("percentageAbsenceBefore")
      .value;
    const percentageCour = this.secondForm.get("percentageCourBefore").value;
    const percentageExam = this.secondForm.get("percentageExamBefore").value;
    const percentageQuiz = this.secondForm.get("percentageQuizBefore").value;
    this.totalPercentageBeforeCatchingUp =
      percentageAbsence + percentageCour + percentageExam + percentageQuiz;
  }
  onReCalculateTotal2() {
    const percentageAbsence = this.secondForm.get("percentageAbsenceAfter")
      .value;
    const percentageCour = this.secondForm.get("percentageCourAfter").value;
    const percentageExam = this.secondForm.get("percentageExamAfter").value;
    const percentageQuiz = this.secondForm.get("percentageQuizAfter").value;
    this.totalPercentageAfterCatchingUp =
      percentageAbsence + percentageCour + percentageExam + percentageQuiz;
  }
}
