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
            fragment.slice(1, -1) + '-'
         ).toString('utf7');
      }
   }).join('');
};

Fiunis.prototype.encode = function(text){
   var base64string = Buffer(text, 'utf16be').toString('base64');
   while(
      base64string.length > 0 &&
      base64string.charAt(base64string.length) === '='
   ){
      base64string = base64string.slice(0, -1);
   }
   return '&+' + base64string + ';';
};

module.exports = new Fiunis();