import { Historized } from "./historized.model";

export class Group extends Historized {
  constructor(
    public name?: string,
    public level?:any,
    public branch?:any,
  ) {
    super();
  }
}
