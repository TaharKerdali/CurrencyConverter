import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'localString'
})
export class CurrencyConverterPipe implements PipeTransform {
	transform(value: string | number): string {
		value = (typeof value === 'string') ? parseFloat(value) : value;
		return value.toLocaleString('en-US');
	}
}
