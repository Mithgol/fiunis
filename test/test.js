/* global describe, it */
var assert = require('assert');
var iconv = require('iconv-lite');
var Fiunis = require('../');

var lorem = [
   'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ',
   'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
].join('');

describe('the decoder of Fidonet Unicode substrings', () => {
   it('leaves some simple text untouched', () => assert.strictEqual(
      Fiunis.decode(lorem),
      lorem
   ));
   it('decodes Chinese characters from Diatlo.Svejaque (July 2014)', () => {
      assert.strictEqual(
         Fiunis.decode(
            'Видеоролик &+mAJcFlwNbHpOS3p/iTJbUHvH-; небезынтересен.'
         ),
         'Видеоролик ' +
         '\u9802\u5C16\u5C0D\u6C7A\u4E4B\u7A7F\u8932\u5B50\u7BC7' +
         ' небезынтересен.'
      );
   });
   it('decodes "буки"', () => assert.strictEqual(
      Fiunis.decode('&+BDEEQwQ6BDg-;'),
      'буки'
   ));
   it('decodes an empty string to an empty string', () => assert.strictEqual(
      Fiunis.decode(''),
      ''
   ));
});

describe('the generator of Fidonet Unicode substrings', () => {
   it('can encode the whole text (even its ASCII characters)', () => {
      assert.notStrictEqual(
         Fiunis.encode(lorem),
         lorem
      );
   });
   it('encodes Chinese characters from Diatlo.Svejaque (July 2014)', () => {
      assert.strictEqual(
         Fiunis.encode(
            '\u9802\u5C16\u5C0D\u6C7A\u4E4B\u7A7F\u8932\u5B50\u7BC7'
         ),
         '&+mAJcFlwNbHpOS3p/iTJbUHvH-;'
      );
   });
   it('encodes "буки"', () => assert.strictEqual(
      Fiunis.encode('буки'),
      '&+BDEEQwQ6BDg-;'
   ));
   it('encodes an empty string to an empty string', () => assert.strictEqual(
      Fiunis.encode(''),
      ''
   ));
   it('The Pile of Poo Test™', () => assert.strictEqual(
      Fiunis.decode( Fiunis.encode('\uD83D\uDCA9') ),
      '\uD83D\uDCA9'
   ));
   it('encodes an example from ashtuchkin/iconv-lite#73 to CP866', () => {
      assert.strictEqual(
         iconv.decode( Fiunis.encode('Хлѣбъ です。', 'cp866'), 'cp866' ),
         'Хл' + Fiunis.encode('ѣ') + 'бъ ' + Fiunis.encode('です。')
      );
   });
   it('encodes an example from ashtuchkin/iconv-lite#73 to CP437', () => {
      assert.strictEqual(
         iconv.decode( Fiunis.encode('Хлѣбъ です。', 'cp437'), 'cp437' ),
         Fiunis.encode('Хлѣбъ') + ' ' + Fiunis.encode('です。')
      );
   });
});