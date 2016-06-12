var SLOVICKA_CZ_EN_URL = 'http://slovnik.seznam.cz/en-cz/word/';
var xray = require('x-ray');

var _translate = function(arg, callbackFn) {

        console.log("translate called");
        console.dir(arg);

        xray(SLOVICKA_CZ_EN_URL + '?q=' + arg.word)
            .select({
                $root: '#fastTrans',
                translations: ['#fastMeanings a']
            })
            .run(function(err, object) {
                console.info('run xray.. error: ', err, "object: ", object);
                console.dir(err);
                console.dir(object);

                // enrich object
                var translation = object;
                translation.word = arg.word;
                translation.from = arg.from;
                translation.to = arg.to;

                callbackFn(translation);
            });

};

exports.translate = _translate;
