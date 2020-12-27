import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CurrencyConverterService {
	constructor(private http: HttpClient) { }

	getCurrencies(): Observable<HttpResponse<any>> {
		return this.http.get<any>('http://localhost:2016/api/list-currencies?apiKey=cf8647435b1fed31c28e', {
			observe: 'body',
			responseType: 'json'
		});
	}

	getRate(currency: string): Observable<HttpResponse<any>> {
		return this.http.get<any>(`http://localhost:2016/api/currency-rate?currency=${currency}&apiKey=cf8647435b1fed31c28e`, {
			observe: 'body',
			responseType: 'json'
		});
	}

	controlAmount(amountReg: RegExp): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
			const amountIsValid = amountReg.test(control.value);
			return amountIsValid ? null : {amount: {value: control.value}};
		};
	}

}
