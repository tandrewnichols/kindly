describe 'acceptance', ->
  Given -> @subject = require '../lib/kindly'

  context 'sync', ->
    When -> @files = @subject.get('test/fixtures')
    And -> console.log(@files)
    Then -> expect(@files).to.deep.equal
      files: [ 'test/fixtures/baz.quux' , 'test/fixtures/foo.bar']
      directories: []
      other: []

  context 'async', ->
    When (done) -> @subject.get 'test/fixtures', (err, @files) => done()
    And -> console.log(@files)
    Then -> expect(@files).to.deep.equal
      files: [ 'test/fixtures/baz.quux' , 'test/fixtures/foo.bar']
      directories: []
      other: []
