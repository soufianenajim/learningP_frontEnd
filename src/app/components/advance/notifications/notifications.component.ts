import {Component, OnInit} from '@angular/core';
import {ToastyService, ToastOptions, ToastData} from "ng2-toasty";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  position: string = 'bottom-right';
  title: string;
  msg: string;
  showClose: boolean = true;
  timeout: number = 5000;
  theme: string = 'bootstrap';
  type: string = 'default';
  closeOther: boolean = false;
  constructor(private toastyService: ToastyService) {}

  ngOnInit() {
  }

  addToast(options) {
    if(options.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = options.position ? options.position : this.position;
    let toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added removed!');
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }



}
  