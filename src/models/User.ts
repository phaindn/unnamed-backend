import { IUser, Tokens } from '../interfaces/models/user';
import pool from '../providers/Database';

export class UserModel {

	public static insert(user: Omit<IUser, 'id'>) {
		return new Promise<IUser>((resolve, reject) => {
			user.created_at = Date.now();
			user.updated_at = user.created_at;
			const params = [user.email, user.fullname, user.password, user.created_at, user.updated_at]
			pool.query<IUser>('INSERT INTO users(email, fullname, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5)', params, (error, results) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(results.rows[0]);
			})
		})
	}

	public static async list(limit: number | 'ALL' = 10, offset: number = 0) {
		return new Promise<IUser[]>((resolve, reject) => {
			pool.query<IUser>('SELECT * FROM users WHERE deleted_at IS NULL ORDER BY id ASC LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(results.rows);
			})
		})
	}

	public static async findById<IUser>(id: number) {
		return new Promise((resolve, reject) => {
			pool.query<IUser>('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id], (error, results) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(results.rows[0]);
			})
		})
	}

	public static update(user: Partial<IUser>) {
		return new Promise<IUser>((resolve, reject) => {
			user.updated_at = Date.now();
			const entries = Object.entries(user);
			const fields = entries.map(([key], index) => `${key} = $${index + 1}`)
			const params = entries.map(([, value]) => value)
			
			pool.query<IUser>(`UPDATE users SET ${fields.join(', ')} WHERE id = $${entries.length + 1}`, params, (error, results) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(results.rows[0]);
			})
		})
	}

	public static async delete<IUser>(id: number, hard = false) {
		if (!hard) {
			return this.update({ id, deleted_at: Date.now() })
		}

		return new Promise((resolve, reject) => {
			pool.query<IUser>('DELETE FROM users WHERE id = $1', [id], (error, results) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(results.rows[0]);
			});
			return;
		})
	}
}

class User implements IUser {
	id: number;
	email: string;
	password: string;
	passwordResetToken: string;
	passwordResetExpires: Date;
	facebook: string;
	twitter: string;
	google: string;
	github: string;
	instagram: string;
	linkedin: string;
	tokens: Tokens[];
	steam: string;
	fullname: string;
	gender: string;
	geolocation: string;
	website: string;
	picture: string;
	created_at?: number;
	updated_at?: number;
	deleted_at?: number;

	save() {
		if (this.id > 0) {
			return UserModel.update(this);
		}

		return UserModel.insert(this);
	}

	delete(hard = false) {
		return UserModel.delete(this.id, hard);
	}
}

export default User;