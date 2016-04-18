# parse-png [![Build Status](https://travis-ci.org/kevva/parse-png.svg?branch=master)](https://travis-ci.org/kevva/parse-png)

> Parse a PNG


## Install

```
$ npm install --save parse-png
```


## Usage

```js
const fs = require('fs');
const parsePng = require('parse-png');

parsePng(fs.readFileSync('unicorn.png')).then(data => {
	console.log(data);
	/*
	{
		width: 200,
		height: 133,
		depth: 8,
		interlace: false,
		palette: false,
		color: true,
		alpha: false,
		bpp: 3,
		colorType: 2,
		data: <Buffer 29 48 4d ...>
	}
	*/
});
```


## API

### parsePng(buffer)

#### buffer

*Required*<br>
Type: `buffer`

A PNG image buffer.

#### options

Type: `object`

See the [pngjs options](https://github.com/lukeapage/pngjs).


## License

MIT © [Kevin Martensson](http://github.com/kevva)
