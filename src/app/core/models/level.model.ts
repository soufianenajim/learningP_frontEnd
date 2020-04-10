import { Historized } from "./historized.model";
import { Organization } from "./organization.model";

export class Level extends Historized {
  constructor(
    public name?: string,
    public organization?:Organization
  ) {
    super();
  }
}
