[![Build Status](https://travis-ci.org/tandrewnichols/kindly.png)](https://travis-ci.org/tandrewnichols/kindly) [![downloads](http://img.shields.io/npm/dm/kindly.svg)](https://npmjs.org/package/kindly) [![npm](http://img.shields.io/npm/v/kindly.svg)](https://npmjs.org/package/kindly) [![Code Climate](https://codeclimate.com/github/tandrewnichols/kindly/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/kindly) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/kindly/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/kindly) [![dependencies](https://david-dm.org/tandrewnichols/kindly.png)](https://david-dm.org/tandrewnichols/kindly)

[![NPM info](https://nodei.co/npm/kindly.png?downloads=true)](https://nodei.co/npm/kindly.png?downloads=true)

# Kindly

## Purpose

Kindly is a thin wrapper around fs.readdir that groups files by type.

## Installation

`npm install kindly --save`

`var kindly = require('kindly');`

## API

### .get(directory[, options, callback])

Get files in a directory asynchronously. This function returns a promise but also accepts a callback if you prefer a more traditional style of async.

_Promise-based_:

```js
kindly.get('dir').then(results => {

}, err => {

});
```

_Callback-based_:

```javascript
kindly.get('dir', (err, results) => {

});
```

### .getSync(directory[, options])

Get files in a directory synchronously.

```js
let results = kindly.getSync('dir');
```

## Results

In all cases described above, results will be an object in this form:

```javascript
{
  files: [],
  directories: [],
  symlinks: [],
  other: []
}
```

All file and directory names are prefaced with the path you pass to kindly. Thus, if you use something like

```javascript
var kindly = require('kindly');
var path = require('path');

kindly.get(path.resolve('lib')).then((results) => {

});
```

all of results will be fully qualified paths.

## Options

### noFollow

By default, `kindly` uses `fs.stat` and `fs.statSync` which, in the case of symlinks, give the filetype of the _real_ file to which the symlink points (i.e. by default, you will never get symlinks back in your results). If you would prefer to get symlinks back as symlinks instead of files, you can pass `{ noFollow: true }` as the second argument, which will force this library to use `fs.lstat` and `fs.lstatSync` instead.

```js
kindly.get('dir', { noFollow: true }).then(results => {

});

kindly.get('dir', { noFollow: true }, results => {

});

let results = kindly.get('dir', { noFollow: true });
```

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
