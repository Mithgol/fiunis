require('iconv-lite').extendNodeEncodings();

var Fiunis = function(){
   if (!(this instanceof Fiunis)) return new Fiunis();
};

Fiunis.prototype.decode = function(text){
   return text.split( /(&\+[A-Za-z01-9+\/]+;)/ ).map(function(fragment, idx){
      if( idx % 2 === 0 ){ // simple string fragment's index: 0, 2, 4...
         return fragment;
      } else { // regex-captured fragment's index: 1, 3, 5...
         return Buffer(
            fragment.slice(1, fragment.length - 1) + '-'
         ).toString('utf7');
      }
   }).join('');
};

module.exports = new Fiunis();