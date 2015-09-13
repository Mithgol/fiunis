require('iconv-lite').extendNodeEncodings();

// work around https://github.com/nodejs/node/issues/2835
var enc = require('iconv-lite').encode;

var Fiunis = function(){
   if (!(this instanceof Fiunis)) return new Fiunis();
};

Fiunis.prototype.decode = function(text){
   return text.split( /(&\+[A-Za-z0-9+/]+-;)/ ).map(function(fragment, idx){
      if( idx % 2 === 0 ){ // simple string fragment's index: 0, 2, 4...
         return fragment;
      } else { // regex-captured fragment's index: 1, 3, 5...
         // work around https://github.com/nodejs/node/issues/2835
         // return Buffer( fragment.slice(1, -1) ).toString('utf7');
         return enc( fragment.slice(1, -1), 'utf8' ).toString('utf7');
      }
   }).join('');
};

Fiunis.prototype.encode = function(text, targetEncoding){
   if( text.length < 1 ) return text;

   if( typeof targetEncoding === 'undefined' ){ // encode the whole string
      // work around https://github.com/nodejs/node/issues/2835
      // var base64string = Buffer(text, 'utf16be').toString('base64');
      var base64string = enc(text, 'utf16be').toString('base64');
      while(
         base64string.length > 0 &&
         base64string.charAt(base64string.length - 1) === '='
      ){
         base64string = base64string.slice(0, -1);
      }
      return '&+' + base64string + '-;';
   }

   // otherwise detect and render Fidonet Unicode substrings
   if( !Buffer.isEncoding(targetEncoding) ){
      throw new Error(this.errors.UNKNOWN_ENCODING);
   }
   // work around https://github.com/nodejs/node/issues/2835
   // if( Buffer('\uD83D\uDCA9', 'cp866').toString('cp866') !== '??' ){
   if( enc('\uD83D\uDCA9', 'cp866').toString('cp866') !== '??' ){
      // The Pile of Poo Test™,
      // see https://mathiasbynens.be/notes/javascript-unicode#poo-test
      throw new Error(this.errors.ICONVLITE_TAINTED);
   }

   // work around https://github.com/nodejs/node/issues/2835
   // var primalBuffer = Buffer(text, targetEncoding);
   var primalBuffer = enc(text, targetEncoding);
   if( primalBuffer.length !== text.length ){
      throw new Error(this.errors.MULTIBYTE_ENCODING);
   }
   var zebra = primalBuffer.toString(targetEncoding).split( /(\?+)/ );
   if( zebra.length < 2 ){ // zero non-encodable substrings
      return primalBuffer;
   } else primalBuffer = void 0;

   var _here = this;
   var remainingStr = text;
   var collected = [];
   zebra.forEach(function(zebraLine, IDX){
      if( IDX % 2 === 0 ){ // encodable substring's index: 0, 2, 4...
         collected = collected.concat([zebraLine]);
         remainingStr = remainingStr.slice(zebraLine.length);
      } else { // non-encodable substring's index: 1, 3, 5...
         var srcZebra = remainingStr.slice(0, zebraLine.length).split(
            /(\?+)/
         ).map(function(srcLine, srcIDX){
            if( srcIDX % 2 === 0 ){
               // actual non-encodable substring's index: 0, 2, 4...
               return _here.encode(srcLine);
            } else {
               // encodable source defaultCharSingleByte index: 1, 3, 5...
               return srcLine;
            }
         });
         collected = collected.concat(srcZebra);
         remainingStr = remainingStr.slice(zebraLine.length);
      }
   });
   // work around https://github.com/nodejs/node/issues/2835
   // return Buffer(collected.join(''), targetEncoding);
   return enc(collected.join(''), targetEncoding);
};

Fiunis.prototype.errors = {
   UNKNOWN_ENCODING: 'The given encoding is unknown!',
   MULTIBYTE_ENCODING: 'The given encoding is not a single-byte encoding!',
   ICONVLITE_TAINTED: [
      'The issue ',
      'https://github.com/ashtuchkin/iconv-lite/issues/96',
      ' is possible!'
   ].join('')
};

module.exports = new Fiunis();