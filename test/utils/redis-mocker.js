
const { createSandbox } = require('sinon');

const { FakeRedis } = require('../fake');

const redis = require('redis');

class RedisMocker {
	constructor() {
		this._sandbox = createSandbox();
		this._redis = new FakeRedis();
		this._sandbox.stub(redis, 'createClient').returns(this._redis);
		this.generateStubs();
	}

	generateStubs() {
		this.getStub = this._sandbox.stub(this._redis, 'get');
	}

	mockGetOnFirstCall(value) {
		this.getStub.onFirstCall().yields(null, value);
	}

	mockGetOnSecondCall(value) {
		this.getStub.onSecondCall().yields(null, value);
	}

	reset() {
		this._sandbox.restore();
	}
}

module.exports = RedisMocker;
