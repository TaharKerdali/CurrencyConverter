const express = require('express');
const app = express();

const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const Currencies = require('./controllers/list.currencies.api');
app.use('/api/list-currencies', (req, res) => {
	const apiKey = req.query.apiKey;
	const currenciesController = new Currencies();
	currenciesController.getCurrencies(apiKey)
	.then((currenciesList) => {
		res.send(currenciesList);
	})
	.catch((e) => {
		console.log(e);
	})
});

const currencyRate = require('./controllers/currency.rate.api');
app.use('/api/currency-rate', (req, res) => {
	const currency = req.query.currency;
	const apiKey = req.query.apiKey;
	const currencyRateController = new currencyRate();
	currencyRateController.getCurrencyRate(currency, apiKey)
	.then((currencyRate) => {
		res.send(currencyRate);
	})
	.catch((e) => {
		console.log(e);
	});
});

const PORT = 2016;

app.listen(PORT, () =>
	console.log(`the server is listening on the port ${PORT}`)
);