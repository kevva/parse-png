/// <reference types="node"/>
import {expectError, expectType} from 'tsd';
import {Metadata, PNG, PNGOptions} from 'pngjs';
import parsePng = require('.');

expectType<Promise<PNG & Metadata>>(parsePng(Buffer.from('foo')));
expectType<Promise<PNG & Metadata>>(
	parsePng(Buffer.from('foo'), {
		width: 0,
		bgColor: {red: 0, green: 0, blue: 0}
	})
);
expectError(parsePng(Buffer.from('foo'), {foo: 'bar'}));
