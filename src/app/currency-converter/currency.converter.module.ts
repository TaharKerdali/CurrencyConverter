import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyConverterService } from './currency.converter.service';

import { CurrencyConverterComponent } from './currency.converter.component';
import { CurencyConversionResultComponent } from './currency.conversion.result.component';
import { CurrencyConverterPipe } from './currency.converter.pipe';

@NgModule({
	imports: [
		BrowserModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		CurrencyConverterService
	],
	declarations: [
		CurrencyConverterComponent,
		CurencyConversionResultComponent,
		CurrencyConverterPipe
	],
	exports: [
		CurrencyConverterComponent,
		CurencyConversionResultComponent
	]
})
export class CurrencyConverterModule { }
