import * as kue from 'kue';

import Locals from './Locals';
import Log from '../middlewares/Log';

class Queue {
	public jobs: any;

	constructor() {
		this.jobs = kue.createQueue({
			prefix: Locals.config().redisPrefix,
			redis: {
				port: Locals.config().redisHttpPort,
				host: Locals.config().redisHttpHost,
				db:  Locals.config().redisDB,
				pass: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
			}
		});

		this.jobs
			.on('job enqueue', (id, type) => Log.info(`Queue :: #${id} Processing of type '${type}'`))
			.on('job complete', (id) => this.removeProcessedJob(id));
	}

	public dispatch (jobName: string, args: object, callback: Function): void {
		this.jobs.create(jobName, args).save();

		this.process(jobName, 3, callback);
	}

	private removeProcessedJob (id): void {
		Log.info(`Queue :: #${id} Processed`);

		kue.Job.get(id, (_err, _job) => {
			if (_err) { return; }

			_job.remove((_err) => {
				if (_err) { throw _err; }

				Log.info(`Queue :: #${id} Removed Processed Job`);
			});
		});
	}

	private process (jobName: string, count: number, callback: Function): void {
		this.jobs.process(jobName, count, (job, done) => {
			done(); // Notifies KUE about the completion of the job!

			callback(job.data);
		});
	}
}

export default new Queue;
