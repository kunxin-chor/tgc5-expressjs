const mongoUtil = require('../mongoUtil');

function createMovie(movieObject, userid)
{
    movieObject = {
        ...movieObject, userid
    };

    mongoUtil.getDB().collection('reviews').insertOne(movieObject)
}

module.exports = {
    createMovie
};