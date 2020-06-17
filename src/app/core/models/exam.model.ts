import { Historized } from "./historized.model";

export class Exam extends Historized {
  constructor(
    public name?: string,
    public module?: any,
    public startDateTime?:string,
    public endDateTime?:string,
    public questions?: any[],
    public type?:string,
    public afterCurrentDate?:boolean,
    public professor?:any,
    public student?:any
  ) {
    super();
  }
}
