const mongoUtil = require ('../mongoUtil');
const ObjectId = require('mongodb').ObjectID;

async function getAllBooks()
{
    let books = await mongoUtil.getDb().collection('books').find().toArray();
    return books;
}

async function addBook(title, author, isbn)
{
    return await mongoUtil.getDb().collection("books").insertOne({author, title, isbn});
}

async function findBookByID(bookid)
{
    let book = await mongoUtil.getDb().collection('books').findOne({
        _id: new ObjectId(bookid)
    });
    return book;
}

async function updateBookByID(bookid, title, author, ISBN)
{
     await mongoUtil.getDb().collection('books').updateOne({
        _id:new ObjectId(bookid)
        }, {
            '$set': {
                author, title, ISBN
            }
        });
}

async function deleteBookByID(bookid) 
{
     await  mongoUtil.getDb().collection('books').deleteOne({
        _id: new ObjectId(bookid)
    })
}

module.exports = {
    getAllBooks, addBook, findBookByID, updateBookByID, deleteBookByID
}