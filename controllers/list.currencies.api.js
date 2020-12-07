const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/', (req, res) => {
	const apiKey = req.query.apiKey;
	const options = {
		hostname: 'free.currconv.com',
		path: `/api/v7/currencies?apiKey=${apiKey}`
	}
	const request = https.request(options, (response) => {
		let buffer = '';
		response.setEncoding('utf8');
		response.on('data', (chunk) => {
			buffer += chunk;
		})
		.on('end', () => {
			res.send(JSON.parse(buffer).results);
		});
	})
	request.on('error', (e) => {
		console.log(`Error request : ${e.message}`);
	});
	request.end();
});

module.exports = router;