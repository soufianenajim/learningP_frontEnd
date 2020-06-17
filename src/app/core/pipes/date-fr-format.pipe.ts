import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";

@Pipe({
  name: "formatToFR",
})
export class DateFrFormat implements PipeTransform {
  transform(value: any, lang?: any, isTime?: any): any {
    if (value) {
      if (lang === "fr")
        return moment(value).format(
          isTime === "true" ? "DD/MM/YYYY hh:mm:ss" : "DD/MM/YYYY"
        );
      else if (lang === "en") {
        return moment(value).format(
          isTime === "true" ? "MM-DD-YYYY hh:mm:ss" : "MM-DD-YYYY"
        );
      }
    }
    return "---";
  }
}
