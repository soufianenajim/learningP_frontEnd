import { Historized } from "./historized.model";
import { Organization } from "./organization.model";

export class ModuleName extends Historized {
  constructor(
    public name?: string,
    public organization?:Organization
  ) {
    super();
  }
}
