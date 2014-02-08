[![Build Status](https://travis-ci.org/tandrewnichols/kindly.png)](https://travis-ci.org/tandrewnichols/kindly)

# Kindly

### Purpose

Kindly is a (very) thin wrapper around fs.readdir that groups files by type. That seems like a small thing, but it's really useful for requiring all the files in a single directory.

### Installation

`npm install kindly --save`

`var kindly = require('kindly');`

### API

Kindly has only one method, `get`, which works synchronously or asynchronously depending on whether you give it a callback.

Synchronously:

```javascript
var descriptors = kindly.get('/dir');
```

Asynchronously:

```javascript
kindly.get('/dir', function(err, descriptors) {

});
```

In either case, descriptors will be an object in this form:

```javascript
{
  files: [],
  directories: [],
  other: []
}
```

All file and directory names are prefaced with the path you pass to kindly. Thus, if you use something like

```javascript
var kindly = require('kindly');
var path = require('path');

kindly.get(path.resolve('lib'), function(err, descriptors) {

});
```

all of your descriptors will be fully qualified paths which can be used from any directory.

That's it folks!
<br><br><br><br><br><br><br><br>
Seriously, are you still reading this?
