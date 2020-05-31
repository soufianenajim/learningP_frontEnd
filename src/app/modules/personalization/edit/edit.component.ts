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
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { sharedConstants } from "../../../core/constants";
import { CountryService } from "../../../core/services/country/country.service";
import { Percentage } from "../../../core/models/percentage.model";
import { Country } from "../../../core/models/country.model";
import { SharedService } from "../../../core/services/shared/shared.service";

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
  listCountries$;
  base64textString = [];
  timeZones = [
    {
      value: "UTC-12:00",
      text: "(UTC-12:00) International Date Line West",
    },
    {
      value: "UTC-11",
      text: "(UTC-11:00) Coordinated Universal Time-11",
    },
    {
      value: "UTC-10:00",
      text: "(UTC-10:00) Hawaii",
    },
    {
      value: "UTC-09:00",
      text: "(UTC-09:00) Alaska",
    },
    {
      value: "UTC-08:00",
      text: "(UTC-08:00) Baja California",
    },
    {
      value: "UTC-07:00",
      text: "(UTC-07:00) Pacific Time (US & Canada)",
    },
    {
      value: "UTC-06:00",
      text: "(UTC-06:00) Central America",
    },
    {
      value: "UTC-05:00",
      text: "(UTC-05:00) Bogota, Lima, Quito",
    },
    {
      value: "UTC-04:00",
      text: "(UTC-04:00) Asuncion",
    },
    {
      value: "UTC-03:00",
      text: "(UTC-03:00) Brasilia",
    },
    {
      value: "UTC-02:00",
      text: "(UTC-02:00) Coordinated Universal Time-02",
    },
    {
      value: "UTC-01:00",
      text: "(UTC-01:00) Azores",
    },
    {
      value: "UTC-00:00",
      text: "(UTC-00:00) Casablanca",
    },
    {
      value: "UTC+01:00",
      text: "(UTC+01:00) Edinburgh, London",
    },
    {
      value: "UTC+02:00",
      text: "(UTC+02:00) Athens, Bucharest",
    },
    {
      value: "UTC+03:00",
      text: "(UTC+03:00) Istanbul",
    },
    {
      value: "UTC+04:00",
      text: "(UTC+04:00) Samara, Ulyanovsk, Saratov",
    },
    {
      value: "UTC+05:00",
      text: "(UTC+05:00) Ashgabat, Tashkent",
    },
    {
      value: "UTC+06:00",
      text: "(UTC+06:00) Astana",
    },
    {
      value: "UTC+07:00",
      text: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
    },
    {
      value: "UTC+08:00",
      text: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
    },
    {
      value: "UTC+09:00",
      text: "(UTC+09:00) Osaka, Sapporo, Tokyo",
    },
    {
      value: "UTC+10:00",
      text: "(UTC+10:00) Brisbane",
    },
    {
      value: "UTC+11:00",
      text: "(UTC+11:00) Solomon Is., New Caledonia",
    },
    {
      value: "UTC+12:00",
      text: "(UTC+12:00) Auckland, Wellington",
    },
  ];
  private readonly notifier: NotifierService;
  organization = new Organization();
  percentage = new Percentage();
  user;
  constructor(
    private organizationService: OrganizationService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router,
    notifierService: NotifierService,
    private translateService: TranslateService,
    protected countryService: CountryService,
    private sharedService:SharedService
  ) {
    this.notifier = notifierService;

    this.firstForm = this.fb.group({
      name: new FormControl("", [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      address: new FormControl("", [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      country: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(sharedConstants.PHONE_PATTERN),
        this.noWhitespaceValidator,
      ]),
      timeZone: new FormControl("", Validators.required),
      logo: new FormControl(""),
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
    this.organization = data;
    this.percentage = data.percentage ? data.percentage : new Percentage();
    this.firstForm.get("name").setValue(data.name);
    this.firstForm.get("type").setValue(data.type);
    this.firstForm.get("thresholdeSucccess").setValue(data.thresholdeSucccess);
    this.firstForm.get("thresholdeCatchUp").setValue(data.thresholdeCatchUp);
    this.firstForm.get("address").setValue(data.adresse);
    this.firstForm.get("phoneNumber").setValue(data.phoneNumber);
    this.firstForm.get("timeZone").setValue(data.timeZone);
    this.firstForm.get("scale").setValue(data.scale);
    if (data.country) {
      const countryNew: Country = new Country(
        data.country.id,
        data.country.code
      );
      if (this.translateService.currentLang === "fr") {
        countryNew.lang = data.country.frenchLang;
      } else if (this.translateService.currentLang === "en") {
        countryNew.lang = data.country.englishLang;
      } else if (this.translateService.currentLang === "ar") {
        countryNew.lang = data.country.arabLang;
      }
      this.firstForm.get("country").setValue(countryNew);
    }
    for (const res of this.timeZones) {
      if (res.value === data.timeZone) {
        this.firstForm.get("timeZone").setValue(res);
        break;
      }
    }

    if (data.percentage !== null) {
      this.secondForm
        .get("percentageAbsenceBefore")
        .setValue(data.percentage.absenceBefore);
      this.secondForm
        .get("percentageCourBefore")
        .setValue(data.percentage.courBefore);
      this.secondForm
        .get("percentageExamBefore")
        .setValue(data.percentage.examBefore);
      this.secondForm
        .get("percentageQuizBefore")
        .setValue(data.percentage.quizBefore);
      this.secondForm
        .get("percentageAbsenceAfter")
        .setValue(data.percentage.absenceAfter);
      this.secondForm
        .get("percentageCourAfter")
        .setValue(data.percentage.courAfter);
      this.secondForm
        .get("percentageExamAfter")
        .setValue(data.percentage.examAfter);
      this.secondForm
        .get("percentageQuizAfter")
        .setValue(data.percentage.quizAfter);
    }
  }

  ngOnInit() {
    this.getListOfCountries();
  this.user = this.tokenStorage.getUser();
    const organization = this.user.organization;
    this.organizationService
      .findById(organization.id)
      .subscribe((resp: any) => {
        this.buildForm(resp);
      });
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      const countryValue = this.firstForm.get("country").value;
      this.listCountries$ = this.countryService.getCountriesByLang();
      if (countryValue) {
        this.listCountries$.subscribe((res) => {
          for (const cont of res) {
            if (cont.code === countryValue.code) {
              this.firstForm.get("country").setValue(cont);
              break;
            }
          }
        });
      }
    });
  }
  save() {
    this.organization.logo=this.base64textString[0];
    this.organizationService
      .saveOrUpdate(this.organization)
      .subscribe((resp) => {
        this.user.organization=this.organization;
        this.tokenStorage.saveUser(this.user);
        this.sharedService.setDemandeLogo(this.base64textString[0]);
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
      const name = this.firstForm.get("name").value;
      const address = this.firstForm.get("address").value;
      const country = this.firstForm.get("country").value;
      const phoneNumber = this.firstForm.get("phoneNumber").value;
      const timeZone = this.firstForm.get("timeZone").value.value;
      const logo = this.firstForm.get("logo").value;
      const type = this.firstForm.get("type").value;
      const thresholdeSucccess = this.firstForm.get("thresholdeSucccess").value;
      const thresholdeCatchUp = this.firstForm.get("thresholdeCatchUp").value;
      const scale = this.firstForm.get("scale").value;
      this.organization.name = name;
      this.organization.scale = scale;
      this.organization.thresholdeSucccess = thresholdeSucccess;
      this.organization.type = type;
      this.organization.adresse = address;
      this.organization.country = country;
      this.organization.logo = logo;
      this.organization.phoneNumber = phoneNumber;
      this.organization.timeZone = timeZone;
      this.organization.thresholdeCatchUp = thresholdeCatchUp;
      stepper.next();
    }
  }
  nextForm2(stepper: MatStepper) {
    this.onReCalculateTotal1();

    this.isClickSecondForm = true;

    if (this.isHigherEducation) {
      this.onReCalculateTotal2();
    }
    const percentageAbsenceBefore = this.secondForm.get(
      "percentageAbsenceBefore"
    ).value;
    const percentageCourBefore = this.secondForm.get("percentageCourBefore")
      .value;
    const percentageExamBefore = this.secondForm.get("percentageExamBefore")
      .value;
    const percentageQuizBefore = this.secondForm.get("percentageQuizBefore")
      .value;
    const percentageAbsenceAfter = this.secondForm.get("percentageAbsenceAfter")
      .value;
    const percentageCourAfter = this.secondForm.get("percentageCourAfter")
      .value;
    const percentageExamAfter = this.secondForm.get("percentageExamAfter")
      .value;
    const percentageQuizAfter = this.secondForm.get("percentageQuizAfter")
      .value;
    this.percentage.absenceBefore = percentageAbsenceBefore;
    this.percentage.courBefore = percentageCourBefore;
    this.percentage.examBefore = percentageExamBefore;
    this.percentage.quizBefore = percentageQuizBefore;
    this.percentage.absenceAfter = percentageAbsenceAfter;
    this.percentage.courAfter = percentageCourAfter;
    this.percentage.examAfter = percentageExamAfter;
    this.percentage.quizAfter = percentageQuizAfter;
    this.organization.percentage = this.percentage;

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
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === "") {
      return null;
    }
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  getListOfCountries() {
    this.listCountries$ = this.countryService.getCountriesByLang();
    this.firstForm.get("country").setValue(null);
    this.firstForm.get("timeZone").setValue(null);
  }
  isFieldValidForm1(field: string) {
    this.firstForm.get(field).hasError("whitespace") &&
      !this.firstForm.get(field).hasError("required") &&
      (this.firstForm.get(field).touched || this.isClickFirstForm);
  }
  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    

  }
  
  handleReaderLoaded(e) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.organization.logo=this.base64textString[0];
  }
 }
