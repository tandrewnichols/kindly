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
      it('should return a manifest of files', (done) => {
        kindly.get('test/fixtures').then(results => {
          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js', 'test/fixtures/hello.js'],
            directories: ['test/fixtures/baz'],
            symlinks: [],
            other: []
          });
          done();
        }, done);
      })
    })

    context('with noFollow', () => {
      it('should return a manifest of files', (done) => {
        kindly.get('test/fixtures', { noFollow: true }).then(results => {
          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js'],
            directories: ['test/fixtures/baz'],
            symlinks: ['test/fixtures/hello.js'],
            other: []
          });
          done();
        }, done);
      })
    })

    context('with a callback and no opts', () => {
      it('should return a manifest of files', (done) => {
        kindly.get('test/fixtures', results => {
          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js', 'test/fixtures/hello.js'],
            directories: ['test/fixtures/baz'],
            symlinks: [],
            other: []
          });
          done();
        }, done);
      })
    })

    context('with a callback and opts', () => {
      it('should return a manifest of files', (done) => {
        kindly.get('test/fixtures', { noFollow: true }, results => {
          results.should.eql({
            files: ['test/fixtures/bar.js', 'test/fixtures/foo.js'],
            directories: ['test/fixtures/baz'],
            symlinks: ['test/fixtures/hello.js'],
            other: []
          });
          done();
        }, done);
      })
    })
  })
})
