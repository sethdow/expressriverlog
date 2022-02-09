const { MongoClient, MongoMissingCredentialsError } = require('mongodb');
// https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
const url = process.env.ATLAS_URI

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url, function( err, client ) {
      console.log("Connecting to database")
      if (err) console.log(err);
      _db  = client.db('river_journal');
      console.log("Connected")
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};