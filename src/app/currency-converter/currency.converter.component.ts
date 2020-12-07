import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CurrencyConverterService } from './currency.converter.service';
import { Currency } from './currency.converter.models';

@Component({
	selector: 'currency-converter',
	templateUrl: './currency.converter.component.html',
	styleUrls: ['./currency.converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
	currencies: Currency[] = [];
	amountControl = new FormControl('1', [this.service.controlAmount(new RegExp('^[0-9]{1,9}(,[0-9]{3})*(\.[0-9]+)*$'))]);
	from = new FormControl('CAD');
	to = new FormControl('USD');
	fromCurrency: Currency;
	toCurrency: Currency;
	rates = null;
	targetCurrency = '';
	showConversion = false;

	constructor(private service: CurrencyConverterService) { }

	ngOnInit(): void {
		this.amountControl.valueChanges.forEach((value) => {
			if (!value) {
				this.amountControl.setValue(1);
			}
		});
		let currenciesSession = sessionStorage.getItem('currencies');
		if (currenciesSession) {
			currenciesSession = JSON.parse(currenciesSession);
			for (const id of Object.keys(currenciesSession)) {
				this.currencies.push(currenciesSession[id]);
			}
			return;
		}
		this.service.getCurrencies().subscribe((data: any) => {
			for (const id of Object.keys(data)) {
				this.currencies.push(data[id]);
				sessionStorage.setItem('currencies', JSON.stringify(data));
			}
		});
	}

	swapCurrency(): void {
		const currency = this.from.value;
		this.from.setValue(this.to.value);
		this.to.setValue(currency);
		this.showConversion = false;
	}

	convert(): void {
		this.targetCurrency = this.from.value.concat('_', this.to.value);
		this.service.getRate(`${this.targetCurrency},${this.to.value.concat('_', this.from.value)}`).subscribe((data) => {
			this.rates = data;
			const currenciesSession = JSON.parse(sessionStorage.getItem('currencies'));
			this.fromCurrency = currenciesSession[this.from.value];
			this.toCurrency = currenciesSession[this.to.value];
			this.showConversion = true;
		});
	}
}
