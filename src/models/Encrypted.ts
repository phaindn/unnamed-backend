import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt-nodejs';

export class EncryptedModel {

    public static comparePassword(source: string, dest: string) {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(source, dest, (err, isMatch) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(isMatch);
            });
        })
	};

    public static encryptPassword(password: string) {
        return new Promise<string>((resolve, reject) => {
            bcrypt.genSalt(10, (error, salt) => {
                if (error) {
                    return reject(error);
                }
        
                bcrypt.hash(password, salt, null, (error, hash) => {
                    if (error) {
                        return reject(error);
                    }
        
                    return resolve(hash);
                });
            });
        });
    }

    public static gravatar(email: string, size = 200) {
        const url = 'https://gravatar.com/avatar';
        if (!email) {
            return `${url}/?s=${size}&d=retro`;
        }
    
        const md5 = crypto.createHash('md5').update(email).digest('hex');
        return `${url}/${md5}?s=${size}&d=retro`;
    };
}

export type IEncryptedModel = typeof EncryptedModel;