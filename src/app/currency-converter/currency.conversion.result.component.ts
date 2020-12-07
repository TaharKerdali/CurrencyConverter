import { Component, OnInit, Input } from '@angular/core';

import { Currency } from './currency.converter.models';

@Component({
	selector: 'curr-conv-result',
	templateUrl: './currency.conversion.result.component.html',
	styleUrls: ['./currency.conversion.result.component.scss']
})
export class CurencyConversionResultComponent implements OnInit {
	@Input() rates: object;
	@Input() amount: number;
	@Input() from: Currency;
	@Input() to: Currency;

	conversionResult: number;
	targetRate: number;
	reverseRate: number;
	conversionDate: Date = new Date();

	ngOnInit(): void {
		this.targetRate = this.rates[this.from.id.concat('_', this.to.id)];
		this.reverseRate = this.rates[this.to.id.concat('_', this.from.id)];
		this.conversionResult = this.amount * this.targetRate;
	}
}
