import fs from 'fs';
import pify from 'pify';
import test from 'ava';
import fn from './';

test(async t => {
	const data = await fn(await pify(fs.readFile)('./fixture.png'));
	t.is(data.width, 200);
	t.is(data.height, 133);
	t.is(data.depth, 8);
	t.true(Buffer.isBuffer(data.data));
});
