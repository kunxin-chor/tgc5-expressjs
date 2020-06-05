const express = require('express');
const router = express.Router();
const mongoUtil = require('./mongoUtil');
const ObjectId = require('mongodb').ObjectId;
const BookModel = require('./models/BookModel');


router.get('/', async (req,res)=>{
    let db = mongoUtil.getDb();
    
    // example using promise:
    // db.collection('books').find().toArray().then((data)=>{
    //     res.send(data)
    // });
    
    let books = await BookModel.getAllBooks();
    res.render('books_view',{
        books
    })
})

router.get('/create', (req,res)=>{
    res.render('book_create')
})

router.post('/create', (req,res)=>{
    let db = mongoUtil.getDb();
    
    // destructuring assignment
    let {author, title, ISBN} = req.body; 
    
    // db.collection("books").insertOne({author, title, isbn});
    BookModel.addBook(author, title, isbn);
    req.flash(`New book ${title} has been created`);
    res.redirect('/')
})

router.get('/edit/:bookid', async (req,res)=>{
    let book = await BookModel.findBookByID(req.params.bookid);
    res.render('book_update',{
        book
    });
})

router.post('/edit/:bookid',  (req,res)=>{
     // extract out all the fields using destructuring assignment
    let {author, title, ISBN} = req.body; 

    BookModel.updateBookByID(req.params.bookid, author, title, ISBN);
    req.flash(`Book ${title} has been updated`);
    res.redirect('/')
})

router.get('/delete/:bookid', async (req,res)=>{
    let book = await BookModel.findBookByID(req.params.bookid);
    res.render('book_confirm_delete', {
        book
    });
})

router.post('/delete/:bookid', async (req,res)=>{
    let book = await BookModel.findBookByID(req.params.bookid);
    BookModel.deleteBookByID(req.params.bookid);
    res.flash(`Book ${book.title} has been deleted`);
    res.redirect('/')
})

router.get('/apitest', async(req,res)=>{
    res.render('apitest')
})

module.exports = router;