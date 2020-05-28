import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenStorageService } from '../core/services/token_storage/token-storage.service';
declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css',
        '../../assets/icon/SVG-animated/svg-weather.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
    isStudent=false;
    isTeacher=false;
    isClientAdmin=false;
    isTechnicalAdmin=false;
    user;
    constructor(private tokenStorageService:TokenStorageService){

    }
    ngOnInit() {
      console.log('dashboard');
        this.user=this.tokenStorageService.getUser();
        const role=this.user.refRole.name;
        console.log('role',role);
         // if(role==='')     
         if(role==='ROLE_TEACHER'){
             this.isTeacher=true;
         }    
         else if(role==='ROLE_STUDENT'){
             this.isStudent=true;
         }  
        else if(role==='ROLE_ADMIN_CLIENT'){
             this.isClientAdmin=true;
         }
         else if(role==='ROLE_ADMIN_TECHNIQUE'){
            this.isTechnicalAdmin=true;
        }


    }
}