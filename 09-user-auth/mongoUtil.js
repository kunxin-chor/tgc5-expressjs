const dbname = "movie_reviews";
const url="mongodb+srv://root:rotiprata123@cluster0-encm1.mongodb.net/test?retryWrites=true&w=majority";
const client = require('mongodb').MongoClient;
let _db;

function connect(callback) {
    client.connect(url, {
        useUnifiedTopology:true
    }, function(err, client){
        console.log("server connected");
        _db = client.db(dbname);
        return callback(err, _db);
    })
}

function getDB() {
    return _db;
}

module.exports = {
    connect, getDB
}