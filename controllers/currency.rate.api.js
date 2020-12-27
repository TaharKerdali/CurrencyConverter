const http = require('http');

class CurrencyRate {

	async getCurrencyRate(currency, apiKey) {
		let currencyRatePromise = new Promise((resolve, reject) => {
			const options  = {
				hostname: 'free.currconv.com',
				path: `/api/v7/convert?q=${currency}&compact=ultra&apiKey=${apiKey}`
			}
			let request = http.request(options, (res) => {
				let data = '';
				res.setEncoding('utf-8');
				res.on('data', (chunk) => {
					data += chunk;
				}).on('end', () => {
					resolve(data);
				});
			});
			request.on('error', (e) => {
				reject(e);
			});
			request.end();
		});
		return currencyRatePromise;
	}
}

module.exports = CurrencyRate;