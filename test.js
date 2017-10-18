import fs from 'fs';
import fileType from 'file-type';
import getStream from 'get-stream';
import test from 'ava';
import m from '.';

test('parse', async t => {
	const data = await m(fs.readFileSync('./fixture.png'));
	t.is(data.width, 200);
	t.is(data.height, 133);
	t.is(data.depth, 8);
	t.true(Buffer.isBuffer(data.data));
});

test('pack', async t => {
	const png = await m(fs.readFileSync('./fixture.png'));
	t.deepEqual(fileType(await getStream.buffer(png.pack())), {ext: 'png', mime: 'image/png'});
});

test('parse interlaced png', async t => {
	const data = await m(fs.readFileSync('./fixture-interlaced.png'));
	t.true(data.interlace);
});

test('pack interlaced png', async t => {
	const png = await m(fs.readFileSync('./fixture-interlaced.png'));
	t.deepEqual(fileType(await getStream.buffer(png.pack())), {ext: 'png', mime: 'image/png'});
});
