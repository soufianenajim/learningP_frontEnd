import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {

  myForm: FormGroup;
  mynumberForm: FormGroup;
  mytooltipForm: FormGroup;
  checkdropForm: FormGroup;

  constructor() {

    let name = new FormControl('', Validators.required);
    let password = new FormControl('', Validators.required);
    let gender = new FormControl('', Validators.required);
    let email = new FormControl('', [Validators.required,Validators.email]);

    let rpassword = new FormControl('', [Validators.required,CustomValidators.equalTo(password)]);
    this.myForm = new FormGroup({
      name:name,
      email:email,
      password: password,
      rpassword: rpassword,
      gender: gender
    });
    /*Basic validation end*/

    /*number Validation start*/
    let integer = new FormControl('', [Validators.required, CustomValidators.digits]);
    let numeric = new FormControl('', [Validators.required, CustomValidators.number]);
    let greater = new FormControl('', [Validators.required, CustomValidators.gt(50)]);
    let less = new FormControl('', [Validators.required, CustomValidators.lt(50)]);

    this.mynumberForm = new FormGroup({
      integer:integer,
      numeric:numeric,
      greater: greater,
      less: less
    });
    /*number validation end*/

    /*Tooltip Validation Start*/
    let usernameP = new FormControl('', [Validators.required]);
    let EmailP = new FormControl('', [Validators.required, Validators.email]);
    this.mytooltipForm = new FormGroup({
      usernameP:usernameP,
      EmailP:EmailP,
    });
    /*Tooltip Validation End*/

    /* component form */
    let area = new FormControl('', [Validators.required]);
    let job = new FormControl('', [Validators.required]);
    this.checkdropForm = new FormGroup({
      area:area,
      job:job,
    });
    /* end component form */
  }

  ngOnInit() {
  }


  submitted: boolean;

  onSubmit() {
    this.submitted = true
    console.log(this.myForm);
  }

}
