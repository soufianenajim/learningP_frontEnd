import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { LocalService } from '../../../core/services/local/local.service';

import { UserService } from '../../../core/services/user/user.service';
import { TokenStorageService } from '../../../core/services/token_storage/token-storage.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {

  // loginForm: FormGroup;
  // loading = false;
  // submitted = false;
  // returnUrl: string;
  // myProfieUrl: String;
  // error: String = '';
  // lang = 'en';
  // i18Error;
  // show = false;
  // timeOfBlock;
  // isLoggedIn = false;
  
  // isLoginFailed = false;
  // errorMessage = '';
  // roles: string[] = [];

  // constructor(private formBuilder: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private userService: UserService,
  //   private authService: AuthenticationService,
  //   private translate: TranslateService,
  //   private localeService: LocalService,
    
  //   private tokenStorage: TokenStorageService) {
  //     this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
     
 
  // }

  // ngOnInit() {

  //   this.loginForm = this.formBuilder.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });

  //   this.loginForm.valueChanges.subscribe(val => {
  //     if (this.f.email.dirty || this.f.password.dirty) {
  //       this.error = '';
  //     }
  //   });

  //   if (this.tokenStorage.getToken()) {
  //     this.isLoggedIn = true;
  //     this.roles = this.tokenStorage.getUser().roles;
  //   }

  // }

  // get f() {
  //   return this.loginForm.controls;
  // }
  // showPasword() {
  //   this.show = !this.show;
  // }

  // removeError() {
  //   this.error = null;
  // }

  // onSubmit() {
  //   this.authService.login(this.loginForm.value).subscribe(
  //     data => {
  //       console.log('data',data);
  //       this.tokenStorage.saveToken(data.token);
  //       this.tokenStorage.saveUser(data);

  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.roles = this.tokenStorage.getUser().roles;
  //       this.router.navigate([this.returnUrl]);
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isLoginFailed = true;
  //     }
  //   );
  // }

  // setLang(lang: string) {
  //   this.lang = lang;
  //   this.translate.use(lang);
  //   if (this.lang === 'en') {
  //     this.localeService.registerLocale('en-US');
  //   } else if (this.lang === 'fr') {
  //     this.localeService.registerLocale('fr-FR');
  //   } else {
  //     this.localeService.registerLocale('ar-FR');
  //   }
  // }
  // getI18n(name): string {
  //   let i18;
  //   this.translate.get(name).subscribe((value: string) => {

  //     i18 = value;
  //   });
  //   return i18;
  // }
  // getError(error): string {

  //   const expr: String = error.message;
  //   if (expr) {
  //     switch (expr) {
  //       case 'Bad credentials':

  //         if (error.status === 423) {
  //           this.i18Error = 'LOGIN.LOCKED'
  //           return this.getI18n('LOGIN.LOCKED') + this.timeOfBlock + this.getI18n('LOGIN.MINUTES')
  //         }
  //         else {
  //           this.i18Error = 'LOGIN.INCORRECT';
  //           return this.getI18n('LOGIN.INCORRECT')
  //         }

  //       case 'User account has expired':
  //         this.i18Error = 'LOGIN.EXPIRED';
  //         return this.getI18n('LOGIN.EXPIRED')
  //       case 'User account is locked':
  //         this.i18Error = 'LOGIN.LOCKED'
  //         return this.getI18n('LOGIN.LOCKED') + this.timeOfBlock + this.getI18n('LOGIN.MINUTES')
  //       default:

  //     }
  //   }
  //   return this.getI18n('LOGIN.CNX_FAILED')



  // }
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  myProfieUrl: String;
  error: String = '';
  lang = 'en';
  i18Error;
  show = false;
  timeOfBlock;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private tokenStorage: TokenStorageService,
    private localeService: LocalService) {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
    this.myProfieUrl = this.route.snapshot.queryParams.returnUrl || 'myprofile';
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(val => {
      if (this.f.email.dirty || this.f.password.dirty) {
        this.error = '';
      }
    });

   

  }

  get f() {
    return this.loginForm.controls;
  }
  showPasword() {
    this.show = !this.show;
  }

  removeError() {
    this.error = null;
  }

  onSubmit() {

    this.submitted = true;
    this.error = '';
    // stop here if form is invalid
    if (this.f.email.value === '' || this.f.password.value === '') {
      this.error = this.getI18n('LOGIN.REQUIRED');
      return;
    }
    if (this.loginForm.invalid) {
      this.submitted = false;
      return;
    }

    this.loading = true;
    const user: User = { email: this.f.email.value, password: this.f.password.value };
    this.authenticationService.login(user)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data != null) {
            console.log('data',data);
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data);
            localStorage.setItem('auth-user', JSON.stringify(data));
            // if (data.isNew) {
            //   this.router.navigate([this.myProfieUrl]);
            // } else {
              this.router.navigate([this.returnUrl]);
        //     }

          }
        },
        error => {
          console.log('error',error);
          this.userService.timeOfBlock(this.f.email.value).subscribe(resp => {
            this.timeOfBlock = resp;
            this.loginForm.get('password').setValue('');
            this.error = this.getError(error);
            this.loading = false;
          }, error => {
            this.loginForm.get('password').setValue('');
            this.error = this.getError(error);
            this.loading = false;
          })

        });



  }

  setLang(lang: string) {
    this.lang = lang;
    this.translate.use(lang);
    if (this.lang === 'en') {
      this.localeService.registerLocale('en-US');
    } else if (this.lang === 'fr') {
      this.localeService.registerLocale('fr-FR');
    } else {
      this.localeService.registerLocale('ar-FR');
    }
  }
  getI18n(name): string {
    let i18;
    this.translate.get(name).subscribe((value: string) => {

      i18 = value;
    });
    return i18;
  }
  getError(error): string {

    const expr: String = error.message;
    if (expr) {
      switch (expr) {
        case 'Bad credentials':

          if (error.status === 423) {
            this.i18Error = 'LOGIN.LOCKED'
            return this.getI18n('LOGIN.LOCKED') + this.timeOfBlock + this.getI18n('LOGIN.MINUTES')
          }
          else {
            this.i18Error = 'LOGIN.INCORRECT';
            return this.getI18n('LOGIN.INCORRECT')
          }

        case 'User account has expired':
          this.i18Error = 'LOGIN.EXPIRED';
          return this.getI18n('LOGIN.EXPIRED')
        case 'User account is locked':
          this.i18Error = 'LOGIN.LOCKED'
          return this.getI18n('LOGIN.LOCKED') + this.timeOfBlock + this.getI18n('LOGIN.MINUTES')
        default:

      }
    }
    return this.getI18n('LOGIN.CNX_FAILED')



  }
}
