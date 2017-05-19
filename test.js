import fs from 'fs';
import fileType from 'file-type';
import getStream from 'get-stream';
import pify from 'pify';
import test from 'ava';
import fn from './';

test('parse', async t => {
	const data = await fn(await pify(fs.readFile)('./fixture.png'));
	t.is(data.width, 200);
	t.is(data.height, 133);
	t.is(data.depth, 8);
	t.true(Buffer.isBuffer(data.data));
});

test('pack', async t => {
	const png = await fn(await pify(fs.readFile)('./fixture.png'));
	t.deepEqual(fileType(await getStream.buffer(png.pack())), {ext: 'png', mime: 'image/png'});
});

test('parse interlaced png', async t => {
	const data = await fn(await pify(fs.readFile)('./fixture-interlaced.png'));
	t.true(data.interlace);
});

test('pack interlaced png', async t => {
	const png = await fn(await pify(fs.readFile)('./fixture-interlaced.png'));
	t.deepEqual(fileType(await getStream.buffer(png.pack())), {ext: 'png', mime: 'image/png'});
});
