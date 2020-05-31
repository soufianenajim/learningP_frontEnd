import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
  url = environment.baseUrl + "/country";
    constructor(private http: HttpClient, private translate: TranslateService) {}

    getAllCountries(): Observable<any> {
        return this.http.get(this.url+'/all');
    }

    getCountriesByLang(): Observable<any> {
        const lang = this.translate.currentLang;
        
        return this.http.get(this.url+'/'+lang+'/all');
    }

    getCountryByCodeAndLang (code?: string, lang?: string): Observable<any> {
        return this.http.get(this.url+'/'+code+'/'+lang);
    }
}