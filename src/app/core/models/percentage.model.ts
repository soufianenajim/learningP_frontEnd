import { Historized } from "./historized.model";


export class Percentage extends Historized {
  constructor(
    public  absenceBefore?:number,
    public  courBefore?:number,
    public  examBefore?:number,
    public  quizBefore?:number,
    public  absenceAfter?:number,
    public  courAfter?:number,
    public  examAfter?:number,
    public  quizAfter?:number,
  ) {
    super();
  }
}
