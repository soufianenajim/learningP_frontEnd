import { Historized } from "./historized.model";
import { Cour } from "./cour.model";

export class Exercices extends Historized{

    constructor(
        public name?: string,
        public type?:string,
        public cour?:any,
        public scale?:number,
        public startDateTime?:string,
        public endDateTime?:string,
        public questions?: any[]
    ) {
        super();
    }

    
}
