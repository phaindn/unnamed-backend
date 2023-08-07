import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ClientConfig } from 'pg';

class Locals {
	/**
	 * Makes env configs available for your app
	 * throughout the app's runtime
	 */
	public static config() {
		dotenv.config({ path: path.join(__dirname, '../../.env') });

		const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
		const port = Number(process.env.PORT) || 4040;
		const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
		const mongooseUrl = process.env.MONGOOSE_URL;
		const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
		const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';

		const name = process.env.APP_NAME || 'NodeTS Dashboard';
		const keywords = process.env.APP_KEYWORDS || 'somethings';
		const year = (new Date()).getFullYear();
		const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
		const company = process.env.COMPANY_NAME || 'GeekyAnts';
		const description = process.env.APP_DESCRIPTION || 'Here goes the app description';
		
		const postgres: ClientConfig = {
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PWD,
			database: process.env.POSTGRES_DB,
		}

		const isCORSEnabled = Boolean(process.env.CORS_ENABLED) || true;
		const jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || 3;
		const apiPrefix = process.env.API_PREFIX || 'api';

		const logDays = process.env.LOG_DAYS || 10;

		const queueMonitor = Boolean(process.env.QUEUE_HTTP_ENABLED) || true;
		const queueMonitorHttpPort = Number(process.env.QUEUE_HTTP_PORT) || 5550;

		const redisHttpPort = Number(process.env.REDIS_QUEUE_PORT) || 6379;
		const redisHttpHost = process.env.REDIS_QUEUE_HOST || '127.0.0.1';
		const redisPrefix = process.env.REDIS_QUEUE_DB || 'q';
		const redisDB = Number(process.env.REDIS_QUEUE_PREFIX) || 3;

		return {
			appSecret,
			apiPrefix,
			company,
			copyright,
			description,
			isCORSEnabled,
			jwtExpiresIn,
			keywords,
			logDays,
			maxUploadLimit,
			maxParameterLimit,
			mongooseUrl,
			postgres,
			name,
			port,
			redisDB,
			redisHttpPort,
			redisHttpHost,
			redisPrefix,
			url,
			queueMonitor,
			queueMonitorHttpPort
		};
	}

	/**
	 * Injects your config to the app's locals
	 */
	public static init (_express: Application): Application {
		_express.locals.app = this.config();
		return _express;
	}
}

export default Locals;
