const http = require('http');
class Currencies {

	async getCurrencies(apiKey) {
		let currenciesPromise = new Promise((resolve, reject) => {
			const options = {
				hostname: 'free.currconv.com',
				path: `/api/v7/currencies?apiKey=${apiKey}`
			}
			let request = http.request(options, (res) =>{
				res.setEncoding('utf-8');
				let data = '';
	
				res.on('data', (chunk) => {
					data += chunk;
				}).on('end', () => {
					resolve(JSON.parse(data).results);
				});
			});
			request.on('error', (e) => {
				reject(e);
			});

			request.end();
		});
		return currenciesPromise;
	}
}

module.exports = Currencies;