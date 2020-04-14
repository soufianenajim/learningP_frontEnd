import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
import localeEn from '@angular/common/locales/en-US-POSIX';

@Injectable({providedIn: 'root'})
export class LocalService {

    private _locale: string;

    set locale(value: string) {
        this._locale = value;
    }

    get locale(): string {
        return this._locale || 'en-US';
    }

    registerLocale(culture: string) {
        if (!culture) {
            return;
        }
        this.locale = culture;
        switch (culture) {
            case 'fr-FR': {
                registerLocaleData(localeFr);
                break;
            }
            case 'ar-AR': {
                registerLocaleData(localeAr);
                break;
            }
            case 'en-US': {
                registerLocaleData(localeAr);
                break;
            }
        }

    }

}
