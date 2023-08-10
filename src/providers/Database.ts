import { Pool } from 'pg';

import Locals from './Locals';
import Log from '../middlewares/Log';

export class Database {

	public static pool: Pool;

	// Initialize your database pool
	public static init (): any {
		const config = Locals.config().postgres;

		this.pool = new Pool(config);
		this.pool.connect().then(() => {
			Log.info('Connected to Postgres at: ' + config);
		}).catch(error => {
			Log.info('Failed to connect to the Postgres!!');
			console.log(error);
			throw error;
		});
	}
}

export default Database.pool;
