import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbCalendar} from "@ng-bootstrap/ng-bootstrap";
import {ColorPickerService, Rgba} from "ngx-color-picker";

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
                    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
                    ? false : one.day > two.day : one.month > two.month : one.year > two.year;



const now = new Date();

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css'],
  providers: [ColorPickerService]
})
export class PickerComponent implements OnInit {
  model: any;
  modelCustomDay: any;

  displayMonths: number = 3;
  navigation:string = 'select';

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  disabled: boolean = true;

  materialDate: Date;
  defaultDateSelected: Date = new Date('1993/03/10');
  startDateRange: Date = new Date('2017/07');
  endDateRange: Date = new Date();
  disabledMaterial: boolean = true;
  @Input() testRangeDate: Date;

  toggle: boolean = false;
  lastColor: string;
  rgbaText: string;

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }

  public color: string = '#2889e9';
  public color2: string = "hsla(300,82%,52%)";
  public color3: string = "#fff500";
  public color4: string = "rgb(236,64,64)";
  public color5: string = "rgba(45,208,45,1)";

  public color13: string = "rgba(0, 255, 0, 0.5)";
  public color14: string = "rgb(0, 255, 255)";
  public color15: string = "#a51ad633";

  public basicColor: string = '#2ab2f5';
  public showColorCode: string = '#db968d';
  public showColorCodeHSAL: string = 'hsl(149,27%,65%)';
  public showColorCodeRGBA: string = 'rgb(221,14,190)';
  public changeMeColor: string = '#523698';

  public arrayColors: any = {};
  public selectedColor: string = 'color';

  constructor(public parserFormatter: NgbDateParserFormatter, public calendar: NgbCalendar, public cpService: ColorPickerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.arrayColors['color'] = '#2883e9';
    this.arrayColors['color2'] = '#e920e9';
    this.arrayColors['color3'] = 'rgb(255,245,0)';
    this.arrayColors['color4'] = 'rgb(236,64,64)';
    this.arrayColors['color5'] = 'rgba(45,208,45,1)';

      const windowWidth = window.innerWidth;
      if (windowWidth >= 768 && windowWidth <= 1024) {
          this.displayMonths = 2;
          this.navigation = 'select';
      } else if (windowWidth < 768) {
          this.displayMonths = 1;
          this.navigation = 'select';
      } else {
          this.displayMonths = 3;
          this.navigation = 'none';
      }
  }

  ngOnInit() {
  }

  modelPopup: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.modelPopup = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
  };

  formatDate(materialDate: Date): string {
    return materialDate.toLocaleString();
  }

  onSelect(materialDate: Date) {
    console.log("onSelect: ", materialDate);
  }
  clearDate() {
    this.materialDate = null;
  }
  setToday() {
    this.materialDate = new Date();
  }

  public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

  onChangeColor(color: string): Cmyk {
    return this.rgbaToCmyk(this.cpService.hsvaToRgba(this.cpService.stringToHsva(color)));
  }

  rgbaToCmyk(rgba: Rgba): Cmyk {
    let cmyk: Cmyk = new Cmyk(0, 0, 0, 0), k: number;
    k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
    if (k == 1) return new Cmyk(0, 0, 0, 1);
    cmyk.c = (1 - rgba.r - k) / (1 - k);
    cmyk.m = (1 - rgba.g - k) / (1 - k);
    cmyk.y = (1 - rgba.b - k) / (1 - k);
    cmyk.k = k;
    return cmyk;
  }

  onChangeColorHex8(color: string): string {
    return this.cpService.outputFormat(this.cpService.stringToHsva(color, true), 'rgba', null);
  }

}


