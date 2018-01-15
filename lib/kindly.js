const fs = require('fs-extra');
const async = require('async');

const init = () => {
  return {
    files: [],
    directories: [],
    symlinks: [],
    other: []
  };
};

const stat = (noFollow) => noFollow ? 'lstat' : 'stat';

const getType = (results, path, stat) => {
  let type = 'other';
  if (stat.isFile()) {
    type = 'files';
  } else if (stat.isDirectory()) {
    type = 'directories';
  } else if (stat.isSymbolicLink()) {
    type = 'symlinks';
  }

  results[ type ].push(path);
  return results;
};

const buildPath = path => descriptor => `${path}/${descriptor}`;

exports.get = (dir, opts, cb) => {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  let { noFollow } = opts || {};

  return new Promise((resolve, reject) => {
    fs.readdir(dir).then((files) => {
      async.reduce(files.map(buildPath(dir)), init(), (memo, path, next) => {
        fs[ stat(noFollow) ](path).then((stat) => next(null, getType(memo, path, stat)), next);
      }, (err, results) => {
        if (cb) {
          return cb(err, results);
        }

        if (err) {
          return reject(err);
        } else {
          return resolve(results);
        }
      });
    }, reject);
  });
};

exports.getSync = (dir, { noFollow } = {}) => {
  return fs.readdirSync(dir)
    .map(buildPath(dir))
    .reduce((results, path) => getType(results, path, fs[ `${stat(noFollow)}Sync` ](path)), init());
};
