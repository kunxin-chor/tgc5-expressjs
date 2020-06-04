const express = require('express');
const router = express.Router();
const mongoUtil = require('../mongoUtil');
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req,res)=>{
    let db = mongoUtil.getDB();

    // the function calls in the mongo client is different from the mongo driver
    // PROMISE:
    // db.collection('animals').find().toArray().then(function(data){
    //     res.render('all_animals.hbs', {
    //         animals:data
    //     })
    // });

    let data = await db.collection('animals').find().toArray();
    res.render('all_animals.hbs', {
        animals: data
    })
})

router.get('/create', (req,res)=>{
    res.render('create_animal.hbs');
})


router.post('/create', async (req,res)=>{
    let name = req.body['animal-name'];
    let breed = req.body.breed;
    let db = mongoUtil.getDB();
    await db.collection('animals').insertOne({
        name, breed
    })
    res.redirect('/animals')
})

router.get('/edit/:id', async(req,res)=>{
    let db = mongoUtil.getDB();
    let animal = await db.collection('animals').findOne({
        _id:ObjectId(req.params.id)
    });
    res.render('edit_animal', {
        animal
    })
})

router.post('/edit/:id', async(req, res)=>{
    let db = mongoUtil.getDB();
    let name = req.body['animal-name'];
    let breed = req.body.breed;
    await db.collection('animals').updateOne({
        _id:ObjectId(req.params.id)
    }, {
        '$set': {
            name, breed
        }
    })
    res.redirect('/animals');
})

module.exports = router;