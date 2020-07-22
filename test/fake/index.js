class FakeRedis {
	constructor() {
		this.get = ()=> { return true };
		this.on = () => this;
	}
}

module.exports = {
	FakeRedis
};
