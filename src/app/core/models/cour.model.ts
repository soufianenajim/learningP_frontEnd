import { Historized } from "./historized.model";

export class Cour extends Historized{

    constructor(
        
        public name?: string,
        public module?: any,
        public content?:string,
        public td?: any,
        public idTeacher?:number,
        public student?:any

    ) {
        super();
    }

    
}
