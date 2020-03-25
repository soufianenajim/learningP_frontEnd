import { Historized } from "./historized.model";
import { Cour } from "./cour.model";

export class Td extends Historized{

    constructor(
        
        public name?: string,
        public cour?: Cour,
        public questions?: any[]
    ) {
        super();
    }

    
}
