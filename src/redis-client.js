'use strict';

const redis = require('redis');
const { promisify } = require("util");
// const bluebird = require('bluebird');

class RedisClient {

	constructor() {

		['REDIS_HOST', 'REDIS_PORT', 'REDIS_PASS'].forEach(envName => {
			const variable = process.env[envName];
			if (!variable)
				throw Error(`the environment variable ${ envName } must be defined`);
		});

		// bluebird.promisifyAll(redis.RedisClient.prototype);

		this._client = redis.createClient({
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
			password: process.env.REDIS_PASS
		}).on('error', err => {
			console.error('error when establishing connection with redis');
			throw err;
		});

		this.getAsync = promisify(this._client.get).bind(this._client);
		this._expirationTime = process.env.TTL || 86400;

	}

	async getDocById(id) {
		try {
			return JSON.parse(await this.getAsync(id));
		} catch (err) {
			console.error(`Oops! There's been a mistake: ${ JSON.stringify(err, null, 2) }`);
			throw err;
		}
	}

/*	getAsync(key) {
		return new Promise((resolve, reject) => {
			this._client.get(key, (err, reply) => {
				if (err) reject(err);
				resolve(reply);
			});
		});
	}*/
}

module.exports = RedisClient;
