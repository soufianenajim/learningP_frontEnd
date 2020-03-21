import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-multi-step',
  templateUrl: './multi-step.component.html',
  styleUrls: ['./multi-step.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MultiStepComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

  step2: any = {
    showNext: true,
    showPrev: true
  };

  step3: any = {
    showSecret: false
  };

  isCompleted: boolean = false;

  onStep1Next(event) {
    console.log('Step1 - Next');
  }

  onStep2Next(event) {
    console.log('Step2 - Next');
  }

  onStep3Next(event) {
    console.log('Step3 - Next');
  }

  onComplete(event) {
    this.isCompleted = true;
  }

  onStepChanged(step) {
    console.log('Changed to ' + step.title);
  }
}