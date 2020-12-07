const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const currencies = require('./controllers/list.currencies.api');
app.use('/api/list-currencies', currencies);

const currency_rate = require('./controllers/currency.rate.api');
app.use('/api/currency-rate', currency_rate);

const PORT = 1982;

app.listen(PORT, () =>
	console.log(`the server is listening on the port ${PORT}`)
);