import fs from 'fs';
import fileType from 'file-type';
import getStream from 'get-stream';
import test from 'ava';
import parsePng from '.';

test('parse', async t => {
	const png = await parsePng(fs.readFileSync('./fixture.png'));
	t.is(png.width, 200);
	t.is(png.height, 133);
	t.is(png.depth, 8);
	t.true(Buffer.isBuffer(png.data));
});

test('pack', async t => {
	const png = await parsePng(fs.readFileSync('./fixture.png'));
	t.deepEqual(fileType(await getStream.buffer(png.pack())), {ext: 'png', mime: 'image/png'});
});

test('parse interlaced png', async t => {
	const png = await parsePng(fs.readFileSync('./fixture-interlaced.png'));
	t.true(png.interlace);
});

test('pack interlaced png', async t => {
	const png = await parsePng(fs.readFileSync('./fixture-interlaced.png'));
	t.deepEqual(fileType(await getStream.buffer(png.pack())), {ext: 'png', mime: 'image/png'});
});

test('accepts buffer', async t => {
	await t.throwsAsync(parsePng('foo'), 'Expected `buffer` to be of type `Buffer` but received type `string`');
});
