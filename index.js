'use strict';
const PNG = require('pngjs').PNG;

module.exports = (buf, opts) => {
	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	return new Promise((resolve, reject) => {
		const png = new PNG(opts);
		let obj = {};

		png.on('error', reject);

		png.on('metadata', data => {
			obj = data;
		});

		png.on('parsed', data => {
			obj.data = data;
			resolve(obj);
		});

		png.end(buf);
	});
};
