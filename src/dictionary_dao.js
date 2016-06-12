var mongodb = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/wordies'; // TODO: externalizovat do nejakyho konfigu

function saveWord(data, callback) {

  console.log("[DAO] saving data:", data);
  console.log("[DAO] userId:", data.userId);

  mongodb.connect(url, function(err, db) {
      var userId = data.userId;
      var word = data.word;

      var tmpIncExpression = {}
      tmpIncExpression["words." + word + ".count"] = 1;

      var wordsCollection = db.collection('words');
      wordsCollection.bulkWrite([
        { updateOne: { filter: { userId: userId  }, update: { $set: { userId: userId }}, upsert: true }},
        { updateOne: { filter: { userId: userId }, update: { $inc : tmpIncExpression}, upsert: true}}
      ], { ordered: true}, function(err, result) {
        callback(err, result);
        db.close();
      });

  });

}

exports.saveWord = saveWord;
