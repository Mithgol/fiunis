/* global describe, it */
var assert = require('assert');
var Fiunis = require('../');

var lorem = [
   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ',
   'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
].join('');

describe("Fidonet Unicode strings' decoder", function(){
   it('leaves some simple text untouched', function(){
      assert.strictEqual(
         Fiunis.decode(lorem),
         lorem
      );
   });
   it('decodes Chinese characters from Diatlo.Svejaque (July 2014)',
   function(){
      assert.strictEqual(
         Fiunis.decode(
            'Видеоролик &+mAJcFlwNbHpOS3p/iTJbUHvH; небезынтересен.'
         ),
         'Видеоролик ' +
         '\u9802\u5C16\u5C0D\u6C7A\u4E4B\u7A7F\u8932\u5B50\u7BC7' +
         ' небезынтересен.'
      );
   });
   it('decodes "буки"', function(){
      assert.strictEqual(
         Fiunis.decode('&+BDEEQwQ6BDg;'),
         'буки'
      );
   });
});

describe("Fidonet Unicode strings' encoder", function(){
   it('does not leave even simple text untouched', function(){
      assert.notStrictEqual(
         Fiunis.encode(lorem),
         lorem
      );
   });
   it('encodes Chinese characters from Diatlo.Svejaque (July 2014)',
   function(){
      assert.strictEqual(
         Fiunis.encode(
            '\u9802\u5C16\u5C0D\u6C7A\u4E4B\u7A7F\u8932\u5B50\u7BC7'
         ),
         '&+mAJcFlwNbHpOS3p/iTJbUHvH;'
      );
   });
   it('encodes "буки"', function(){
      assert.strictEqual(
         Fiunis.encode('буки'),
         '&+BDEEQwQ6BDg;'
      );
   });
});