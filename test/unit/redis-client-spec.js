'use strict';
const { RedisMocker } = require('../utils');
const { expect } = require('chai');
const redisClient = require('./../../src/redis-client');

const redisMocker = new RedisMocker();
describe("test resdis-get-async-mock", () => {

	beforeEach(() => {

	});

	afterEach(() => {
		redisMocker.reset();
	});

	it('test one', async () => {
		// GIVE
		redisMocker.mockGetOnFirstCall(true);
		redisMocker.mockGetOnSecondCall(false);

		// WHEN
		const client = new redisClient();
		const response1 = await client.getDocById(1);
		const response2 = await client.getDocById(2);
		// THEN
		expect(response1).to.eql(true);
		expect(response2).to.eql(false);
	});

});
