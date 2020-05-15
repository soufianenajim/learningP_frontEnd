import { Historized } from "./historized.model";

export class Module extends Historized {
  constructor(
    public name?: string,
    public professor?: any,
    public group?:any,
    public cours?: any[],
    public exams?: any[],
    public idOrganization?:number,
    public launched?:boolean,
    public hasExam?:boolean
  ) {
    super();
  }
}
