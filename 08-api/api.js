const express = require('express');
const router = express.Router();
const BookModel = require("./models/BookModel");

// RESTful convention: to access all books, we usually state /books
router.get('/books', async (req,res)=>{
    res.send(await BookModel.getAllBooks())
});

router.get('/book/:bookid', async (req,res)=>{
    // res.send(await BookModel.findBookByID(req.params.bookid));
    let book = await BookModel.findBookByID(req.params.bookid);
    res.send(book);
});

router.post('/book', async (req,res)=>{
    let {title, author, ISBN} =  req.body;
    let result = await BookModel.addBook(title, author, ISBN);
    res.send({
        'status':'OK',
        'newBookID':result.insertedId
    })
})

router.put('/book/:bookid', async(req,res)=>{
      let {title, author, ISBN} =  req.body;
      await BookModel.updateBookByID(req.params.bookid, title, author, ISBN);
      res.send({
          'status':'OK'
      })
})

router.delete('/book/:bookid', async(req,res)=>{
    await BookModel.deleteBookByID(req.params.bookid);
    res.send({
        'status':'OK'
    })
})

// do a default export
module.exports = router;