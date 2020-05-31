import { Historized } from "./historized.model";
import { Level } from "./level.model";
import { Branch } from "./branch.model";
import { Country } from "./country.model";
import { Percentage } from "./percentage.model";

export class Organization extends Historized {
  constructor(
    public name?: string,
    public adresse?: string,
    public country?: Country,
    public percentage?: Percentage,
    public phoneNumber?: String,
    public timeZone?: string,
    public timeOfBlock?: number,
    public nbrAttempt?: number,
    public deletable?: boolean,
    public logo?: string,
    public levels?: Level[],
    public branchs?: Branch[],
    public thresholdeCatchUp?: number,
    public thresholdeSucccess?: number,
    public type?: string,
    public scale?: number
  ) {
    super();
  }
}
