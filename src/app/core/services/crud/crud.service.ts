import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
protected url:string;
protected headers:any;
protected options :any;

  constructor(private http:HttpClient) { }

  setUrl(url:String){
   
  }
 
}
