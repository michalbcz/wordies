var seznamSlovnik = require('./seznam_slovnik_dictionary.js');
var dao = require('./dictionary_dao.js');

exports.translate = function(data, callbackFn) {
 var word = data.word;
 console.log("[dictionary service] translated word", word);

 seznamSlovnik.translate(data, function(translationData) {
   dao.saveWord(data, function(error, result) {
     console.log("[dictionary service] error: ", error, "result:", result);
   });
   callbackFn(translationData);
 });

};
