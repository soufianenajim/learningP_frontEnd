import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html'
})
export class NotifyComponent implements OnInit {

  options: any = {
    position: ["bottom", "right"],
  };

  position1: string = 'bottom';
  position2: string = 'right';
  timeOut: number = 1000;
  showProgressBar: boolean = true;
  pauseOnHover: boolean = true;
  lastOnBottom: boolean = true;
  clickToClose: boolean = true;
  maxLength: number = 0;
  maxStack: number = 8;
  preventDuplicates: boolean = false;
  preventLastDuplicates: boolean = false;
  theClass: string;
  rtl: boolean = false;
  animate: string = 'fromRight';
  icons: string;
  subType: string = 'success';

  title: string;
  msg: string;

  constructor(private servicePNotify: NotificationsService) { }

  ngOnInit() {
  }

  addNotify(options) {
    //this.pauseOnHover = (options.indexOf("pauseOnHover") > -1) ? options.pauseOnHover : this.pauseOnHover;
    this.servicePNotify.remove();
    this.options  = {
      position : [("position1" in options) ? options.position1 : this.position1, ("position2" in options) ? options.position2 : this.position2],
      maxStack: ("maxStack" in options) ? options.maxStack : this.maxStack,
      timeOut: options.timeOut ? options.timeOut : this.timeOut,
      showProgressBar: ('showProgressBar' in options) ? options.showProgressBar : this.showProgressBar,
      pauseOnHover: ('pauseOnHover' in options) ? options.pauseOnHover : this.pauseOnHover,
      lastOnBottom: ('lastOnBottom' in options) ? options.lastOnBottom : this.lastOnBottom,
      clickToClose: ('clickToClose' in options) ? options.clickToClose : this.clickToClose,
      maxLength: options.maxLength ? options.maxLength : this.maxLength,
      preventDuplicates: ('preventDuplicates' in options) ? options.preventDuplicates : this.preventDuplicates,
      preventLastDuplicates: ('preventLastDuplicates' in options) ? options.preventLastDuplicates : this.preventLastDuplicates,
      theClass: options.theClass ? options.theClass : this.theClass,
      rtl: ('rtl' in options) ? options.rtl : this.rtl,
      animate: options.animate ? options.animate : this.animate,
      icons: options.icons ? options.icons : this.icons
    }
    switch(options.type) {
      case 'success':
        this.servicePNotify.success(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg
        );
        break;
      case 'error':
        this.servicePNotify.error(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg
        );
        break;
      case 'alert':
        this.servicePNotify.error(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg
        );
        break;
      case 'warn':
        this.servicePNotify.error(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg
        );
        break;
      case 'info':
        this.servicePNotify.info(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg
        );
        break;
      case 'create':
        this.servicePNotify.create(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg,
            options.type ? options.type : this.subType
        );
        break;
      case 'html':
        this.servicePNotify.html(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg
        );
        break;
      default:
        this.servicePNotify.alert(
            options.title ? options.title : this.title,
            options.msg ? options.msg : this.msg
        );
        break;
    }
  }

}
