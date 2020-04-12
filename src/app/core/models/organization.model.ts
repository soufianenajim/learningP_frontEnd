import { Historized } from "./historized.model";
import { Level } from "./level.model";
import { Branch } from "./branch.model";

export class Organization extends Historized {
  constructor(
    public name?: string,
    public levels?:Level[],
    public branchs?:Branch[],
  ) {
    super();
  }
}
