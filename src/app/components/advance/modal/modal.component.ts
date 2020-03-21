import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {fadeInOutTranslate} from "../../../shared/elements/animation";
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  animations: [fadeInOutTranslate]
})
export class ModalComponent implements OnInit {
  showDialog:boolean = false;
  @Input() visible: boolean;

  constructor() {}

  ngOnInit() {
  }

  openMyModal(event) {
    document.querySelector("#"+event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  openBasicModal(event) {
    this.showDialog = !this.showDialog;
    setTimeout(()=> {
      document.querySelector("#"+event).classList.add('md-show');
    }, 25);
  }

  closeBasicModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    setTimeout(() => {
      this.visible = false;
      this.showDialog = !this.showDialog;
    }, 300);
  }

  openSwal() {
    swal({
      title: 'Error!',
      text: 'Do you want to continue',
      type: 'error',
      confirmButtonText: 'Cool',
      allowOutsideClick: true
    }).catch(swal.noop);
  }

  openBasicSwal() {
    swal({
      title: "Here's a message!",
      text: "It's pretty, isn't it?"
    }).catch(swal.noop);
  }

  openSuccessSwal() {
    swal({
      title: 'Good job!',
      text: 'You clicked the button!',
      type: 'success'
    }).catch(swal.noop);
  }

  openConfirmsSwal() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
      )
    }).catch(swal.noop);
  }

  openSuccessCancelSwal() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success m-r-10',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function () {
      swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
      )
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
        )
      }
    }).catch(swal.noop);
  }

  openPromptSwal() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    })

    var steps = [
      {
        title: 'Question 1',
        text: 'Chaining swal2 modals is easy'
      },
      'Question 2',
      'Question 3'
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults()
      swal({
        title: 'All done!',
        html:
        'Your answers: <pre>' +
        JSON.stringify(result) +
        '</pre>',
        confirmButtonText: 'Lovely!',
        showCancelButton: false
      })
    }, function () {
      swal.resetDefaults()
    }).catch(swal.noop);
  }

  openAjaxSwal() {
    swal({
      title: 'Submit email to run ajax request',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function (email) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (email === 'taken@example.com') {
              reject('This email is already taken.')
            } else {
              resolve()
            }
          }, 2000)
        })
      },
      allowOutsideClick: false
    }).then(function (email) {
      swal({
        type: 'success',
        title: 'Ajax request finished!',
        html: 'Submitted email: ' + email
      })
    }).catch(swal.noop);
  }

}