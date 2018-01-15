describe('kindly', () => {
  let kindly = require('../lib/kindly');

  context('sync', () => {
    context('without noFollow', () => {
      it('should return a manifest of files', () => {
        let results = kindly.getSync('test/fixtures');
        results.should.eql({
          files: ['test/fixtures/bar.js', 'test/fixtures/foo.js', 'test/fixtures/hello.js'],
          directories: ['test/fixtures/baz'],
          symlinks: [],
          other: []
        });
      })
    })

    context('with noFollow', () => {
      it('should return a manifest of files', () => {
        let results = kindly.getSync('test/fixtures', { noFollow: true });
        results.should.eql({
          files: ['test/fixtures/bar.js', 'test/fixtures/foo.js'],
          directories: ['test/fixtures/baz'],
          symlinks: ['test/fixtures/hello.js'],
          other: []
        });
      })
    })
  })

  context('async', () => {
    context('without noFollow', () => {
      it('should return a manifest of files', () => {
        return kindly.get('test/fixtures').then(results => {
          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js', 'test/fixtures/hello.js'],
            directories: ['test/fixtures/baz'],
            symlinks: [],
            other: []
          });
        });
      })
    })

    context('with noFollow', () => {
      it('should return a manifest of files', () => {
        return kindly.get('test/fixtures', { noFollow: true }).then(results => {
          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js'],
            directories: ['test/fixtures/baz'],
            symlinks: ['test/fixtures/hello.js'],
            other: []
          });
        });
      })
    })

    context('with a callback and no opts', () => {
      it('should return a manifest of files', (done) => {
        kindly.get('test/fixtures', (err, results) => {
          if (err) {
            return done(err);
          }

          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js', 'test/fixtures/hello.js'],
            directories: ['test/fixtures/baz'],
            symlinks: [],
            other: []
          });

          done();
        });
      })
    })

    context('with a callback and opts', () => {
      it('should return a manifest of files', (done) => {
        kindly.get('test/fixtures', { noFollow: true }, (err, results) => {
          if (err) {
            return done(err);
          }

          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js'],
            directories: ['test/fixtures/baz'],
            symlinks: ['test/fixtures/hello.js'],
            other: []
          });

          done();
        });
      })
    })

    context('an error', () => {
      const sinon = require('sinon');
      const fs = require('fs-extra');

      const generateError = () => {
        return new Promise((resove, reject) => reject('An error'));
      };

      context('reading files', () => {
        beforeEach(() => {
          let readdir = sinon.stub(fs, 'readdir');
          readdir.callsFake(generateError);
        })

        afterEach(() => {
          fs.readdir.restore();
        })

        it('should handle handle the error', () => {
          return kindly.get('test/fixtures').catch(err => {
            err.should.eql('An error');
          });
        })
      })

      context('statting files', () => {
        beforeEach(() => {
          let stat = sinon.stub(fs, 'stat');
          stat.callsFake(generateError);
        })

        afterEach(() => {
          fs.stat.restore();
        })

        it('should handle the error', () => {
          return kindly.get('test/fixtures').catch(err => {
            err.should.eql('An error');
          });
        })
      })
    })
  })
})
