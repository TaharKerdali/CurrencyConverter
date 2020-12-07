const express = require('express');
const router = express.Router();

const https = require('https');

router.get('/', (req, res) => {
	const currency = req.query.currency;
	const apikey = req.query.apiKey;
	let options = {
		hostname: 'free.currconv.com',
		path: `/api/v7/convert?q=${currency}&compact=ultra&apiKey=${apikey}`
	}
	let request = https.request(options, (response) => {
			response.setEncoding('utf8');
			response.on('data', (chunk) => {
				res.send(chunk)
			});
		});
		request.on('error', (e) => {
			console.log(`http call error: ${e.message}`);
		});
		request.end();
});

module.exports = router;