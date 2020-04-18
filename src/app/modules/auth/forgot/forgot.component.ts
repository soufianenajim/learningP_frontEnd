import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: [`
  li {
    display: inline-block;
    margin: 5px;
}
 
`]
})
export class ForgotComponent implements OnInit {

  public myForm: FormGroup;
  isClickSave= false;
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private translate: TranslateService) {
    // let emailPattern = new RegExp(/^(([a-zA-Zé1-9]+[._-]?[a-zA-Zé1-9]+)+[@][a-zA-Zé1-9]+[.][a-z]{0,3})+$/);
    // const email = new FormControl('', [Validators.required,this.noWhitespaceValidator,Validators.pattern(sharedConstants.EMAIL_PATTERN)]);
    // this.myForm = new FormGroup({
    //   email: email,

    // });
  }

  ngOnInit() {

  }

  onSubmit() {
    // this.isClickSave = true;
    // let email = this.myForm.get('email').value != '' ? this.myForm.get('email').value : null;
    // if (email !== null && !this.invalidData('email')) {
    //   this.userService.forgotPassword(email).subscribe(data => {
    //     this.router.navigate(['/']);
    //   });
    // }

  }
  setLang(lang: string) {
    this.translate.use(lang);
  }
  invalidData(field){
    return this.myForm.get(field).hasError('whitespace') && !this.myForm.get(field).hasError('required') && (this.myForm.get(field).touched || this.isClickSave) || this.invalidEmail();
  }
  public noWhitespaceValidator(control: FormControl) {
    if (control.value === '') {
      return null;
    }
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  invalidEmail(): boolean {
    var email = this.myForm.get("email").value;
    var re = /^(([a-zA-Zé1-9]+[._-]?[a-zA-Zé1-9]+)+[@][a-zA-Zé1-9]+[.][a-z]{0,3})+$/;
    if (email !== '') { return !re.test(String(email).toLowerCase()) }
    return false;

  }
}
