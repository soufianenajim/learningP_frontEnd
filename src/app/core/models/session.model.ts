import { Historized } from "./historized.model";
import { Organization } from "./organization.model";

export class Session extends Historized {
  constructor(
    public name?: string,
    public organization?:Organization,
    public startDate?:Date,
    public endDate?:Date,
    public startDateExam?:Date,
    public endDateExam?:Date,
    public startDateCatchUp?:Date,
    public endDateCatchUp?:Date,
  ) {
    super();
  }
}
