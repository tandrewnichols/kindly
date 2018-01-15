const fs = require('fs');
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
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      }

      async.reduce(files.map(buildPath(dir)), init(), (memo, path, next) => {
        fs[ stat(noFollow) ](path, (err, stat) => {
          if (err) {
            return next(err);
          }

          next(null, getType(memo, path, stat));
        });
      }, (err, results) => {
        if (err) {
          return reject(err);
        }

        if (cb) {
          cb(results);
        }

        return resolve(results);
      });
    });
  });
};

exports.getSync = (dir, { noFollow } = {}) => {
  return fs.readdirSync(dir)
    .map(buildPath(dir))
    .reduce((results, path) => getType(results, path, fs[ `${stat(noFollow)}Sync` ](path)), init());
};
