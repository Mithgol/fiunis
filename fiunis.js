var iconv = require('iconv-lite');

var Fiunis = function(){
   if (!(this instanceof Fiunis)) return new Fiunis();
};

Fiunis.prototype.decode = function(text){
   return text.split( /(&\+[A-Za-z0-9+/]+-;)/ ).map((fragment, idx) => {
      if( idx % 2 === 0 ){ // simple string fragment's index: 0, 2, 4...
         return fragment;
      } else return iconv.decode( // regex-captured fragment's index: 1, 3...
         iconv.encode( fragment.slice(1, -1), 'utf8' ),
         'utf7'
      );
   }).join('');
};

Fiunis.prototype.encode = function(text, targetEncoding){
   if( text.length < 1 ) return text;

   if( typeof targetEncoding === 'undefined' ){ // encode the whole string
      var base64string = iconv.decode(
         iconv.encode(text, 'utf16be'),
         'base64'
      );
      while(
         base64string.length > 0 &&
         base64string.charAt(base64string.length - 1) === '='
      ){
         base64string = base64string.slice(0, -1);
      }
      return '&+' + base64string + '-;';
   }

   // otherwise detect and render Fidonet Unicode substrings
   if(!( iconv.encodingExists(targetEncoding) )){
      throw new Error(this.errors.UNKNOWN_ENCODING);
   }
   // work around https://github.com/nodejs/node/issues/2835
   // if( Buffer('\uD83D\uDCA9', 'cp866').toString('cp866') !== '??' ){
   if(
      iconv.decode( iconv.encode('\uD83D\uDCA9', 'cp866'), 'cp866' ) !== '??'
   ){
      // The Pile of Poo Test™,
      // see https://mathiasbynens.be/notes/javascript-unicode#poo-test
      throw new Error(this.errors.ICONVLITE_TAINTED);
   }

   var primalBuffer = iconv.encode(text, targetEncoding);
   if( primalBuffer.length !== text.length ){
      throw new Error(this.errors.MULTIBYTE_ENCODING);
   }
   var zebra = iconv.decode(primalBuffer, targetEncoding).split( /(\?+)/ );
   if( zebra.length < 2 ){ // zero non-encodable substrings
      return primalBuffer;
   } else primalBuffer = void 0;

   var _here = this;
   var remainingStr = text;
   var collected = [];
   zebra.forEach((zebraLine, IDX) => {
      if( IDX % 2 === 0 ){ // encodable substring's index: 0, 2, 4...
         collected = collected.concat([zebraLine]);
         remainingStr = remainingStr.slice(zebraLine.length);
      } else { // non-encodable substring's index: 1, 3, 5...
         var srcZebra = remainingStr.slice(0, zebraLine.length).split(
            /(\?+)/
         ).map((srcLine, srcIDX) => {
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
   return iconv.encode(collected.join(''), targetEncoding);
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