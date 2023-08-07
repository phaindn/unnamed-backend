import { Client } from 'pg';

import Locals from './Locals';
import Log from '../middlewares/Log';

export class Database {

	public static client: Client;

	// Initialize your database pool
	public static init (): any {
		const config = Locals.config().postgres;

		this.client = new Client(config);
		this.client.connect().then(() => {
			Log.info('connected to mongo server at: ' + config);
		}).catch(error => {
			Log.info('Failed to connect to the Mongo server!!');
			console.log(error);
			throw error;
		});


	}
}

export default Database.client;
