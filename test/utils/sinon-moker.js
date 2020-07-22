'use strict';

const sinon = require('sinon');


class SinonMocker {

	constructor() {
		this._stubs = new Set();
		this._sandbox = sinon.createSandbox();
	}

	

}
