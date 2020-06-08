const mongoUtil = require('../mongoUtil');
const ObjectId = require('mongodb').ObjectId;
const bcrpyt = require('bcryptjs');

module.exports ={
    
    // function to create a new user
    createUser:async function(username, email, password){
        let salt = await bcrpyt.genSalt(10);
        password = await bcrpyt.hash(password, salt);
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




