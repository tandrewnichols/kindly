sinon = require('sinon')

describe "kindly", ->
  Given -> @fs = spyObj(['readdirSync', 'statSync', 'readdir', 'stat'])

  context 'sync', ->
    Given -> @fs.readdirSync.withArgs('/dir').returns [
      'foo.txt', 'bar', 'symlink'
    ]
    Given -> @fs.statSync.withArgs('/dir/foo.txt').returns
      isFile: -> true
      isDirectory: -> false
    Given -> @fs.statSync.withArgs('/dir/bar').returns
      isFile: -> false
      isDirectory: -> true
    Given -> @fs.statSync.withArgs('/dir/symlink').returns
      isFile: -> false
      isDirectory: -> false
    Given -> @kindly = sandbox 'lib/kindly',
      fs: @fs
    When -> @result = @kindly.get('/dir')
    Then -> expect(@result).to.eql
      files: ['/dir/foo.txt']
      directories: ['/dir/bar']
      other: ['/dir/symlink']

  context 'async', ->
    Given -> @fs.readdir.withArgs('/dir', sinon.match.func).callsArgWith 1, null, ['foo.txt', 'bar', 'symlink']
    Given -> @fs.stat.withArgs('/dir/foo.txt', sinon.match.func).callsArgWith 1, null,
      isFile: -> true
      isDirectory: -> false
    Given -> @fs.stat.withArgs('/dir/bar', sinon.match.func).callsArgWith 1, null,
      isFile: -> false
      isDirectory: -> true
    Given -> @fs.stat.withArgs('/dir/symlink', sinon.match.func).callsArgWith 1, null,
      isFile: -> false
      isDirectory: -> false
    Given -> @cb = sinon.spy()
    Given -> @kindly = sandbox 'lib/kindly',
      fs: @fs
    When -> @kindly.get('/dir', @cb)
    Then -> @cb.calledWith null,
      files: ['/dir/foo.txt']
      directories: ['/dir/bar']
      other: ['/dir/symlink']
