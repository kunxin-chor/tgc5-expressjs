const mongoUtil = require('../mongoUtil');
const ObjectId = require('mongodb').ObjectId

module.exports ={
    
    // function to create a new user
    createUser:async function(username, email, password){
        let result = await mongoUtil.getDB().collection('users').insertOne({
            username, email, password
        })
        return result;
    },

    // function to find a user by id
    findById:async (id) => {
        let user = await mongoUtil.getDB().collection('users').findOne({
            _id: new ObjectId(id)
        })
        return user;
    },

    // function to find a user by email
    findByEmail:async(email) => {
        console.log(mongoUtil.getDB());
        let user = await mongoUtil.getDB().collection('users').findOne({
            email
        });
        return user;
    }
}




