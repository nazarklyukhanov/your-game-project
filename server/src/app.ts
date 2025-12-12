import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error.handler.middleware';
import router from './routes/main.routes';

dotenv.config();

const app: Express = express();

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
const corsOptions: cors.CorsOptions = {
	origin: [process.env.CLIENT_URL as string],
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

export default app;

