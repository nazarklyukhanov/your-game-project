require('dotenv').config();

// Node.js libraries
const fs = require('fs');
const path = require('path');

// Third-party dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Local files
const errorHandler = require('./middleware/error.handler.middleware');
const router = require('./routes/main.routes');

const app = express();

// Logs
if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
	fs.mkdirSync(path.join(__dirname, '..', 'logs'));
}
const date = new Date().toISOString().split('T')[0];
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, '..', 'logs', `access_${date}.log`),
	{ flags: 'a' },
);
app.use(morgan('combined', { stream: accessLogStream }));

// CORS
const corsOptions = {
	origin: [process.env.CLIENT_URL],
	credentials: true,
};
app.use(cors(corsOptions));

// Middlewares
app.use(helmet());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie
app.use(cookieParser());

// Routes
app.use('/', router);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// LAST
app.use(errorHandler);

module.exports = app;
