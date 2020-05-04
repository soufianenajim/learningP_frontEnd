import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  canvas = document.createElement('canvas');
  ctx = this.canvas.getContext('2d');





  constructor() {
    this.ctx.font = 'Roboto,"Helvetica Neue",sans-serif';
  }

 

  getName(row: string, numberCharacter: number): any {
    let charWidth = 0;
    let textToRender = '';

    for (const c of row) {
      if (charWidth <= (numberCharacter * 2.4)) {
        charWidth += this.ctx.measureText(c).width;
        textToRender += c;
      } else {
        return textToRender;
      }
    }
    return row;
  }
}
